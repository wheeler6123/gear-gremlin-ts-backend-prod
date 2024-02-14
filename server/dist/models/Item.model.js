import { Schema, model } from "mongoose";
//create schema
const ItemSchema = new Schema({
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
const Item = model("Item", ItemSchema);
export default Item;
