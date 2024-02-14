import { Schema, model } from "mongoose";
//create schema
const TripSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    items: {
        type: [Schema.Types.ObjectId],
        ref: "Item",
        default: [],
    },
    totalWeight: {
        type: Number,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
//create model
const Trip = model("Trip", TripSchema);
export default Trip;
