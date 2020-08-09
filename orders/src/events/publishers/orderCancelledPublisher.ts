import { Publisher, OrderCancelledEvent, Subjects } from '@stubclub/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
