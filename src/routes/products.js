import express from 'express';
import { getAllProductsController, getProductByIdController, createProductController, updateProductController, deleteProductController } from '../controllers/products.js';
import validateProductsMiddleware from '../middlewares/validateProduct.js';

const router = express.Router();

router.get('/', getAllProductsController);
router.post('/', validateProductsMiddleware, createProductController);
router.delete('/:id', deleteProductController);
router.put('/:id', updateProductController);
router.get('/:id', getProductByIdController);

export default router;