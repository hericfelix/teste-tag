import { NextFunction, Response, Request } from 'express';
import { validateSchema } from '../../middlewares';
import { generateProduct } from '..';
import { createProductSchema } from '../../schemas';

describe('Tests for validatSchema middleware', () => {
  const mockRes: Partial<Response> = {};
  const mockReq: Partial<Request> = {};
  const mockNext: NextFunction = jest.fn();

  beforeEach(() => {
    mockRes.json = jest.fn().mockReturnValue(mockRes);
    mockRes.status = jest.fn().mockReturnValue(mockRes);
    mockReq.body = {};
  });
  it('will call next function with error if body is invalid', async () => {
    const { name, ...rest } = generateProduct();

    mockReq.body = rest;

    await validateSchema(createProductSchema)(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenLastCalledWith(expect.any(Error));
  });
  it('will call next function and add key validated to req', async () => {
    mockReq.body = generateProduct();

    await validateSchema(createProductSchema)(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockReq.validated).toBeTruthy();

    expect(mockNext).toBeCalled();
    expect(mockNext).toBeCalledTimes(2);
  });

  it('will call next function and add key validated to req, ignoring aditional key passed', async () => {
    const product = generateProduct();

    const productWithExtraKey = { ...product, ignore: 'ignored key' };

    mockReq.body = productWithExtraKey;

    await validateSchema(createProductSchema)(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockReq.validated).toBeTruthy();
    expect(mockReq.validated.ignore).toBeUndefined();

    expect(mockNext).toBeCalled();
    expect(mockNext).toBeCalledTimes(3);
  });
});
