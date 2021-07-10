import { Types } from 'mongoose';
import { UserTypes } from "./user";

declare namespace TradeTypes {

    declare interface Trade {
        _id: Types.ObjectId;
        user: UserTypes.User;
        symbol: string;
        price: number;
        tradeType: string;
    }
}

export { TradeTypes };
