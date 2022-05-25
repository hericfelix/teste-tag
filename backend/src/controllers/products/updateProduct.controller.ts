import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';
import { CategoryRepository, ProductRepository } from '../../repositories';
import cloudinary from 'cloudinary';
import { cloudinaryConfig } from '../../configs';
import Category from '../../entities/category';
import { ErrorHandler } from '../../helpers';

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (req.file) {
      cloudinary.v2.config(cloudinaryConfig);

      const result = await cloudinary.v2.uploader.upload(req.file.path);

      req.body.imageUrl = result.url;
    }

    if (req.body.category) {
      const category: Category = await new CategoryRepository().getByName({
        name: req.body.category,
      });

      if (!category) {
        throw new ErrorHandler(404, 'invalid category');
      }

      req.body.category = category;
    }

    const updatedResult: UpdateResult = await new ProductRepository().update(
      id,
      req.body
    );

    if (updatedResult.affected === 0) {
      throw new ErrorHandler(404, 'product not found');
    }

    return res.status(204).json();
  } catch (err) {
    return res
      .status(err.statusCode || err.status)
      .json({ message: err.message });
  }
};

export default updateProduct;
