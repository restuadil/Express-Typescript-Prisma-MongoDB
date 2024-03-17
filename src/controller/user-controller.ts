import { Response, Request, NextFunction } from "express";
import { UserService } from "../service/user-service";
import { updateUserValidation } from "../validation/user-validation";

export const UserController = {
    GETALLUSERS: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await UserService.getAllUsers();
            const users = data.map(user => ({
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
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
    DELETEUSER: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteUser = await UserService.deleteUser(req.params.id);
            if (deleteUser) {
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: "User deleted successfully",
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
    UPDATEUSER: async (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = updateUserValidation(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: error.details[0].message,
            });
        }
        try {
            const updateUser = await UserService.updateUser(
                req.params.id,
                value
            );
            if (updateUser) {
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: "User updated successfully",
                    data: updateUser,
                });
            } else {
                return res.status(404).json({
                    success: false,
                    statusCode: 404,
                    message: "Something went wrong",
                });
            }
        } catch (error) {
            next(error);
        }
    }
};
