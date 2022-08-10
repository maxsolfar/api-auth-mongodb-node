import { Router } from 'express';
import * as usersController from '../controllers/users.controller';
import { authJwt, verifySignup } from '../middlewares';
const router = Router();

router.post('/',[authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRoles], usersController.createUser);

export default router;