import mongoose from 'mongoose';
import { app } from './app';

const dbConnect = async () => {
  console.log('Starting up...');

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI_AUTH) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI_AUTH, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on PORT: 3000');
  });
};

dbConnect();
