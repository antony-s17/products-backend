import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../services/products.js';
import { isValidUUID } from '../utils/utils.js';
import CError, { Selector } from '../misc/errors.js';

const createProductController = async (req, res, next) => {
   try {
        const { name, description, price, stock, imageUrl } = req.body;
        const product = await createProduct({ name, description, price, stock, imageUrl });
        return res.status(201).json({
            ok: true,
            data: product
        });
   } catch (error) {
        return next(error);
   }
}

const getAllProductsController = async (req, res, next) => {
    try {
        const products = await getAllProducts();
        return res.status(200).json({
            ok: true,
            data: products
        })
    } catch(error) {
        return next(error);
    }
}

const getProductByIdController = async (req, res, next) => {
    try {
        if (!isValidUUID(req.params.id)) {
            return next(new CError(Selector.BAD_INPUT));
        }
        const product = await getProductById(req.params.id);
        if (!product) {
            return next(new CError(Selector.NOT_FOUND));
        }
        return res.status(200).json({
            ok: true,
            data: product
        })
    } catch (error) {
        return next(error);
    }
}

const updateProductController = async (req, res, next) => {
    try {
        if (!isValidUUID(req.params.id)) {
            return next(new CError(Selector.BAD_INPUT));
        }
        const product = await updateProduct(req.params.id, req.body);
        return res.status(200).json({
            ok: true,
            data: product
        })
    } catch(error) {
        if (error.code === 'P2025') {
            return next(new CError(Selector.NOT_FOUND));
        }
        return next(error)
    }
}

const deleteProductController = async (req, res, next) => {
    try {
        if (!isValidUUID(req.params.id)) {
            return next(new CError(Selector.BAD_INPUT));
        }
        await deleteProduct(req.params.id);
        return res.status(200).json({
            ok: true,
            message: 'Product deleted'
        })
    } catch (error) {
        if (error.code === 'P2025') {
            return next(new CError(Selector.NOT_FOUND));
        }
        return next(error);
    }
}

export {
    getAllProductsController,
    getProductByIdController,
    createProductController,
    updateProductController,
    deleteProductController
}