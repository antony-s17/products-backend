import { isValidUUID } from "../utils/utils.js";
import CError, { Selector } from "../misc/errors.js";
import { insertToWishList, getWishListProducts, deleteProductFromWishList } from "../services/wishlist.js";

const addToWishList = async (req, res, next) => {
    if (!isValidUUID (req.body.productId)) {
        return next(new CError(Selector.BAD_INPUT));
    }
    const { productId } = req.body;
    const { id } = res.locals;
    const response = await insertToWishList(id, productId);
    if (!response.ok) {
        return next(new CError(Selector.BAD_ERROR));
    }
    return res.status(200).json(
        { 
            ok: true,
            message: "Product added to wishlist"
        }
    )
};

const deleteFromWishList = async (req, res, next) => {
    if (!isValidUUID (req.params.productId)) {
        return next(new CError(Selector.BAD_INPUT));
    }
    const productId = req.params.productId;
    const { id } = res.locals;
    
    const result = await deleteProductFromWishList(id, productId);
    if (!result.ok) {
        return next(new CError(Selector.BAD_ERROR));
    }
    return res.status(201).json(
        { 
            ok: true,
            message: "Product deleted from wishlist"
        }
    )
};

const getWishList = async (req, res, next) => {
    const { id } = res.locals;
    const response = await getWishListProducts(id);
    if (!response.ok) {
        return next(new CError(Selector.NOT_FOUND));
    }
    return res.status(200).json({
        ok: true,
        data: response.data
    });
}

export {
    addToWishList,
    deleteFromWishList,
    getWishList
}