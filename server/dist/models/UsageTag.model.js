import { Schema, model, Types } from "mongoose";
//create schema
const UsageTagSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
    },
});
//create model
const UsageTag = model("UsageTag", UsageTagSchema);
export default UsageTag;
