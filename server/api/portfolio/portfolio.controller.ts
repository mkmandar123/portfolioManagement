import { Portfolio } from "../../model/portfolio.model";
import { UserTypes } from "../../types/user";
import { PortfolioTypes } from "../../types/portfolio";
import { Types } from 'mongoose';
import _ from 'lodash';
import {Shared} from "../../config/shared";

class PortfolioController {
    static async findOrCreatePortfolio(user: UserTypes.User): Promise<PortfolioTypes.Portfolio> {
        const portfolio = await Portfolio.findOne({}).exec();
        if (!portfolio) {
            return PortfolioController.createPortfolio(user);
        }
        return portfolio;
    }

    static async createPortfolio(user: UserTypes.User): Promise<PortfolioTypes.Portfolio> {
        const portfolio = new Portfolio({
            _id: new Types.ObjectId(),
            user,
            stocks: []
        });
        return portfolio.save();
    }

    static async checkIfSellTransactionCanBePerformed(user: UserTypes.User, symbol: string, quantity: number): Promise<boolean> {
        const portfolio = await PortfolioController.findOrCreatePortfolio(user);
        const stockInUserPortfolio = _.find(portfolio.stocks, (stock: PortfolioTypes.Stocks) => stock.symbol === symbol);
        return stockInUserPortfolio && !(stockInUserPortfolio?.quantity < quantity);
    }

    static async updateUserPortfolio(user, stock: PortfolioTypes.Stocks, tradeType: string): Promise<boolean> {
        const portfolio = await PortfolioController.findOrCreatePortfolio(user);

        // Till this point we have validated transaction so no need to validate again
        let stockInUserPortfolio = _.find(portfolio.stocks, (stockInPortfolio: PortfolioTypes.Stocks) => stockInPortfolio.symbol === stock.symbol);
        const isStockAlreadyPresentInPortfolio = !!stockInUserPortfolio;

        if (stockInUserPortfolio) {
            stockInUserPortfolio.quantity += (stock.quantity * Shared.Constant.TRANSACTION_CODES[tradeType.toUpperCase()]);
        } else {
            stockInUserPortfolio = {
                symbol: stock.symbol,
                avgPrice: stock.avgPrice,
                quantity: stock.quantity,
            }
        }

        // Write the changes to portfolio in DB
        portfolio.stocks.forEach((stockObject: PortfolioTypes.Stocks) => {
            if (stockObject.symbol === stock.symbol) {
                stockObject.quantity = stockInUserPortfolio.quantity;
            }
        });

        if (!isStockAlreadyPresentInPortfolio) {
            portfolio.stocks.push(stockInUserPortfolio);
        }

        const portfolioToBeUpdated = await Portfolio.findById(portfolio._id);
        portfolioToBeUpdated.set('stocks', portfolio.stocks);
        await portfolioToBeUpdated.save();
        return !stockInUserPortfolio || stockInUserPortfolio?.quantity < stock.quantity;
    }
}

export { PortfolioController };
