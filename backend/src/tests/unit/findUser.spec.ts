import { NextFunction, Request, Response } from 'express';
import { ConnectionTestJest, generateUser } from '..';
import User from '../../entities/user';
import { ErrorHandler } from '../../helpers';
import { findUser } from '../../middlewares';
import { UserRepository } from '../../repositories';
import { IUser, UserRepo } from '../../ts/interfaces';

describe('Tests for findUser middleware', () => {
  const mockReq: Partial<Request> = {};
  const mockRes: Partial<Response> = {};
  const mockNext: Partial<NextFunction> = jest.fn();

  let userRepo: UserRepo;
  let user: IUser;

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

    userRepo = new UserRepository();
    user = generateUser();
  });

  it('will return status 404 and error if user does not exist on database', async () => {
    mockReq.body = {
      email: 'random@email.com',
    };

    await findUser(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenLastCalledWith(expect.any(Error));
    expect(mockReq.user).toBeUndefined();
  });

  it('will return status 404 and error if password does not match', async () => {
    await userRepo.save(user);

    mockReq.body = {
      email: user.email,
      password: 'a',
    };

    await findUser(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockNext).toHaveBeenCalledTimes(2);
    expect(mockNext).toHaveBeenLastCalledWith(expect.any(Error));
    expect(mockReq.user).toBeUndefined();
  });

  it('will call next function and add user property', async () => {
    await userRepo.save(user);
    mockReq.body = { ...user };

    await findUser(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockNext).toBeCalled();
    expect(mockNext).toHaveBeenCalledTimes(3);

    expect(mockReq).toHaveProperty('user');
    expect(mockReq.user).toEqual(user);
  });
});
