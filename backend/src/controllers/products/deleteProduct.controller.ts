import { Request, Response } from 'express';
import { ProductRepository } from '../../repositories';

export const deleteProduct = async (req: Request, res: Response) => {
  const { ids } = req.body;

  await new ProductRepository().delete(ids);

  return res.status(204).json();
};

export default deleteProduct;
