import Review from "../models/Review.js";

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

const getReviewByProductId = async () => {

}

export {
    insertReview,
    getReviewByProductId
}