import { insertProduct, selectAllProducts, selectProductById, updateProduct, deleteProduct } from "../services/product.js";
import { isValidUUID } from '../utils/utils.js';
import CError, { Selector } from '../misc/errors.js';

const createProduct = async (req, res, next) => {
    const { name, description, price, stock, imageUrl } = req.body;
    const response = await insertProduct({ name, description, price, stock, imageUrl });
    if (!response.ok) {
        return next(new CError(Selector.BAD_ERROR));
    }
    return res.status(201).json({
        ok: true,
        data: response.data
    });
}

const getAllProducts = async (req, res, next) => {
    const response = await selectAllProducts();
    if (!response.ok) {
        return next(new CError(Selector.BAD_ERROR));
    }
    return res.status(200).json({
        ok: true,
        data: response.data
    })
}

const getProductById = async (req, res, next) => {
    if (!isValidUUID(req.params.id)) {
        return next(new CError(Selector.BAD_INPUT));
    }
    const response = await selectProductById(req.params.id);
    if (!response.ok) {
        return next(new CError(Selector.NOT_FOUND));
    }
    return res.status(200).json({
        ok: true,
        data: response.data
    })
}

const updateInfoProduct = async (req, res, next) => {
    if (!isValidUUID(req.params.id)) {
        return next(new CError(Selector.BAD_INPUT));
    }
    const response = await updateProduct(req.params.id, req.body);
    if (!response.ok) {
        if (response.data === 'P2025') {
            return next(new CError(Selector.NOT_FOUND));
        }
        return next(new CError(Selector.BAD_ERROR));
    }
    return res.status(200).json({
        ok: true,
        data: response
    })
}

const removeProduct = async (req, res, next) => {
    if (!isValidUUID(req.params.id)) {
        return next(new CError(Selector.BAD_INPUT));
    }
    const response = await deleteProduct(req.params.id);
    if (!response.ok) {
        if (response.data === 'P2025') {
            return next(new CError(Selector.NOT_FOUND));
        }
        return next(new CError(Selector.BAD_ERROR));
    }
    return res.status(200).json({
        ok: true,
        message: 'Product deleted'
    })
}

export {
    createProduct,
    getAllProducts,
    getProductById,
    updateInfoProduct,
    removeProduct
}