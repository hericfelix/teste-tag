import supertest from 'supertest';
import { ConnectionTestJest, generateProduct, generateUser } from '..';
import app from '../../app';
import {
  UserRepository,
  CategoryRepository,
  ProductRepository,
} from '../../repositories';
import { jwtConfig } from '../../configs';
import { sign } from 'jsonwebtoken';

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

  it('will be able to delete product, return status 204 and no message', async () => {
    const { secretKey, expiresIn } = jwtConfig;
    const { email } = await new UserRepository().save(generateUser());
    const validToken = sign({ email }, secretKey, { expiresIn });

    const product = generateProduct();

    await new CategoryRepository().save(product.category);

    const { id } = await new ProductRepository().save(product, email);

    const response = await supertest(app)
      .delete('/products')
      .send({ ids: [id] })
      .set('Authorization', `Bearer ${validToken}`);

    expect(response.status).toBe(204);
    expect(response.body).toBeUndefined();
    expect(await ProductRepository.getProducts()).toHaveLength(0);
  });

  it('will be able to delete multiple products, return status 204 and no message', async () => {
    const { secretKey, expiresIn } = jwtConfig;
    const { email } = await new UserRepository().save(generateUser());
    const validToken = sign({ email }, secretKey, { expiresIn });

    const product1 = generateProduct();

    await new CategoryRepository().save(product1.category);

    const { id: id1 } = await new ProductRepository().save(product1, email);

    const product2 = generateProduct();

    await new CategoryRepository().save(product2.category);

    const { id: id2 } = await new ProductRepository().save(product2, email);

    const response = await supertest(app)
      .delete('/products')
      .send({ ids: [id1, id2] })
      .set('Authorization', `Bearer ${validToken}`);

    expect(response.status).toBe(204);
    expect(response.body).toBeUndefined();
    expect(await ProductRepository.getProducts()).toHaveLength(0);
  });

  it('will not be able to delete any product, return status 404 and error message', async () => {
    const { secretKey, expiresIn } = jwtConfig;
    const { email } = await new UserRepository().save(generateUser());
    const validToken = sign({ email }, secretKey, { expiresIn });

    const product1 = generateProduct();

    await new CategoryRepository().save(product1.category);

    await new ProductRepository().save(product1, email);

    const product2 = generateProduct();

    await new CategoryRepository().save(product2.category);

    await new ProductRepository().save(product2, email);

    const response = await supertest(app)
      .delete('/products')
      .send({ ids: ['1', '2'] })
      .set('Authorization', `Bearer ${validToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ error: 'product not found' });
    expect(await ProductRepository.getProducts()).toHaveLength(2);
  });

  it('will not be able to delete product, return status 401 and error message', async () => {
    const { secretKey, expiresIn } = jwtConfig;
    const { email } = await new UserRepository().save(generateUser());
    const invalidToken = sign({ email: 'invalid@invalid.com' }, secretKey, {
      expiresIn,
    });

    const product = generateProduct();

    await new CategoryRepository().save(product.category);

    const { id } = await new ProductRepository().save(product, email);

    const response = await supertest(app)
      .delete('/products')
      .send({ ids: [id] })
      .set('Authorization', `Bearer ${invalidToken}`);

    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({ error: 'invalid authorization' });
    expect(await ProductRepository.getProducts()).toHaveLength(0);
  });
});
