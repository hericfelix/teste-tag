import supertest from 'supertest';
import { ConnectionTestJest, generateProduct, generateUser } from '..';
import app from '../../app';
import {
  UserRepository,
  ProductRepository,
  CategoryRepository,
} from '../../repositories';

describe('get product route integration test', () => {
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

  it('will return status 200 and an empty array as json response', async () => {
    const response = await supertest(app).get('/products');

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ products: [] });
  });

  it('will return status 200 and an array with one product', async () => {
    const { email } = await new UserRepository().save(generateUser());
    const product = generateProduct();

    await new CategoryRepository().save(product.category);

    await new ProductRepository().save(product, email);

    const response = await supertest(app).get('/products');

    expect(response.status).toBe(200);
    expect(response.body.products).toHaveLength(1);
  });

  it('will return status 200 and an array with one product if query is correct', async () => {
    const { email } = await new UserRepository().save(generateUser());
    const product = generateProduct();

    await new CategoryRepository().save(product.category);

    await new ProductRepository().save(product, email);

    const response = await supertest(app).get(`/products?name=${product.name}`);

    expect(response.status).toBe(200);
    expect(response.body.products).toHaveLength(1);
  });

  it('will return status 200 and an empty array with one product if query is incorrect', async () => {
    const { email } = await new UserRepository().save(generateUser());
    const product = generateProduct();

    await new CategoryRepository().save(product.category);

    await new ProductRepository().save(product, email);

    const response = await supertest(app).get('/products?name=ab123');

    expect(response.status).toBe(200);
    expect(response.body.products).toHaveLength(0);
  });
});
