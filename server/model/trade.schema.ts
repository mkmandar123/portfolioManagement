import { Schema, Types } from 'mongoose';
import { TradeTypes } from "../types/trade";


const Trade = new Schema<TradeTypes.Trade>({
    _id: Types.ObjectId,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    price: Number,
    tradeType: String,
    symbol: String,
});

module.exports = Trade;
