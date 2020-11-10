import express, { Request, Response } from 'express';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  UnauthorizedError,
  BadRequestError
} from '@stubclub/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.delete(
  '/api/tickets/:id',
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.orderId) {
      throw new BadRequestError('Cannot delete a reserved ticket');
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new UnauthorizedError();
    }

    await Ticket.findByIdAndRemove({ _id: req.params.id });

    res.status(202).send();
  }
);

export { router as deleteTicketRouter };
