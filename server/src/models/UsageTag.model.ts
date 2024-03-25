import { Schema, model, Document, Types } from "mongoose";

//create interface
export interface IUsageTag extends Document {
    name: string;
    createdBy?: Types.ObjectId;
}

//create schema
const UsageTagSchema = new Schema<IUsageTag>({
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
const UsageTag = model<IUsageTag>("UsageTag", UsageTagSchema);

export default UsageTag;