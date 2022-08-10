import { Router } from 'express';
const router = Router();
import { authJwt } from '../middlewares';

import * as productsController from '../controllers/products.controller';

router.get('/', productsController.getProducts);
router.get('/:productId', productsController.getProductById);
router.post('/', [authJwt.verifyToken, authJwt.isAdmin], productsController.createProduct);
router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsController.updateProductById);
router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsController.deleteProductById);

export default router;