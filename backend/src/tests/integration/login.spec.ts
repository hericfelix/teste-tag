import { verify } from 'jsonwebtoken';
import supertest from 'supertest';
import { ConnectionTestJest, generateUser, slowDown } from '..';
import app from '../../app';
import { jwtConfig } from '../../configs';
import { UserRepository } from '../../repositories';

describe('get user token route integration test', () => {
  beforeAll(async () => {
    await ConnectionTestJest.create();
  });

  afterAll(async () => {
    await ConnectionTestJest.clear();
    await ConnectionTestJest.close();
  });

  beforeEach(async () => {
    await ConnectionTestJest.clear();
  });

  it('will return status 200 and user token as json response', async () => {
    const user = generateUser();
    const { email, password } = user;

    await new UserRepository().save(user);

    const response = await supertest(app)
      .post('/login')
      .send({ email: email, password: password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');

    expect(verify(response.body.token, jwtConfig.secretKey)).toBeTruthy();
    expect(verify(response.body.token, jwtConfig.secretKey)).toEqual(
      expect.objectContaining({ email })
    );
  });

  it('will return status 404 and invalid credentials as json response if user does not exists', async () => {
    const { email, password } = generateUser();
    const response = await supertest(app)
      .post('/login')
      .send({ email, password });

    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({ error: 'invalid credentials' });
  });

  it('will return status 401 and invalid credentials as json response if password is wrong', async () => {
    const user = generateUser();
    const { email } = user;
    await new UserRepository().save(user);

    const { password } = generateUser();

    const response = await supertest(app)
      .post('/login')
      .send({ email, password });

    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({ error: 'invalid credentials' });
  });
});
