import { Schema, Types } from 'mongoose';
import { UserTypes } from "../types/user";


const User = new Schema<UserTypes.User>({
    _id: Types.ObjectId,
    portfolio: {
        type: Schema.Types.ObjectId,
        ref: 'Portfolio'
    },
    balance: Number,
    name: String,
});

module.exports = User;
