import { Router } from "express";
import { ProductController } from "../controller/product-controller";
import { requireAdmin } from "../middleware/auth-middleware";

export const ProductRouter = Router();

ProductRouter.get('/products', ProductController.GETPRODUCT)
ProductRouter.get('/products/:id', ProductController.GETPRODUCT)
ProductRouter.post('/products', requireAdmin, ProductController.CREATEPRODUCT)