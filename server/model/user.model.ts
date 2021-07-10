import { model, Schema, Types } from 'mongoose';
import { UserTypes } from "../types/user";


const UserSchema = new Schema<UserTypes.User>({
    _id: Types.ObjectId,
    portfolio: {
        type: Schema.Types.ObjectId,
        ref: 'Portfolio'
    },
    balance: Number,
    name: String,
});

export const User = model<UserTypes.User>('User', UserSchema);
