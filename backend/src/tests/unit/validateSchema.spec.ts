import { NextFunction, Response, Request } from 'express';
import { validateSchema } from '../../middlewares';
import { generateProduct } from '..';
import { productSchema } from '../../schemas';

describe('Tests for validatSchema middleware', () => {
  const mockRes: Partial<Response> = {};
  const mockReq: Partial<Request> = {};
  const mockNext: NextFunction = jest.fn();

  beforeEach(() => {
    mockRes.json = jest.fn().mockReturnValue(mockRes);
    mockRes.status = jest.fn().mockReturnValue(mockRes);
    mockReq.body = {};
  });
  it('will return status 400 and error message if body is invalid', async () => {
    const { name, ...rest } = generateProduct();

    mockReq.body = rest;

    await validateSchema(createProductSchema)(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockRes.status).toBeCalled();
    expect(mockRes.status).toBeCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(400);

    expect(mockRes.json).toBeCalled();
    expect(mockRes.json).toBeCalledTimes(1);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: ['name is a required field'],
    });

    expect(mockNext).toHaveBeenCalledTimes(0);
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
    expect(mockNext).toBeCalledTimes(1);
  });

  it('will call next function and add key validated to req, ignoring aditional key passed', async () => {
    const product = generateProduct();

    product.ignore = 'ignored key';

    mockReq.body = product;

    await validateSchema(createProductSchema)(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    expect(mockReq.validated).toBeTruthy();
    expect(mockReq.validated.ignore).toBeUndefined();

    expect(mockNext).toBeCalled();
    expect(mockNext).toBeCalledTimes(1);
  });
});
