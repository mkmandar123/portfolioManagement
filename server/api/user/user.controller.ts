import { User } from "../../model/user.model";
import { UserTypes } from "../../types/user";
import { Types } from 'mongoose';
import { PortfolioController } from "../portfolio/portfolio.controller";

class UserController {
    static async createUser(): Promise<UserTypes.User> {
        const user = new User({
            _id: new Types.ObjectId(),
            balance: 9999999999, // ASSUMPTION: USER will have infinite balance
        });
        const portfolio = await PortfolioController.findOrCreatePortfolio(user);
        user.portfolio = portfolio;
        return user.save();
    }

    static async findOrCreateUser(): Promise<UserTypes.User> {
        const user = await User.findOne({}).exec();
        if (!user) {
            return UserController.createUser();
        }
        return user;
    }

    static async decrementUserBalance(user: UserTypes.User, amount: number): Promise<UserTypes.User> {
        const userObj = await User.findOne({ _id: user._id }).exec();

        // ASSUMPTION: User is having infinite balance.
        userObj.balance -= amount;
        return userObj.save();
    }
}

export { UserController };
