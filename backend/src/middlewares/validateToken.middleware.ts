import { NextFunction, Request, Response } from 'express';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import { jwtConfig } from '../configs';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'missing authorization header' });
  }

  const token = req.headers.authorization?.split(' ')[1];

  console.log(token);

  jsonwebtoken.verify(token, jwtConfig.secretKey, (err, decoded) => {
    console.log(err);
    if (err) {
      return res.status(401).json({ error: 'invalid token' });
    }

    const { email } = decoded as JwtPayload;

    req.email = email;

    return next();
  });
};

export default validateToken;
