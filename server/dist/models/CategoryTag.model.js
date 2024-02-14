import { Schema, model, Types } from "mongoose";
//create schema
const CategoryTagSchema = new Schema({
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
const CategoryTag = model("CategoryTag", CategoryTagSchema);
export default CategoryTag;
