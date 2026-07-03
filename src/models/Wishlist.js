import {Schema, model} from "mongoose";

const wishlistSchema = new Schema(
    {
        userId: { type: String, required: true},
        productId: { type: String, required: true},
    },
    {
        timestamps: true,
    }
)

wishlistSchema.index({
    userId: 1,
    productId: 1
}, {
    unique: true
})

export default model("Wishlist", wishlistSchema);