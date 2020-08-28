import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new Payment
interface PaymentAttrs {
  orderId: string;
  stripeId: string;
}

// An interface that describes the properties
// that a Payment Document has
interface PaymentDoc extends mongoose.Document {
  orderId: string;
  stripeId: string;
}

// An interface that describes the properties
// that an Payment Model has
interface PaymentModel extends mongoose.Model<PaymentDoc> {
  build(attrs: PaymentAttrs): PaymentDoc;
}

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      required: true,
      type: String
    },
    stripeId: {
      required: true,
      type: String
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

paymentSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment(attrs);
};

export const Payment = mongoose.model<PaymentDoc, PaymentModel>(
  'Payment',
  paymentSchema
);
