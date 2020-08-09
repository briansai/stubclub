import { Publisher, OrderCreatedEvent, Subjects } from '@stubclub/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
