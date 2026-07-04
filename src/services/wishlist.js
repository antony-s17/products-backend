import Wishlist from "../models/wishlist.js";
import { selectAllProducts } from "./product.js";

const insertToWishList = async (id, productId) => {
    try {
        await Wishlist.create({ userId: id, productId });
        return {
            ok: true
        }
    } catch(error) {
        return {
            ok: false
        }
    }
}

const getWishListProducts = async (id) => {
    try {
        const result = await Wishlist.find({ userId: id }, { productId: true, _id: false });
        const { data } = await selectAllProducts(result.map(({ productId }) => productId));
        return {
            ok: true,
            data: data
        };
    } catch (error) {
        return {
            ok: false
        }
    }
}

const deleteProductFromWishList = async (id, productId) => {
    try {
        const result = await Wishlist.findOneAndDelete({ userId: id, productId });
        if (!result) {
            throw new Error("Product not found in wishlist");
        }
        return {
            ok: true,
            data: result
        }
    } catch(error) {
        return {
            ok: false,
            data: []
        }
    }
}

export {
    insertToWishList,
    getWishListProducts,
    deleteProductFromWishList
}