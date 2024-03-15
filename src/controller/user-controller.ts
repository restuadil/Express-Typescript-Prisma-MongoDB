import { Response, Request, NextFunction } from "express";
import { UserService } from "../service/user-service";
import { createUserValidation } from "../validation/user-validation";

export const UserController = {
    GETALLUSERS: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await UserService.getAllUsers();
            const users = data.map(user => ({
                id: user.id,
                email: user.email,
                username: user.username,
            }));
            return res.status(200).json({
                success: true,
                statusCode: 200,
                data: users,
            });
        } catch (error) {
            next(error);
        }
    },
    GETUSERBYID: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userById = await UserService.getUserById(req.params.id);
            if (userById) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password, ...userData } = userById;
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    data: userData,
                });
            } else {
                return res.status(404).json({
                    success: false,
                    statusCode: 404,
                    message: "User not found",
                });
            }
        } catch (error) {
            next(error);
        }
    },
    CREATEUSER: async (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = createUserValidation(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: error.details[0].message,
            });
        }

        try {
            const user = await UserService.createUser(value);
            return res.status(user.statusCode).json({
                success: user.success,
                statusCode: user.statusCode,
                message: user.message,
                data: user.data,
            });
        } catch (error) {
            next(error);
        }
    }
};
