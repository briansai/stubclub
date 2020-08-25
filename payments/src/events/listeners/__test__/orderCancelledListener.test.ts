import { Message } from 'node-nats-streaming';
import {
  OrderCancelledEvent,
  generateMongoId,
  OrderStatus
} from '@stubclub/common';
import { OrderCancelledListener } from '../orderCancelledListener';
import { natsWrapper } from '../../../natsWrapper';
import { Order } from '../../../models/orders';

const setup = async () => {
  // create an instance of the listener
  const listener = new OrderCancelledListener(natsWrapper.client);

  const order = Order.build({
    id: generateMongoId(),
    status: OrderStatus.Created,
    version: 0,
    userId: '123',
    price: 10
  });

  await order.save();

  // create a fake data event
  const data: OrderCancelledEvent['data'] = {
    id: order.id,
    version: 1,
    ticket: {
      id: '123'
    }
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, data, msg, order };
};

it('updates the status of the order', async () => {
  const { listener, data, msg, order } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('acknowledges the message', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
