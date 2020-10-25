import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

const router = express.Router();

router.get('/api/tickets/', async (req: Request, res: Response) => {
  const ticket = req.currentUser
    ? await Ticket.find({
        userId: { $ne: req.currentUser.id },
        orderId: undefined
      })
    : await Ticket.find({ orderId: undefined }).sort({ date: -1 });
  res.send(ticket);
});

export { router as indexTicketRouter };
