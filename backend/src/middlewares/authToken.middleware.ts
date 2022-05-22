import { Request, Response, NextFunction } from 'express';
import { sign } from 'jsonwebtoken';
import jwtConfig from '../configs';

const authToken = (req: Request, _: Response, next: NextFunction) => {
  const { secretKey, expiresIn } = jwtConfig;
  const signToken = sign({ ...req.user }, secretKey, {
    expiresIn,
  });

  req.token = signToken;

  return next();
};

export default authToken;
