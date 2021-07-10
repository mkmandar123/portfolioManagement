import { PortfolioTypes } from "./portfolio";

declare namespace UserTypes {

    declare interface User {
        name: string;
        balance: number;
        portfolio: PortfolioTypes.Portfolio;
    }
}

export { UserTypes };
