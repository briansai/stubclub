import express from 'express';
import bodyParser from 'body-parser';
import { currentUserRouter } from './routes/currentUser';
import { signInRouter } from './routes/signIn';
import { signOutRouter } from './routes/signOut';
import { signUpRouter } from './routes/signUp';

const app = express();
app.use(bodyParser.json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.listen(3000, () => {
  console.log('Listening on PORT: 3000');
});
