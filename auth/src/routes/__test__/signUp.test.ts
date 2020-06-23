import request from 'supertest';

import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1@test.com',
      password: 'password'
    })
    .expect(201);
});

it('returns a 400 with an invalid email', () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test',
      password: 'password'
    })
    .expect(400);
});

it('returns a 400 with an invalid password', () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test',
      password: 'p'
    })
    .expect(400);
});

it('returns a 400 with absent email or password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'smile@test.com' })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({ password: 'smile' })
    .expect(400);
});

it('returns a 400 with absent email and password', () => {
  return request(app)
    .post('/api/users/signup')
    .send({})
    .expect(400);
});

it('does not allow duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1@test.com',
      password: 'password'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1@test.com',
      password: 'password'
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1@test.com',
      password: 'password'
    })
    .expect(201);
  console.log(response);
  expect(response.get('Set-Cookie')).toBeDefined();
});
