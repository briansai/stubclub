import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/currentUser';
import { signInRouter } from './routes/signIn';
import { signOutRouter } from './routes/signOut';
import { signUpRouter } from './routes/signUp';
import { errorHandler } from '@stubclub/common';

const app = express();

app.set('trust proxy', true);
app.use(bodyParser.json());

app.use(
  cookieSession({
    signed: false,
    secure: false
  })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.use(errorHandler);

export { app };
