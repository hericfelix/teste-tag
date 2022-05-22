import { Request, Response } from 'express';
import { ProductRepository } from '../../repositories';

export const getProducts = async (req: Request, res: Response) => {
  const products = await new ProductRepository().get(req.query);

  return res.status(200).json(products);
};

export default getProducts;
