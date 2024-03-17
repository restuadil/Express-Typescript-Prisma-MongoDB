import { Router } from "express";
import { ProductController } from "../controller/product-controller";
import { requireAdmin, requireAuth } from "../middleware/auth-middleware";

export const ProductRouter = Router();

ProductRouter.get('/products', requireAuth, ProductController.GETALLPRODUCTS)
ProductRouter.post('/products', requireAdmin, ProductController.CREATEPRODUCT)