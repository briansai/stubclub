import { Publisher, Subjects, TicketUpdatedEvent } from '@stubclub/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
