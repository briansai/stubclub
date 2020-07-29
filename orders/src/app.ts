import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, currentUser } from '@stubclub/common';
import { newOrderRouter } from './routes/new';
import { displayOrderRouter } from './routes/display';
import { indexOrderRouter } from './routes/index';
import { deleteOrderRouter } from './routes/delete';

const app = express();

app.set('trust proxy', true);
app.use(bodyParser.json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);

app.use(currentUser);
app.use(newOrderRouter);
app.use(displayOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);
app.use(errorHandler);

export { app };
