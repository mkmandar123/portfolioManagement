import { Trade } from '../../model/trade.model'
import { Types } from 'mongoose';
import { UserController } from "../user/user.controller";
import { Shared } from "../../config/shared";
import { PortfolioController } from "../portfolio/portfolio.controller";

class TradeController {
    static async createTrade(req: any, res: any): Promise<void> {
        const { price, symbol, tradeType, quantity } = req.body;

        // Check whether tradeType is valid or not
        if (tradeType.toUpperCase() !== Shared.Constant.TRANSACTION_TYPES.BUY
            && tradeType.toUpperCase() !== Shared.Constant.TRANSACTION_TYPES.SELL) {
            return res.send({ error: 'Invalid trade type' });
        }

        // ASSUMPTION: only one user will be using this system, in future this call will be replaced with
        // function call to find user through the token provided in request.
        const user = await UserController.findOrCreateUser();

        // For BUY transaction, no check is required. But for SELL transaction, we need to check if user
        // has quantity of stock given in transaction 'EQUAL TO / MORE THAN' requested quantity
        if (tradeType.toUpperCase() !== Shared.Constant.TRANSACTION_TYPES.BUY) {
            const isTradePermitted = await PortfolioController.checkIfSellTransactionCanBePerformed(user, symbol, quantity);
            console.log('>>>>>isPermitted', isTradePermitted)
            if (!isTradePermitted) {
                return res.send({ error: `You cannot sell quantity: ${quantity} for: ${symbol}` });
            }
        }

        const trade = new Trade({
            _id: new Types.ObjectId(),
            user,
            symbol,
            tradeType,
            price,
        });

        await trade.save();
        await PortfolioController.updateUserPortfolio(user, { symbol, avgPrice: price, quantity }, tradeType);
        await UserController.decrementUserBalance(user, quantity * price);
        return res.send(trade).end();
    }
}

export { TradeController };
