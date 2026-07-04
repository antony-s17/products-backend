import {Schema, model} from "mongoose";

const reviewSchema = new Schema(
    {
        productId: { type: String, required: true},
        userId: { type: String, required: true},
        rating: { type: Number, required: true},
        comment: { type: String, required: true}
    },
    {
        timestamps: true,
    }
)

reviewSchema.index(
    { 
        productId: 1, userId: 1 
    }, 
    { 
        unique: true 
    });

export default model("Review", reviewSchema);