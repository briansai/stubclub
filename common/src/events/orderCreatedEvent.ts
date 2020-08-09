import { Subjects } from './subjects';
import { OrderStatus } from './types/orderStatus';

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    userId: string;
    status: OrderStatus;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}
