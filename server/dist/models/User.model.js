import { Schema, model } from "mongoose";
//create schema
const UserSchema = new Schema({
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
const User = model("User", UserSchema);
export default User;
