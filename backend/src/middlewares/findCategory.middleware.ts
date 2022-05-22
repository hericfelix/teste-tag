import { NextFunction, Request, Response } from 'express';
import Category from '../entities/category';
import { ErrorHandler } from '../helpers';
import { CategoryRepository } from '../repositories';

const findCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category: Category = await new CategoryRepository().getByName(
      req.body.category
    );

    if (!category) {
      throw new ErrorHandler(404, 'invalid category');
    }

    req.category = category;

    delete req.body.category;

    return next();
  } catch (err) {
    return next(err);
  }
};

export default findCategory;
