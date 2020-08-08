export enum OrderStatus {
  // Order has been created, but theticket is
  // trying to order and has not been reserved
  Created = 'created',

  // Ticket in order has been created has already been reserved
  // or the user canceled
  // or the order expires before payment
  Cancelled = 'cancelled',

  // Order has successfully reserverd the ticket
  AwaitingPayment = 'awaiting:payment',

  // The order has reserved the ticket and the
  // user has provided payment successfully
  Complete = 'complete'
}
