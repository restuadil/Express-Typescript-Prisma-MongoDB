import { Response, Request, NextFunction } from "express";
import { UserService } from "../service/user-service";

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
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    data: userById,
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
    }
};
