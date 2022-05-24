import { NextFunction, Request, Response } from 'express';
import User from '../entities/user';
import { ErrorHandler } from '../helpers';
import { UserRepository } from '../repositories';

const findUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = await new UserRepository().getByEmail(
      req.body.email || req.email
    );

    if (!user) {
      throw new ErrorHandler(401, 'invalid credentials');
    }

    if (req.body.password && req.body.password !== user.password) {
      throw new ErrorHandler(401, 'invalid credentials');
    }

    req.user = user;

    return next();
  } catch (err) {
    return next(err);
  }
};

export default findUser;
