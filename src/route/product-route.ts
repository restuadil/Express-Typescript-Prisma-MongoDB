import { Router } from "express";
import { ProductController } from "../controller/product-controller";

export const ProductRouter = Router();

ProductRouter.get('/products', ProductController.GETPRODUCT)
ProductRouter.get('/products/:id', ProductController.GETPRODUCT)
ProductRouter.post('/products', ProductController.CREATEPRODUCT)
ProductRouter.put('/products/:id', ProductController.UPDATEPRODUCT)
ProductRouter.delete('/products/:id', ProductController.DELETEPRODUCT)