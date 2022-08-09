import { Router } from 'express';
const router = Router();

import * as productsController from '../controllers/products.controller';

router.get('/', productsController.getProducts);
router.get('/:productId', productsController.getProductById);
router.post('/', productsController.createProduct);
router.put('/:productId', productsController.updateProductById);
router.delete('/:productId', productsController.deleteProductById);

export default router;