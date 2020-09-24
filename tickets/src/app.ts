import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, currentUser } from '@stubclub/common';
import { createTicketRouter } from './routes/new';
import { displayTicketRouter } from './routes/display';
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from './routes/update';

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
app.use(displayTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);
app.use(errorHandler);

export { app };
