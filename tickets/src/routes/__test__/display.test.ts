import request from 'supertest';
import { generateMongoId } from '@stubclub/common';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the ticket is not found', async () => {
  // Generate valid object ID from mongoose to test
  const id = generateMongoId();
  await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(404);
});

it('returns the ticket if the ticket is found', async () => {
  const title = 'concert';
  const price = 20;
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price,
      date: new Date()
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  const { body } = ticketResponse;

  expect(body.title).toEqual(title);
  expect(body.price).toEqual(price);
});
