import mongoose from 'mongoose';
import { Order, OrderStatus } from './order';

// An interface that describes the properties
// that are required to create a new Ticket
interface TicketAttributes {
  title: string;
  price: number;
}

// An interface that describes the properties
// that a Ticket Document has
export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  isReserved(): Promise<Boolean>;
}

// An interface that describes the properties
// that an Ticket Model has
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttributes): TicketDoc;
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

ticketSchema.statics.build = (attrs: TicketAttributes) => {
  return new Ticket(attrs);
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
