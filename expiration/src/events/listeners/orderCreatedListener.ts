import { Message } from 'node-nats-streaming';
import { Subjects, Listener, OrderCreatedEvent } from '@stubclub/common';
import { queueGroupName } from './queueGroupName';
import { expirationQueue } from '../../queues/expirationQueue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log(`Waiting ${delay} milliseconds to process the job`);
    await expirationQueue.add(
      {
        orderId: data.id
      },
      {
        delay
      }
    );

    msg.ack();
  }
}
