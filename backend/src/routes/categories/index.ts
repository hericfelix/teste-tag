import { Router } from 'express';
import { login } from '../../controllers';

const router = Router();

router.get('/categories', login);

export default router;
