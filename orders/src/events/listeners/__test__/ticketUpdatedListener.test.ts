import { Message } from 'node-nats-streaming';
import { TicketUpdatedEvent, generateMongoId } from '@stubclub/common';
import { TicketUpdatedListener } from '../ticketUpdatedListener';
import { natsWrapper } from '../../../natsWrapper';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  // create an instance of the listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  // create and save a ticket
  const ticket = Ticket.build({
    id: generateMongoId(),
    title: 'potato',
    price: 20
  });

  await ticket.save();

  // create a fake data event
  const { id, version } = ticket;
  const data: TicketUpdatedEvent['data'] = {
    id,
    version: version + 1,
    title: 'potatos',
    price: 200,
    userId: '123'
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, data, ticket, msg };
};

it('finds, updates, and saves a ticket', async () => {
  const { listener, data, ticket, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);
});

it('acknowledges the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has a skipped versio number', async () => {
  const { listener, data, msg } = await setup();

  data.version = 100;

  try {
    await listener.onMessage(data, msg);
  } catch (err) {}

  expect(msg.ack).not.toHaveBeenCalled();
});
