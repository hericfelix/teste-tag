import { Request, Response } from 'express';
import { CategoryRepository } from '../../repositories';

export const getCategories = async (req: Request, res: Response) => {
  const categories = await new CategoryRepository().get();

  return res.status(200).json(categories);
};

export default getCategories;
