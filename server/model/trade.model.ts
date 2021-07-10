import { model, Schema, Types } from 'mongoose';
import { TradeTypes } from "../types/trade";


const TradeSchema = new Schema<TradeTypes.Trade>({
    _id: Types.ObjectId,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    price: Number,
    tradeType: String,
    symbol: String,
    quantity: Number,
});

export const Trade = model<TradeTypes.Trade>('Trade', TradeSchema);
