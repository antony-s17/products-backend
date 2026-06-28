import products from '../db/products.js';

const getAllProducts = async () => {
    return products;
}

const getProductById = async (id) => {
    const product = products.find((product) => product.id === parseInt(id));
    return product;
}

const createProduct = async (data) => {
    if (data.price < 0 || data.stock < 0) {
        throw new Error('Price and stock must be greater than or equal to 0');
    }
    const newProductId = products.length + 1;
    const newProduct = {
        id: newProductId,
        name: data.name,
        category: data.category,
        price: data.price,
        stock: data.stock,
        brand: data.brand
    }
    products.push(newProduct);
    return products;
}

const updateProduct = async (id, data) => {
    let product = await getProductById(id);
    if (!product) {
        return null;
    }
    product = {
        name: data.name || product.name,
        category: data.category || product.category,
        price: data.price || product.price,
        stock: data.stock || product.stock,
        brand: data.brand || product.brand
    }
    return product;
}

const deleteProduct = async (id) => {
    const product = await getProductById(id);
    if (!product) {
        return null;
    }
    return products.filter((product) => product.id !== parseInt(id));
}

export {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}