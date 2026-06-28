import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../services/products.js';

const getAllProductsController = async (req, res) => {
    const products = await getAllProducts();
    if (!products) {
        return res.status(404).json(
            {
                ok: false,
                data: [],
                message: 'No products found'
            }
        )
    }
    return res.status(200).json({
        ok: true,
        data: products
    })
}

const getProductByIdController = async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
        if (!product) {
            return res.status(404).json(
                {
                    ok: false,
                    data:{},
                    message: 'Product not found'
                }
            )
        }
        return res.status(200).json({
            ok: true,
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Internal error'
        })
    }
}

const createProductController = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            ok: false,
            message: 'No send data'
        })
    }
    const { name, category, price, stock, brand } = req.body;
    if (!name || !category || !price || !stock || !brand) {
        return res.status(400).json({
            ok: false,
            message: 'Missing required fields'
        })
    }
    const products = await createProduct(req.body);
    return res.status(201).json({
        ok: true,
        data: products
    })
}

const updateProductController = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            ok: false,
            message: 'No send data'
        })
    }
    const { name, category, price, stock, brand } = req.body;
    const product = await updateProduct(req.params.id, req.body);
    if (!product) {
        return res.status(404).json({
            ok: false,
            message: 'Product not found'
        })
    }
    return res.status(200).json({
        ok: true,
        data: product
    })
}

const deleteProductController = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            ok: false,
            message: 'No send data'
        })
    }
    const products = await deleteProduct(req.params.id);
    if (!products) {
        return res.status(404).json({
            ok: false,
            message: 'Product not found'
        })
    }
    return res.status(200).json({
        ok: true,
        data: products
    })
}

export {
    getAllProductsController,
    getProductByIdController,
    createProductController,
    updateProductController,
    deleteProductController
}