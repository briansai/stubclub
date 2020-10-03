import express, { Request, Response } from 'express';
import faker from 'faker';
import { requireAuth } from '@stubclub/common';
import { Ticket } from '../models/ticket';
import { TicketCreatedPublisher } from '../events/publishers/ticketCreatedPublisher';
import { natsWrapper } from '../natsWrapper';

const router = express.Router();

router.post(
  '/api/tickets/seed',
  requireAuth,
  async (req: Request, res: Response) => {
    await Ticket.remove({});

    const tickets = [];

    for (let x = 0; x < 1000; x++) {
      const ticket = Ticket.build({
        title: faker.name.title(),
        price: faker.random.number(),
        userId: req.currentUser!.id
      });

      tickets.push(ticket);

      await new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        version: ticket.version,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId
      });
    }
    await Ticket.insertMany(tickets);

    res.status(201).send(tickets);
  }
);

export { router as seedTicketRouter };
