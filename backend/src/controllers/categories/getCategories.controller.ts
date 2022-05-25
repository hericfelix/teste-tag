import { Request, Response } from 'express';
import { CategoryRepository } from '../../repositories';

export const getProducts = async (req: Request, res: Response) => {
  const categories = await new CategoryRepository().get();

  return res.status(200).json(categories);
};

export default getProducts;
