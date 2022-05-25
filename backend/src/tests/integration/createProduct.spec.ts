/*import supertest from 'supertest';
import { sign } from 'jsonwebtoken';
import { ConnectionTestJest, generateProduct, generateUser } from '..';
import app from '../../app';
import { UserRepository, CategoryRepository } from '../../repositories';
import { jwtConfig } from '../../configs';

describe('create product route integration test', () => {
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

  it('will be able to create product, return status 201 and success message', async () => {
    const { secretKey, expiresIn } = jwtConfig;
    const { email } = await new UserRepository().save(generateUser());
    const validToken = sign({ email }, secretKey, { expiresIn });

    const { name, status, category } = generateProduct();

    await new CategoryRepository().save({ name: category });

    const response = await supertest(app)
      .post('/products')
      .attach('image', '../assets/test.jpg')
      .field('name', name)
      .field('status', status)
      .field('category', category)
      .set('Authorization', `Bearer ${validToken}`);

    expect(response.status).toBe(201);
    expect(response.body).toStrictEqual({ message: 'product created' });
  });

  it('will not be able to create product, return status 400 and error message', async () => {
    const { secretKey, expiresIn } = jwtConfig;
    const { email } = await new UserRepository().save(generateUser());
    const validToken = sign({ email }, secretKey, { expiresIn });

    const { status, category } = generateProduct();

    await new CategoryRepository().save({ name: category });

    const response = await supertest(app)
      .post('/products')
      .attach('image', '../assets/test.jpg')
      .field('status', status)
      .field('category', category)
      .set('Authorization', `Bearer ${validToken}`);

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      errors: ['name is a required field'],
    });
  });

  it('will not be able to create product, return status 401 and error message', async () => {
    const { secretKey, expiresIn } = jwtConfig;
    const { email } = await new UserRepository().save(generateUser());
    const validToken = sign({ email }, secretKey, { expiresIn });

    const { status, category } = generateProduct();

    await new CategoryRepository().save({ name: category });

    const response = await supertest(app)
      .post('/products')
      .attach('image', '../assets/test.jpg')
      .field('status', status)
      .field('category', category)
      .set('Authorization', `Bearer ${validToken}`);

    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({
      error: 'invalid token',
    });
  });
}); */
