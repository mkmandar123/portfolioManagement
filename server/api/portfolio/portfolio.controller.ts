import { Portfolio } from "../../model/portfolio.model";
import { UserTypes } from "../../types/user";
import { PortfolioTypes } from "../../types/portfolio";
import { Types } from 'mongoose';

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
}

export { PortfolioController };
