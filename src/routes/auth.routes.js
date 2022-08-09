import { Router } from 'express';
const router = Router();

import * as authController from '../controllers/auth.controller';


router.post('/signin', authController.singIn);
router.post('/signup', authController.singUp);

export default router;