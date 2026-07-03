import express from 'express';
import { getAllProductsController, getProductByIdController, createProductController, updateProductController, deleteProductController } from '../controllers/products.js';
import validateProductsMiddleware from '../middlewares/validateProduct.js';
import authenticate from '../middlewares/authenticate.js';
import reviewRouter from './review.js';

const router = express.Router();

router.get('/', getAllProductsController);
router.post('/', authenticate,validateProductsMiddleware, createProductController);
router.delete('/:id', authenticate,deleteProductController);
router.put('/:id', authenticate, updateProductController);
router.get('/:id', authenticate, getProductByIdController);
//reviews routes
router.use('/:productId/reviews', authenticate, reviewRouter);

export default router;