import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new Order
interface TicketAttributes {
  title: string;
  price: number;
}

// An interface that describes the properties
// that a Order Document has
export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
}

// An interface that describes the properties
// that an Order Model has
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

export const Ticket = mongoose.model<TicketDoc, TicketModel>(
  'Ticket',
  ticketSchema
);
