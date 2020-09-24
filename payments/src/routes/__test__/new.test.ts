import request from 'supertest';
import { generateMongoId, OrderStatus } from '@stubclub/common';
import { app } from '../../app';
import { Order } from '../../models/orders';
import { stripe } from '../../stripe';

jest.mock('../../stripe');

it('returns a 404 when purchasing an order that does not exist', async () => {
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
      token: '123',
      orderId: generateMongoId()
    })
    .expect(404);
});

it("returns a 401 when purchasing an order that doesn't belong to the user", async () => {
  const order = Order.build({
    id: generateMongoId(),
    userId: generateMongoId(),
    status: OrderStatus.Created,
    price: 200,
    version: 0
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
      token: '123',
      orderId: order.id
    })
    .expect(401);
});

it('returns a 400 when purchasing a cancelled order', async () => {
  const userId = generateMongoId();
  const order = Order.build({
    id: generateMongoId(),
    userId,
    status: OrderStatus.Cancelled,
    price: 200,
    version: 0
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin(userId))
    .send({
      token: '123',
      orderId: order.id
    })
    .expect(400);
});
