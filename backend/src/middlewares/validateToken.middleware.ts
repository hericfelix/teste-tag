import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { config } from '../configs';

const validateAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  jsonwebtoken.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      return next(err);
    }

    req.decodedEmail = decoded.email;
    return next();
  });
};

export default validateAuth;
