import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, currentUser } from '@stubclub/common';
import { createChargeRouter } from './routes/new';

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
app.use(createChargeRouter);
app.use(errorHandler);

export { app };
