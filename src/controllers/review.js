import { insertReview } from "../services/review.js";
import CError, {Selector} from "../misc/errors.js";

const createReview = async (req, res, next) => {
    const { rating, comment } = req.body;
    const productId = req.params.productId;
    const { id: userId } = res.locals;
    console.log(productId);
    if (!productId || !userId || rating === undefined) {
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

export {
    createReview
}