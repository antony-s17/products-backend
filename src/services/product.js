import { prisma } from '../db/config.js';
import { cleanData } from '../utils/utils.js';
import CError, { Selector } from '../misc/errors.js';

const attributes = ['id', 'createdAt', 'updatedAt'];

const createProduct = async (product) => {
    return await prisma.product.create({ data: product })    
}

const getAllProducts = async (productId) => {
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

const getProductById = async (id) => {
    const response = await prisma.product.findUnique({ where: {id: id }})
    if (!response) {
        throw new CError(Selector.NOT_FOUND);
    }
    return cleanData(...attributes)(response);
}

const updateProduct = async (id, data) => {
    const productUpdate = await prisma.product.update({ where: { id } , data});
    return cleanData(...attributes)(productUpdate);
}

const deleteProduct = async (id) => {
    return await prisma.product.delete({where: { id }})
}

export {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}