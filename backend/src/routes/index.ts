import { Router } from 'express';
import productRouter from './products';
import userRouter from './users';
import categoryRouter from './categories';

const router = Router();

router.use('/products', productRouter);
router.use('', userRouter);
router.use('', categoryRouter);

export default router;
