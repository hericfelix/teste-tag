/*import supertest from 'supertest';
import { ConnectionTestJest, generateProduct } from '..';
import app from '../../app';
import { ProductRepository, CategoryRepository } from '../../repositories';

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
    expect(response.body).toHaveLength(0);
  });

  it('will return status 200 and an array with one product', async () => {
    const { name, status, category } = generateProduct();

    await new CategoryRepository().save({ name: category });

    await new ProductRepository().save({ name, status });

    const response = await supertest(app).get('/products');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('will return status 200 and an array with one product if query is correct', async () => {
    const { name, status, category } = generateProduct();

    await new CategoryRepository().save({ name: category });

    await new ProductRepository().save({ name, status });

    const response = await supertest(app).get(`/products?name=${name}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveLength(1);
  });

  it('will return status 200 and an empty array with one product if query is incorrect', async () => {
    const { name, status, category } = generateProduct();

    await new CategoryRepository().save({ name: category });

    await new ProductRepository().save({ name, status });

    const response = await supertest(app).get('/products?name=ab123');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });
});
*/
