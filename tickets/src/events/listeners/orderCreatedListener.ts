import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@stubclub/common';
import { queueGroupName } from './queueGroupName';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticketUpdatedPublisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.set({ orderId: data.id });

    await ticket.save();

    const { id, price, title, userId, orderId, version } = ticket;
    await new TicketUpdatedPublisher(this.client).publish({
      id,
      price,
      title,
      userId,
      orderId,
      version
    });

    msg.ack();
  }
}
