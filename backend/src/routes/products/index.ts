import { Router } from 'express';
import { upload } from '../../configs';
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../../controllers';
import {
  findCategory,
  findUser,
  validateSchema,
  validateToken,
} from '../../middlewares';
import { createProductSchema, updateProductSchema } from '../../schemas';

const router = Router();

router.get('', getProducts);
router.post(
  '',
  validateToken,
  upload.single('image'),
  findUser,
  validateSchema(createProductSchema),
  findCategory,
  createProduct
);
router.delete('', validateToken, deleteProduct);
router.patch(
  '/:id',
  validateToken,
  upload.single('image'),
  validateSchema(updateProductSchema),
  updateProduct
);

export default router;
