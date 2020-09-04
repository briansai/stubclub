import { Message } from 'node-nats-streaming';
import {
  OrderCreatedEvent,
  generateMongoId,
  OrderStatus
} from '@stubclub/common';
import { OrderCreatedListener } from '../orderCreatedListener';
import { natsWrapper } from '../../../natsWrapper';
import { Order } from '../../../models/orders';

const setup = async () => {
  // create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // create a fake data event
  const data: OrderCreatedEvent['data'] = {
    id: generateMongoId(),
    version: 0,
    expiresAt: 'potatos',
    userId: generateMongoId(),
    status: OrderStatus.Created,
    ticket: {
      id: generateMongoId(),
      price: 20
    }
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, data, msg };
};

it('replicates the order info', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const order = await Order.findById(data.id);

  expect(order!.price).toEqual(data.ticket.price);
});

it('acknowledges the message', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
