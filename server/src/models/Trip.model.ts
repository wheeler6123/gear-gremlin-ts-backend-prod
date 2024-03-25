import { Schema, model, Document } from "mongoose";

//create interface
export interface ITrip extends Document {
    name: string;
    items: Schema.Types.ObjectId[];
    totalWeight: number;
    userId: Schema.Types.ObjectId;
}

//create schema
const TripSchema = new Schema<ITrip>({
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
const Trip = model<ITrip>("Trip", TripSchema);

export default Trip;