import { Schema, Types } from 'mongoose';
import { PortfolioTypes } from "../types/portfolio";


const Portfolio = new Schema<PortfolioTypes.Portfolio>({
        _id: Types.ObjectId,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        stocks: Array,
    });

module.exports = Portfolio;
