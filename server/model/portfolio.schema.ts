import { Schema, Types, model } from 'mongoose';
import { PortfolioTypes } from "../types/portfolio";


const PortfolioSchema = new Schema<PortfolioTypes.Portfolio>({
        _id: Types.ObjectId,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        stocks: Array,
    });

const Portfolio = model<PortfolioTypes.Portfolio>('Portfolio', PortfolioSchema);

module.exports = Portfolio;
