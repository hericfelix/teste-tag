import { Request, Response } from 'express';
import { ProductRepository } from '../../repositories';

const createProduct = async (req: Request, res: Response) => {
  const { data } = req.body;

  const { user, category } = req;

  const product = await new ProductRepository().save(data);

  product.user = user;
  product.category = category;

  await new ProductRepository().save(product);

  return res.status(201).json({ message: 'product created' });
};

export default createProduct;
