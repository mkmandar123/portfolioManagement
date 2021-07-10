import { UserTypes } from "./user";

declare namespace PortfolioTypes {

    declare interface Portfolio {
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
