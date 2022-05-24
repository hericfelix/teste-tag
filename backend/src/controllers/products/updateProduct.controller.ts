import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';
import { ProductRepository } from '../../repositories';
import cloudinary from 'cloudinary';
import { cloudinaryConfig } from '../../configs';

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (req.file) {
    cloudinary.v2.config(cloudinaryConfig);

    const result = await cloudinary.v2.uploader.upload(req.file.path);

    req.body.imageUrl = result.url;
  }

  try {
    const updatedResult: UpdateResult = await new ProductRepository().update(
      id,
      req.body
    );

    if (updatedResult.affected === 0) {
      throw new Error();
    }

    return res.status(204).json();
  } catch (err) {
    return res.status(404).json({ message: 'product not found' });
  }
};

export default updateProduct;
