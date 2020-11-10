import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, currentUser } from '@stubclub/common';
import { createTicketRouter } from './routes/new';
import { userTicketRouter } from './routes/userTickets';
import { displayTicketRouter } from './routes/display';
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from './routes/update';
import { deleteTicketRouter } from './routes/delete';
import { seedTicketRouter } from './routes/seed';

const app = express();

app.set('trust proxy', true);
app.use(bodyParser.json());

app.use(
  cookieSession({
    signed: false,
    secure: false
  })
);

app.use(currentUser);
app.use(createTicketRouter);
app.use(userTicketRouter);
app.use(displayTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);
app.use(deleteTicketRouter);
app.use(seedTicketRouter);
app.use(errorHandler);

export { app };
