import { NextFunction, Request, Response } from "express";
import { ProductService } from "../service/product-service";
import { createProductValidation, updateProductValidation } from "../validation/product-validation";
import { logger } from "../utils/logger";

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
                        message: "Product found",
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
            logger.error(error)
            next(error)
        }
    },
    CREATEPRODUCT: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error, value } = createProductValidation(req.body)
            if (error) return res.status(422).json({ success: false, statusCode: 422, message: error.details[0].message })
            const data = await ProductService.createProduct(value);
            if (data) {
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: "Product created successfully",
                    data: data
                })
            } else {
                return res.status(500).json({
                    success: false,
                    statusCode: 500,
                    message: "Failed to create product"
                })
            }
        } catch (error) {
            logger.error(error)
            next(error)
        }
    },
    UPDATEPRODUCT: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error, value } = updateProductValidation(req.body)
            if (error) return res.status(422).json({ success: false, statusCode: 422, message: error.details[0].message })
            const data = await ProductService.updateProduct(req.params.id, value);
            if (data) {
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: "Product updated successfully",
                    data: data
                })
            } else {
                return res.status(500).json({
                    success: false,
                    statusCode: 500,
                    message: "Failed to update product"
                })
            }
        } catch (error) {
            logger.error(error)
            next(error)
        }
    },
    DELETEPRODUCT: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await ProductService.deleteProduct(req.params.id);
            if (data) {
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: "Product deleted successfully",
                    data: data.id
                })
            } else {
                return res.status(500).json({
                    success: false,
                    statusCode: 500,
                    message: "Failed to delete product"
                })
            }
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }
}