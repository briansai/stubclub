import { generateMongoId } from '@stubclub/common';
import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../natsWrapper';

it('returns a 404 if the provided id does not exist', async () => {
  const id = generateMongoId();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'apples and banananas',
      price: 20
    })
    .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  const id = generateMongoId();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'apples and bananas',
      price: 20
    })
    .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'potatos and tomatos',
      price: 50
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'sweet mackeral and cheese',
      price: 1000
    })
    .expect(401);
});

it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .put(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
      title: 'sweet mackeral and cheese',
      price: 1000
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'sweet cheese',
      price: -500
    })
    .expect(400);
});

it('updates the ticket provided valid inputs', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
      title: 'sweet mackeral and cheese',
      price: 1000
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'rabbit tails',
      price: 500
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  const { title: ticketTitle, price: ticketPrice } = ticketResponse.body;

  expect(ticketTitle).toEqual('rabbit tails');
  expect(ticketPrice).toEqual(500);
});

it('publishes an event', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
      title: 'sweet mackeral and cheese',
      price: 1000
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'rabbit tails',
      price: 500
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('rejects updates if the ticket is reserved', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
      title: 'sweet mackeral and cheese',
      price: 1000
    });
  const { id } = response.body;
  const ticket = await Ticket.findById(id);

  ticket!.set({ orderId: generateMongoId() });
  await ticket!.save();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', cookie)
    .send({
      title: 'rabbit tails',
      price: 500
    })
    .expect(400);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
