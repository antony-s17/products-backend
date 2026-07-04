import { insertReview, selectReviewByProductId } from "../services/review.js";
import CError, {Selector} from "../misc/errors.js";
import { isValidUUID } from "../utils/utils.js";

const createReview = async (req, res, next) => {
    const { rating, comment } = req.body;
    const productId = req.params.productId;
    const { id: userId } = res.locals;
    if (!productId || !userId || rating === undefined || !isValidUUID(productId) || !isValidUUID(userId)) {
        return next(new CError(Selector.BAD_INPUT));
    }
    const response = await insertReview({ productId, userId, rating, comment });
    if (!response.ok) {
        return next(new CError(Selector.BAD_ERROR));
    }
    return res.status(201).json({
        ok: true,
        message: "Review created successfully"
    });
}

const getReviewByProduct = async (req, res, next) => {
    const productId = req.params.productId;
    const { id: userId } = res.locals;
    if (!productId || !userId || !isValidUUID(productId) || !isValidUUID(userId)) {
        return next(new CError(Selector.BAD_INPUT));
    }
    const response = await selectReviewByProductId(productId, userId);
    if (!response.ok) {
        return next(new CError(Selector.NOT_FOUND));
    }
    return res.status(200).json({
        ok: true,
        data: response.data
    })
}

export {
    createReview,
    getReviewByProduct
}