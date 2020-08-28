import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  OrderStatus
} from '@stubclub/common';
import { stripe } from '../stripe';
import { Order } from '../models/orders';
import { Payment } from '../models/payment';
import { PaymentCreatedPublisher } from '../events/publishers/paymentCreatedPublisher';
import { natsWrapper } from '../natsWrapper';

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [
    body('token')
      .not()
      .isEmpty(),
    body('orderId')
      .not()
      .isEmpty()
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    } else if (order.userId !== req.currentUser!.id) {
      throw new UnauthorizedError();
    } else if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('Cannot pay for a cancelled order');
    }

    const charge = await stripe.charges.create({
      currency: 'usd',
      amount: order.price * 100,
      source: token
    });

    const payment = Payment.build({
      orderId,
      stripeId: charge.id
    });
    await payment.save();

    const { id, orderId: ordId, stripeId } = payment;

    await new PaymentCreatedPublisher(natsWrapper.client).publish({
      id,
      orderId: ordId,
      stripeId
    });

    res.status(201).send({ id });
  }
);

export { router as createChargeRouter };
