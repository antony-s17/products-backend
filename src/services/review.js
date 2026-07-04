import Review from "../models/Review.js";
import { selectProductById } from "./product.js";

const insertReview = async (reviewData) => {
    try {
        const review = await Review.create(reviewData);
        return {
            ok: true
        }
    } catch (error) {
        return {
            ok: false
        }
    }
}

const selectReviewByProductId = async (productId, userId) => {
    try {
        const product  = await selectProductById(productId);
        if (!product.ok) {
            throw new Error("Product not found");
        }
        const result = await Review.findOne(({ userId, productId }));
        if (!result) {
            throw new Error("Review not found");
        }
        const review = {
            userId: userId,
            productId: productId,
            productName: product.data.name,
            rating: result.rating,
            comment: result.comment
        }
        return {
            ok: true,
            data: review
        }
    } catch (error) {
        return {
            ok: false
        }
    }
}

export {
    insertReview,
    selectReviewByProductId
}