import faker from '@faker-js/faker';
import { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { ConnectionTestJest, generateUser } from '..';
import { jwtConfig } from '../../configs';
import { validateToken } from '../../middlewares';
import { UserRepository } from '../../repositories';

describe('Tests for validateToken middleware', () => {
  const mockReq: Partial<Request> = {};
  const mockRes: Partial<Response> = {};
  const mockNext: Partial<NextFunction> = jest.fn();

  beforeEach(() => {
    mockRes.json = jest.fn().mockReturnValue(mockRes);
    mockRes.status = jest.fn().mockReturnValue(mockRes);
  });

  it('will return status 401 and error message if missing token', () => {
    mockReq.headers = {
      authorization: undefined,
    };

    validateToken(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockRes.status).toBeCalled();
    expect(mockRes.status).toBeCalledTimes(1);
    expect(mockRes.status).toBeCalledWith(401);

    expect(mockRes.json).toBeCalled();
    expect(mockRes.json).toBeCalledTimes(1);
    expect(mockRes.json).toBeCalledWith({
      message: 'missing authorization header',
    });
  });

  it('will return status 401 and error message if malformed token', () => {
    mockReq.headers = {
      authorization: 'Bearer qwopewqioej1!jewqoijewqi',
    };

    validateToken(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockRes.status).toBeCalled();
    expect(mockRes.status).toBeCalledTimes(1);
    expect(mockRes.status).toBeCalledWith(401);

    expect(mockRes.json).toBeCalled();
    expect(mockRes.json).toBeCalledTimes(1);
    expect(mockRes.json).toBeCalledWith({
      error: 'invalid token',
    });
  });

  it('will return status 401 and error message if invalid token', () => {
    const invalidToken = sign({ ...generateUser() }, faker.datatype.string(10));

    mockReq.headers = {
      authorization: `Bearer ${invalidToken}`,
    };

    validateToken(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockRes.status).toBeCalled();
    expect(mockRes.status).toBeCalledTimes(1);
    expect(mockRes.status).toBeCalledWith(401);

    expect(mockRes.json).toBeCalled();
    expect(mockRes.json).toBeCalledTimes(1);
    expect(mockRes.json).toBeCalledWith({
      error: 'invalid token',
    });
  });

  it('will call next function and add key decodedEmail on mockReq object', async () => {
    const { email } = generateUser();

    const { secretKey, expiresIn } = jwtConfig;
    const validToken = sign({ email: email }, secretKey, { expiresIn });

    mockReq.headers = {
      authorization: `Bearer ${validToken}`,
    };

    validateToken(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockNext).toBeCalled();
    expect(mockNext).toBeCalledTimes(1);

    expect(mockReq).toHaveProperty('email');
  });
});
