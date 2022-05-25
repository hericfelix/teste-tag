import supertest from 'supertest';
import {
  ConnectionTestJest,
  generateProduct,
  generateUser,
  slowDown,
} from '..';
import app from '../../app';
import {
  UserRepository,
  CategoryRepository,
  ProductRepository,
} from '../../repositories';
import { jwtConfig } from '../../configs';
import { sign } from 'jsonwebtoken';
import { randomUUID } from 'crypto';

describe('delete product route integration test', () => {
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

  it('will be able to delete product, return status 204 and no message', async () => {
    const { secretKey, expiresIn } = jwtConfig;
    const user = await new UserRepository().save(generateUser());
    const validToken = sign({ email: user.email }, secretKey, { expiresIn });

    const { name, status, category } = generateProduct();

    await new CategoryRepository().save({ name: category });

    const { id } = await new ProductRepository().save({ name, status });

    const response = await supertest(app)
      .delete('/products')
      .send({ ids: [id] })
      .set('Authorization', `Bearer ${validToken}`);

    expect(response.status).toBe(204);
    expect(response.body).toStrictEqual({});
    expect(await new ProductRepository().get()).toHaveLength(0);
  });

  it('will be able to delete multiple products, return status 204 and no message', async () => {
    const { secretKey, expiresIn } = jwtConfig;
    const { email } = await new UserRepository().save(generateUser());
    const validToken = sign({ email }, secretKey, { expiresIn });

    const product1 = generateProduct();

    await new CategoryRepository().save({ name: product1.category });

    const { id: id1 } = await new ProductRepository().save({
      name: product1.name,
      status: product1.status,
    });

    const product2 = generateProduct();

    await new CategoryRepository().save({ name: product2.category });

    const { id: id2 } = await new ProductRepository().save({
      name: product2.name,
      status: product2.status,
    });

    const response = await supertest(app)
      .delete('/products')
      .send({ ids: [id1, id2] })
      .set('Authorization', `Bearer ${validToken}`);

    expect(response.status).toBe(204);
    expect(response.body).toStrictEqual({});
    expect(await new ProductRepository().get()).toHaveLength(0);
  });

  it('will not be able to delete any product, return status 404 and error message', async () => {
    const { secretKey, expiresIn } = jwtConfig;
    const { email } = await new UserRepository().save(generateUser());
    const validToken = sign({ email }, secretKey, { expiresIn });

    const product1 = generateProduct();

    await new CategoryRepository().save({ name: product1.category });

    await new ProductRepository().save({
      name: product1.name,
      status: product1.status,
    });

    const product2 = generateProduct();

    await new CategoryRepository().save({ name: product2.category });

    await new ProductRepository().save({
      name: product2.name,
      status: product2.status,
    });

    const response = await supertest(app)
      .delete('/products')
      .send({ ids: [randomUUID(), randomUUID()] })
      .set('Authorization', `Bearer ${validToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ error: 'product not found' });
    expect(await new ProductRepository().get()).toHaveLength(2);
  });

  it('will not be able to delete product, return status 401 and error message', async () => {
    const { secretKey, expiresIn } = jwtConfig;
    const { email } = await new UserRepository().save(generateUser());
    const invalidToken = 'invalid token';

    const product = generateProduct();

    await new CategoryRepository().save({ name: product.category });

    const { id } = await new ProductRepository().save({
      name: product.name,
      status: product.status,
    });

    const response = await supertest(app)
      .delete('/products')
      .send({ ids: [id] })
      .set('Authorization', `Bearer ${invalidToken}`);

    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({ error: 'invalid token' });
    expect(await new ProductRepository().get()).toHaveLength(1);
  });
});
