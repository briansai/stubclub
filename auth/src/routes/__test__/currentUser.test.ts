import request from 'supertest';
import { app } from '../../app';

it('responds with details about the current user', async () => {
  const signUpResponse = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'sweetlittletomato@test.com',
      password: 'password'
    })
    .expect(201);

  const cookie = signUpResponse.get('Set-Cookie');

  const response = await request(app)
    .get('/api/users/currentUser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('sweetlittletomato@test.com');
});