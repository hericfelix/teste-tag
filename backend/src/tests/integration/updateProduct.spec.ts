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

  it('will be able to update product, return status 204 and no message', async () => {
    const { secretKey, expiresIn } = jwtConfig;
    const { email } = await new UserRepository().save(generateUser());
    const validToken = sign({ email }, secretKey, { expiresIn });

    const product = generateProduct();

    await new CategoryRepository().save(product.category);

    await new ProductRepository().save(product, email);

    const response = await supertest(app)
      .post('/products')
      .field('name', 'new name')
      .set('Authorization', `Bearer ${validToken}`);

    expect(response.status).toBe(204);
    expect(response.body).toBeUndefined();
  });

  it('will not be able to update product, return status 401 and error message', async () => {
    const { secretKey, expiresIn } = jwtConfig;
    const { email } = await new UserRepository().save(generateUser());
    const validToken = sign({ email }, secretKey, { expiresIn });

    const product = generateProduct();

    await new CategoryRepository().save(product.category);

    await new ProductRepository().save(product, email);

    const response = await supertest(app)
      .post('/products')
      .field('name', 'new name')
      .set('Authorization', `Bearer ${validToken}`);

    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({ error: 'invalid authorization' });
  });
});
