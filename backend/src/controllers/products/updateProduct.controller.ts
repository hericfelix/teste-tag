import { Request, Response } from 'express';
import { ProductRepository } from '../../repositories';

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  await new ProductRepository().update(id, req.body);

  return res.status(204).json();
};

export default updateProduct;
