import { Request, Response } from 'express';
import { ProductRepository } from '../../repositories';
import cloudinary from 'cloudinary';
import { cloudinaryConfig } from '../../configs';

const createProduct = async (req: Request, res: Response) => {
  const data = req.body;

  cloudinary.v2.config(cloudinaryConfig);

  const result = await cloudinary.v2.uploader.upload(req.file.path);

  data.imageUrl = result.url;

  const { user, category } = req;

  const product = await new ProductRepository().save(data);

  product.user = user;
  product.category = category;

  await new ProductRepository().save(product);

  return res.status(201).json({ message: 'product created' });
};

export default createProduct;
