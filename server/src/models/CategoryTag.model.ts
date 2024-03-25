import { Schema, model, Document, Types } from "mongoose";

//create interface
export interface ICategoryTag extends Document {
    name: string;
    createdBy?: Types.ObjectId;
}

//create schema
const CategoryTagSchema = new Schema<ICategoryTag>({
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
const CategoryTag = model<ICategoryTag>("CategoryTag", CategoryTagSchema);

export default CategoryTag;
