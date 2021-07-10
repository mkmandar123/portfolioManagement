import { User } from "../../model/user.model";
import { UserTypes } from "../../types/user";
import { Types } from 'mongoose';
import { PortfolioController } from "../portfolio/portfolio.controller";

class UserController {
    static async createUser(): Promise<UserTypes.User> {
        const user = new User({
            _id: new Types.ObjectId(),
            balance: 10000,
        });
        const portfolio = await PortfolioController.createPortfolio(user);
        user.portfolio = portfolio;
        return user.save();
    }

    static async findOrCreateUser(): Promise<UserTypes.User> {
        const user = User.findOne({}).exec();
        if (!user) {
            return UserController.createUser();
        }
        return user;
    }
}

export { UserController };
