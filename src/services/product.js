import { prisma } from '../db/config.js';
import { cleanData } from '../utils/utils.js';
import CError, { Selector } from '../misc/errors.js';

const attributes = ['id', 'createdAt', 'updatedAt'];

const insertProduct = async (product) => {
    try {
        const response = await prisma.product.create({ data: product });
        return {
            ok: true,
            data: cleanData(...attributes)(response)
        }  
    } catch (error) {
        return {
            ok: false
        }
    } 
}

const selectAllProducts = async (productId) => {
    try {
        const response = await prisma.product.findMany({ select: { id: true,name: true, price: true }, where: {id: { in: productId }}});
        return {
            ok: true,
            data: response
        }
    } catch (error) {
        return {
            ok: false,
            data: []
        }
    }
}

const selectProductById = async (id) => {
    try {
        const response = await prisma.product.findUnique({ where: {id: id }})
        if (!response) {
            throw new CError("Product not found");
        }
        return {
            ok: true,
            data: cleanData(...attributes)(response)
        }
    } catch (error) {
        return {
            ok: false,
            data: {}
        }
    }
}

const updateProduct = async (id, data) => {
    try {
        const productUpdate = await prisma.product.update({ where: { id } , data});
        return cleanData(...attributes)(productUpdate);
    } catch (error) {
        return {
            ok: false,
            data: error.code
        }
    }
}

const deleteProduct = async (id) => {
    try {
        await prisma.product.delete({where: { id }});
        return {
            ok: true
        }
    } catch (error) {
        return {
            ok: false,
            data: error.code
        }
    }
}

export {
    insertProduct,
    selectAllProducts,
    selectProductById,
    updateProduct,
    deleteProduct
}