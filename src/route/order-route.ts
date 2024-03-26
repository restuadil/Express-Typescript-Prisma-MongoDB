import { Router } from "express";
import { OrderController } from "../controller/order-controller";

export const OrderRouter = Router();

OrderRouter.get('/orders', OrderController.GETALL)