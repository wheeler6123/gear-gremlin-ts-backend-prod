import mongoose, { Model, Document } from 'mongoose';
import User, { IUser } from './User.model';
import Item, { IItem } from './Item.model';
import Trip, {ITrip } from './Trip.model';
import CategoryTag, { ICategoryTag } from './CategoryTag.model';
import UsageTag, { IUsageTag } from './UsageTag.model';
import RefreshToken, { IRefreshToken } from './RefreshToken.model';

mongoose.Promise = global.Promise;

interface IDb {
    mongoose: typeof mongoose;
    user: Model<IUser & Document<any, any, IUser>, {}>;
    item: Model< IItem & Document<any, any, IItem>, {}>;
    trip: Model< ITrip & Document<any, any, ITrip>, {}>;
    categoryTag: Model< ICategoryTag & Document<any, any, ICategoryTag>, {}>;
    usageTag: Model< IUsageTag & Document<any, any, IUsageTag>, {}>;
    refreshToken: Model< IRefreshToken & Document<any, any, IRefreshToken>, {}>;
}

const db: IDb = {
    mongoose,
    user: User,
    item: Item,
    trip: Trip,
    categoryTag: CategoryTag,
    usageTag: UsageTag,
    refreshToken: RefreshToken
};

export default db