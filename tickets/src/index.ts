import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './natsWrapper';
import { OrderCreatedListener } from './events/listeners/orderCreatedListener';
import { OrderCancelledListener } from './events/listeners/orderCancelledListener';

const dbConnect = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI_TICKETS) {
    throw new Error('MONGO_URI must be defined');
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });

    process.on('SIGINT' || 'SIGTERM', () => {
      natsWrapper.client.close();
    });

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();

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
