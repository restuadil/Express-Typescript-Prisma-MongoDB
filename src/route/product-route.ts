import { Router } from "express";
import { ProductController } from "../controller/product-controller";
import { requireAuth } from "../middleware/auth-middleware";

export const ProductRouter = Router();

ProductRouter.get('/products', requireAuth, ProductController.GETPRODUCT)
ProductRouter.get('/products/:id', ProductController.GETPRODUCT)
ProductRouter.post('/products', ProductController.CREATEPRODUCT)
ProductRouter.put('/products/:id', ProductController.UPDATEPRODUCT)
ProductRouter.delete('/products/:id', ProductController.DELETEPRODUCT)