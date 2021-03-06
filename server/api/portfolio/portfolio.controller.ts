import { Portfolio } from "../../model/portfolio.model";
import { UserTypes } from "../../types/user";
import { PortfolioTypes } from "../../types/portfolio";
import { Types } from 'mongoose';
import _ from 'lodash';
import {Shared} from "../../config/shared";
import rp from "request-promise";

class PortfolioController {
    static async findOrCreatePortfolio(user: UserTypes.User): Promise<PortfolioTypes.Portfolio> {
        // ASSUMPTION: Only one user is using the system.
        const portfolio = await Portfolio.findOne({}).exec();
        if (!portfolio) {
            return PortfolioController.createPortfolio(user);
        }
        return portfolio;
    }

    static async getPortfolioReturns(req: any, res: any): Promise<void> {
        // ASSUMPTION: Only one user is using the system.
        const portfolio = await Portfolio.findOne({}).exec();

        const stocks = portfolio.stocks;
        let returns = 0;
        stocks.forEach((stock: PortfolioTypes.Stocks) => {
            const currentStockReturn = (PortfolioController.getCurrentPriceForStock(stock.symbol) - stock.avgPrice) * stock.quantity;
            stock['returns'] = currentStockReturn;
            returns += currentStockReturn;
        });
        return res.send({
            totalReturns: returns,
            stocks
        });
    }

    static getCurrentPriceForStock(symbol: string): number {
        // ASSUMPTION: Current price for all stock is considered to be Rs.100.
        // In future we can integrate API and pass symbol to get current price.
        return 100;
    }

    static async createPortfolio(user: UserTypes.User): Promise<PortfolioTypes.Portfolio> {
        const portfolio = new Portfolio({
            _id: new Types.ObjectId(),
            user,
            stocks: []
        });
        return portfolio.save();
    }

    static async getPortfolio(req: any, res: any): Promise<void> {
        const portfolio = await Portfolio.findOne({}).exec();
        return res.send(portfolio);
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
            stockInUserPortfolio.avgPrice = ((stockInUserPortfolio.quantity * stockInUserPortfolio.avgPrice) + (stock.quantity * stock.avgPrice)) / (stock.quantity + stockInUserPortfolio.quantity)
            stockInUserPortfolio.quantity += (stock.quantity * Shared.Constant.TRANSACTION_CODES[tradeType.toUpperCase()]);
        } else {
            stockInUserPortfolio = {
                symbol: stock.symbol,
                avgPrice: stock.avgPrice,
                quantity: stock.quantity,
            }
        }

        portfolio.stocks.forEach((stockObject: PortfolioTypes.Stocks) => {
            if (stockObject.symbol === stock.symbol) {
                stockObject.quantity = stockInUserPortfolio.quantity;
            }
        });

        if (!isStockAlreadyPresentInPortfolio) {
            portfolio.stocks.push(stockInUserPortfolio);
        }

        const portfolioToBeUpdated = await Portfolio.findById(portfolio._id);

        // For removing stocks with zero quantity.
        portfolio.stocks = portfolio.stocks.filter((stockToBeUpdated: PortfolioTypes.Stocks) => stockToBeUpdated.quantity > 0);

        // Write the changes to portfolio in DB
        portfolioToBeUpdated.set('stocks', portfolio.stocks);
        await portfolioToBeUpdated.save();
        return !stockInUserPortfolio || stockInUserPortfolio?.quantity < stock.quantity;
    }
}

export { PortfolioController };
