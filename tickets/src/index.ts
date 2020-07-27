import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './natsWrapper';

const dbConnect = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI_TICKETS) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await natsWrapper.connect(
      'ticketing',
      'sweetmonkeys',
      'http://nats-srv:4222'
    );

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });

    process.on('SIGINT' || 'SIGTERM', () => {
      natsWrapper.client.close();
    });

    await mongoose.connect(process.env.MONGO_URI_TICKETS, {
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
