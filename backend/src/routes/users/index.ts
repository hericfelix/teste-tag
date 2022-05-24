import { Router } from 'express';
import { login } from '../../controllers';
import { authToken, findUser } from '../../middlewares';

const router = Router();

router.post('/login', findUser, authToken, login);

export default router;
