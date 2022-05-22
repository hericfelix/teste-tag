import { NextFunction, Request, Response } from 'express';
import { ConnectionTestJest, generateCategory } from '..';
import Category from '../../entities/category';
import { findCategory } from '../../middlewares';
import { CategoryRepository } from '../../repositories';
import { CategoryRepo } from '../../ts/interfaces';

describe('Tests for findCategory middleware', () => {
  const mockReq: Partial<Request> = {};
  const mockRes: Partial<Response> = {};
  const mockNext: Partial<NextFunction> = jest.fn();

  let categoryRepo: CategoryRepo;
  let category: Category;

  beforeAll(async () => {
    await ConnectionTestJest.create();
  });

  afterAll(async () => {
    await ConnectionTestJest.clear();
    await ConnectionTestJest.close();
  });

  beforeEach(async () => {
    await ConnectionTestJest.clear();
    mockRes.json = jest.fn().mockReturnValue(mockRes);
    mockRes.status = jest.fn().mockReturnValue(mockRes);

    categoryRepo = new CategoryRepository();
    category = generateCategory();
  });

  it('will return status 404 and error if user category not exist on database', async () => {
    mockReq.body = {
      category: 'random name',
    };

    await findCategory(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockRes.status).toBeCalled();
    expect(mockRes.status).toBeCalledTimes(1);
    expect(mockRes.status).toBeCalledWith(404);

    expect(mockRes.json).toBeCalled();
    expect(mockRes.json).toBeCalledTimes(1);
    expect(mockRes.json).toBeCalledWith({ message: 'category not found' });
  });

  it('will return status 404 and error if password does not match', async () => {
    await categoryRepo.save(category);

    mockReq.body = {
      category: category.name,
    };

    await findCategory(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockRes.status).toBeCalled();
    expect(mockRes.status).toBeCalledTimes(1);
    expect(mockRes.status).toBeCalledWith(404);

    expect(mockRes.json).toBeCalled();
    expect(mockRes.json).toBeCalledTimes(1);
    expect(mockRes.json).toBeCalledWith({ message: 'invalid credentials' });
  });

  it('will call next function and add user property', async () => {
    await categoryRepo.save(category);
    mockReq.body = { ...category };

    await findCategory(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockNext).toBeCalled();
    expect(mockNext).toBeCalledTimes(1);

    expect(mockReq).toHaveProperty('userDb');
    expect(mockReq.category).toEqual(category);
  });
});
