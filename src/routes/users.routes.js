import { Router } from 'express';
import * as usersController from '../controllers/users.controller';
import { authJwt, verifySignup } from '../middlewares';
const router = Router();


router.get('/', usersController.getUsers);
router.get('/:userId', usersController.getUserById);
router.post('/',[authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRoles], usersController.createUser);
router.put('/:userId', [authJwt.verifyToken, authJwt.isAdmin], usersController.updateUserById);
router.delete('/:userId', [authJwt.verifyToken, authJwt.isAdmin], usersController.deleteUserById);

export default router;