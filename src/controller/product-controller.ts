import { NextFunction, Request, Response } from "express";
import { ProductService } from "../service/product-service";
import { createProductValidation } from "../validation/product-validation";

export const ProductController = {
    GETALLPRODUCTS: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await ProductService.getAllProducts();
            const products = data.map(product => ({
                id: product.id,
                name: product.name
            }))
            return res.status(200).json({
                success: true,
                statusCode: 200,
                data: products
            })
        } catch (error) {
            next(error)
        }
    },
    CREATEPRODUCT: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error, value } = createProductValidation(req.body)
            if (error) return res.status(422).json({ success: false, statusCode: 422, message: error.details[0].message })
            const data = await ProductService.createProduct(value);
            return res.status(200).json({
                success: true,
                statusCode: 200,
                data: data
            })
        } catch (error) {
            next(error)
        }
    }
}