import mongoose from 'mongoose';
import User from './User.model.js';
import Item from './Item.model.js';
import Trip from './Trip.model.js';
import CategoryTag from './CategoryTag.model.js';
import UsageTag from './UsageTag.model.js';
import RefreshToken from './RefreshToken.model.js';
mongoose.Promise = global.Promise;
const db = {
    mongoose,
    user: User,
    item: Item,
    trip: Trip,
    categoryTag: CategoryTag,
    usageTag: UsageTag,
    refreshToken: RefreshToken
};
export default db;
