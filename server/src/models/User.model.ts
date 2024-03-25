import { Schema, model, Document } from "mongoose";

//create interface
export interface IUser extends Document {
    email: string;
    password: string;
    name?: string;
    googleId?: string;
    accessToken?: string;
    refreshToken?: string;
}

//create schema
const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    name: {
        type: String,
    },
    googleId: {
        type: String,
    },
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
    }
});

//create model
const User = model<IUser>("User", UserSchema);

export default User;