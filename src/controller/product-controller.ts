import { NextFunction, Request, Response } from "express";
import { ProductService } from "../service/product-service";
import { createProductValidation } from "../validation/product-validation";

export const ProductController = {
    GETPRODUCT: async (req: Request, res: Response, next: NextFunction) => {
        const { params: { id } } = req
        const { query } = req
        try {
            if (id) {
                const data = await ProductService.getProductById(id);
                if (data) {
                    return res.status(200).json({
                        success: true,
                        statusCode: 200,
                        data: data
                    })
                } else {
                    return res.status(404).json({
                        success: false,
                        statusCode: 404,
                        message: "Product not found"
                    })
                }
            } else {
                const data = await ProductService.getAllProducts(query);
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    pagination: data?.pagination,
                    data: data?.data,
                })
            }
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