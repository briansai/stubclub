import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@stubclub/common';
import { queueGroupName } from './queueGroupName';
import { Order } from '../../models/orders';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const { id, ticket, status, userId, version } = data;
    const order = Order.build({
      id,
      status,
      userId,
      version,
      price: ticket.price
    });

    await order.save();

    msg.ack();
  }
}
