import supertest from 'supertest';
import { sign } from 'jsonwebtoken';
import { ConnectionTestJest, generateProduct, generateUser } from '..';
import app from '../../app';
import { jwtConfig } from '../../configs';
import {
  UserRepository,
  CategoryRepository,
  ProductRepository,
} from '../../repositories';
import { randomUUID } from 'crypto';

describe('update prodct route integration test', () => {
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

  it('will be able to update product, return status 204 and no message', async () => {
    const { secretKey, expiresIn } = jwtConfig;
    const { email } = await new UserRepository().save(generateUser());
    const validToken = sign({ email }, secretKey, { expiresIn });

    const { name, status, category } = generateProduct();

    await new CategoryRepository().save({ name: category });

    const { id } = await new ProductRepository().save({ name, status });

    const response = await supertest(app)
      .patch(`/products/${id}`)
      .field('name', 'new name')
      .set('Authorization', `Bearer ${validToken}`);

    expect(response.status).toBe(204);
    expect(response.body).toStrictEqual({});
  });

  it('will not be able to update product, return status 401 and error message', async () => {
    const { name, status, category } = generateProduct();

    await new CategoryRepository().save({ name: category });

    const { id } = await new ProductRepository().save({ name, status });

    const response = await supertest(app)
      .patch(`/products/${id}`)
      .field('name', 'new name')
      .set('Authorization', `Bearer invalidToken`);

    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({ error: 'invalid token' });
  });

  it('will not be able to update product, return status 401 and error message', async () => {
    const { secretKey, expiresIn } = jwtConfig;
    const { email } = await new UserRepository().save(generateUser());
    const validToken = sign({ email }, secretKey, { expiresIn });

    const response = await supertest(app)
      .patch(`/products/${randomUUID()}`)
      .field('name', 'new name')
      .set('Authorization', `Bearer ${validToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ message: 'product not found' });
  });
});
