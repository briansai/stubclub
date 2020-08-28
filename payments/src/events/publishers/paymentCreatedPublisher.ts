import { Publisher, PaymentCreatedEvent, Subjects } from '@stubclub/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
