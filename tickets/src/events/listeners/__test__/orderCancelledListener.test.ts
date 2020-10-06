import { Message } from 'node-nats-streaming';
import { OrderCancelledEvent, generateMongoId } from '@stubclub/common';
import { OrderCancelledListener } from '../orderCancelledListener';
import { natsWrapper } from '../../../natsWrapper';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);
  const ticket = Ticket.build({
    title: 'potatos',
    price: 200,
    userId: '123',
    date: new Date()
  });

  ticket.set({ orderId: generateMongoId() }), await ticket.save();

  const data: OrderCancelledEvent['data'] = {
    id: generateMongoId(),
    version: 0,
    ticket: {
      id: ticket.id
    }
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, ticket, data, msg };
};

it('updates the ticket, publishes an event, and acks the message', async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket!.orderId).not.toBeDefined();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
