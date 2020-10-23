import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/userTickets', async (req: Request, res: Response) => {
  const ticket = await Ticket.find({
    userId: req.currentUser!.id
  }).sort({ date: -1 });

  res.send(ticket);
});

export { router as userTicketRouter };
