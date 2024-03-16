import { NextFunction, Request, Response } from "express";
import { AuthService } from "../service/auth-service";
import { createUserValidation } from "../validation/user-validation";

export const AuthController = {
    REGISTER: async (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = createUserValidation(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: error.details[0].message,
            });
        }

        try {
            const user = await AuthService.register(value);
            if (user) {
                return res.status(201).json({
                    success: true,
                    statusCode: 201,
                    message: "User created successfully",
                    data: user.data,
                });
            } else {
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: "Username or email already exists",
                });
            }
        } catch (error) {
            next(error);
        }
    },
}