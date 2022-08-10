import { Router } from 'express';
const router = Router();

import * as authController from '../controllers/auth.controller';
import {verifySignup} from '../middlewares/';

router.post('/signin', authController.signIn);
router.post('/signup', verifySignup.checkEmail, authController.signUp);

export default router;