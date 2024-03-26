import { NextFunction, Request, Response } from "express";
import { OrderService } from "../service/order-service";
import { logger } from "../utils/logger";

export const OrderController = {
    GETALL: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await OrderService.getAllOrders();
            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: "successfully retrieved orders",
                data: data
            })
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }
}