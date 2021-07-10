import { UserTypes } from "./user";
import { Types } from 'mongoose';

declare namespace PortfolioTypes {

    declare interface Portfolio {
        _id: Types.ObjectId;
        user: UserTypes.User;
        stocks: Array<Stocks>;
    }

    declare interface Stocks {
        symbol: string;
        avgPrice: number;
        quantity: number;
    }
}

export { PortfolioTypes };
