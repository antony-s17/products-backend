
import { isValidUUID } from "../utils/utils.js";
import CError, { Selector } from "../misc/errors.js";
import { getCartProducts, insertItemToCart, createOrder } from "../services/cart.js";

const addItemToCart = async (req, res, next) => {
    const { id: userId } = res.locals;
    const { productId } = req.body;
    if( !isValidUUID(userId) || !isValidUUID(productId) ) {
        return next(new CError(Selector.BAD_INPUT));
    }
    const response = await insertItemToCart(userId, productId);
    if (!response.ok) {
        return next(new CError(Selector.BAD_ERROR));
    }
    return res.status(201).json({
        ok: true,
        data: "Product added to cart"
    })
}

const infoCart = async (req, res, next) => {
    const { id:userId } = res.locals;
    if (!isValidUUID(userId)) {
        return next(new CError(Selector.BAD_INPUT))
    }
    const response = await getCartProducts(userId);
    if (!response.ok) {
        return next(new CError(Selector.BAD_ERROR));
    }
    return res.status(200).json(
        {
            ok: true,
            data: response.data
        }
    )
}

const checkoutCart = async (req, res, next) => {
    const {id: userId } = res.locals;
    if (!isValidUUID(userId)) {
        return next(new CError(Selector.BAD_INPUT));
    }
    const response = await createOrder(userId);
    if (!response.ok) {
        return next(new CError(Selector.BAD_ERROR));
    }
    return res.status(200).json(
        {
            ok: true,
            data: response.data
        }
    )
}

export {
    addItemToCart,
    infoCart,
    checkoutCart
}
