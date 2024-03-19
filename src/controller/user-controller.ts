import { Response, Request, NextFunction } from "express";
import { UserService } from "../service/user-service";
import { updateUserValidation } from "../validation/user-validation";

export const UserController = {
    GETUSER: async (req: Request, res: Response, next: NextFunction) => {
        const { params: { id } } = req
        const { query } = req
        try {
            if (id) {
                const user = await UserService.getUserById(req.params.id);
                if (user) {
                    return res.status(200).json({
                        success: true,
                        statusCode: 200,
                        data: user,
                    });
                } else {
                    return res.status(404).json({
                        success: false,
                        statusCode: 404,
                        message: "User not found",
                    });
                }
            } else {
                const data = await UserService.getAllUsers(query);
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    pagination: data?.pagination,
                    data: data.data
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
            const updateUser = await UserService.updateUser(req.params.id, value);
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
