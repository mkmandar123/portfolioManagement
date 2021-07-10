import { Trade } from '../../model/trade.model'
import { Types } from 'mongoose';
import { UserController } from "../user/user.controller";

class TradeController {
    static async createTrade(req: any, res: any): Promise<void> {
        const { price, symbol, tradeType } = req.body;

        // ASSUMPTION: only one user will be using this system, in future this call will be replaced with
        // function call to find user through the token provided in request.
        const user = await UserController.findOrCreateUser();

        const trade = new Trade({
            _id: new Types.ObjectId(),
            user,
            symbol,
            tradeType,
            price,
        });
        await trade.save();
        return res.send(trade).end();
    }
}

export { TradeController };
