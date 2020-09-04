import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Order, OrderStatus } from './order';

// An interface that describes the properties
// that are required to create a new Ticket
interface TicketAttributes {
  id: string;
  title: string;
  price: number;
}

// An interface that describes the properties
// that a Ticket Document has
export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  version: number;
  isReserved(): Promise<Boolean>;
}

// An interface that describes the properties
// that an Ticket Model has
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttributes): TicketDoc;

  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<TicketDoc | null>;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
);

ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  const { id, version } = event;
  return Ticket.findOne({
    _id: id,
    version: version - 1
  });
};
ticketSchema.statics.build = (attrs: TicketAttributes) => {
  const { id, title, price } = attrs;
  return new Ticket({
    _id: id,
    title,
    price
  });
};

ticketSchema.methods.isReserved = async function() {
  // this === the ticket document that we just called 'isReserved on
  const { Created, AwaitingPayment, Complete } = OrderStatus;

  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [Created, AwaitingPayment, Complete]
    }
  });

  return !!existingOrder;
};

export const Ticket = mongoose.model<TicketDoc, TicketModel>(
  'Ticket',
  ticketSchema
);
