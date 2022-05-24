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

  it('will return status 404 and error if category not exist on database', async () => {
    mockReq.body = {
      category: 'random name',
    };

    await findCategory(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenLastCalledWith(expect.any(Error));
    expect(mockReq.category).toBeUndefined();
  });

  it('will call next function and add category property', async () => {
    await categoryRepo.save(category);
    mockReq.body = { ...category };

    await findCategory(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockNext).toBeCalled();
    expect(mockNext).toBeCalledTimes(2);

    expect(mockReq).toHaveProperty('category');
    expect(mockReq.category).toEqual(category);
  });
});
