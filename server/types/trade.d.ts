
declare namespace TradeTypes {

    declare interface Trade {
        user: UserTypes.User;
        symbol: string;
        price: number;
        tradeType: string;
    }
}

export { TradeTypes };
