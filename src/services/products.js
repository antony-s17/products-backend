import { prisma } from '../db/config.js';
import { cleanData } from '../utils/utils.js';
import CError, { Selector } from '../misc/errors.js';

const attributes = ['id', 'createdAt', 'updatedAt'];

const createProduct = async (product) => {
    return await prisma.product.create({ data: product })    
}

const getAllProducts = async () => {
    const response = await prisma.product.findMany({ orderBy: { name: "asc"  } });
    return response.map(cleanData(...attributes));
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