import { PortfolioTypes } from "./portfolio";
import { Types } from 'mongoose';

declare namespace UserTypes {

    declare interface User {
        _id: Types.ObjectId
        name: string;
        balance: number;
        portfolio: PortfolioTypes.Portfolio;
    }
}

export { UserTypes };
