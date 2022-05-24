import { Request, Response } from 'express';
import { DeleteResult } from 'typeorm';
import { ProductRepository } from '../../repositories';

export const deleteProduct = async (req: Request, res: Response) => {
  const { ids } = req.body;

  const deleteResult: DeleteResult = await new ProductRepository().delete(ids);

  if (deleteResult.affected === 0) {
    return res.status(404).json({ error: 'product not found' });
  }

  return res.status(204).json();
};

export default deleteProduct;
