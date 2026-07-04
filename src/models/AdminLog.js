import {Schema, model} from "mongoose";

const adminLogSchema = new Schema(
    {
        adminId: { type: String, required: true},
        action: { type: String, required: true},
        resource: { type: String, required: true},
    },
    {
        timestamps: true,
    }
)

export default model("AdminLog", adminLogSchema);