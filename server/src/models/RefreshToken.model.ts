import { Schema, model, Model, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { secret, jwtExpiration, jwtRefreshExpiration } from '../../config/Auth';



//create interface
export interface IRefreshToken extends Document {
    token: string;
    user: Schema.Types.ObjectId;
    expiryDate: Date;
}

interface IRefreshTokenModel extends Model<IRefreshToken> {
    createToken(user: Schema.Types.ObjectId): Promise<string>;
    verifyExpiration(token: IRefreshToken): boolean;
}

//create schema
const RefreshTokenSchema = new Schema<IRefreshToken>({
    token: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    expiryDate: Date,
});

//Static methods
RefreshTokenSchema.statics.createToken = async function (user: Schema.Types.ObjectId) {
    let expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + Number(jwtRefreshExpiration));

    let _token = uuidv4();

    let _object = new this({
        token: _token,
        user: user,
        expiryDate: expiredAt.getTime(),
    });

    console.log(_object);

    let refreshToken = await _object.save();

    return refreshToken.token;
};

RefreshTokenSchema.statics.verifyExpiration = (token: IRefreshToken) => {
    return token.expiryDate.getTime() < new Date().getTime();
};

//create model
const RefreshToken = model<IRefreshToken, IRefreshTokenModel>("RefreshToken", RefreshTokenSchema);

export default RefreshToken;