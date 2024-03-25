import { Schema, model, Document } from "mongoose";

//create interface
export interface IItem extends Document {
    name: string;
    description?: string;
    weight?: number;
    categories?: Schema.Types.ObjectId[];
    useConditions?: Schema.Types.ObjectId[];
    packed: boolean;
    userId: Schema.Types.ObjectId;
}

//create schema
const ItemSchema = new Schema<IItem>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    weight: {
        type: Number,
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: "CategoryTag",
        default: [],
    }],
    useConditions: [{
        type: Schema.Types.ObjectId,
        ref: "UsageTag",
        default: [],
    }],
    packed: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

//create model
const Item = model<IItem>("Item", ItemSchema);

export default Item;