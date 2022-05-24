import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { generateUser } from '..';
import { jwtConfig } from '../../configs';
import { authToken } from '../../middlewares';

describe('Tests for authToken middleware', () => {
  const mockReq: Partial<Request> = {};
  const mockRes: Partial<Response> = {};
  const mockNext: Partial<NextFunction> = jest.fn();

  beforeEach(() => {
    mockRes.json = jest.fn().mockReturnValue(mockRes);
    mockRes.status = jest.fn().mockReturnValue(mockRes);
  });

  it('will call mockNext and add token key to req', () => {
    mockReq.body = generateUser();

    authToken(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockNext).toBeCalled();
    expect(mockNext).toBeCalledTimes(1);
    expect(mockReq).toHaveProperty('token');
    expect(verify(mockReq.token, jwtConfig.secretKey)).toBeTruthy();
  });
});
