import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// An interface that describes the properties
// that are required to create a new Ticket
interface TicketAttributes {
  title: string;
  price: number;
  userId: string;
  date: Date;
}

// An interface that describes the properties
// that a Ticket Document has
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  version: number;
  orderId?: string;
  date: Date;
}

// An interface that describes the properties
// that a Ticket Model has
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttributes): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true
    },
    price: {
      type: Number,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    orderId: {
      type: String
    },
    date: {
      type: Date,
      required: true
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
// Tells Mongo that we want to use version instead of versionKey
ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (attributes: TicketAttributes) => {
  return new Ticket(attributes);
};

export const Ticket = mongoose.model<TicketDoc, TicketModel>(
  'Ticket',
  ticketSchema
);
