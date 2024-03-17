import { prisma } from "../db/prisma"
import { ProductRequest, ProductResponse } from "../model/product-model";

export const ProductService = {
    getAllProducts: async (): Promise<ProductResponse[]> => {
        const data = await prisma.product.findMany();
        return data
    },
    createProduct: async (data: ProductRequest) => {
        try {
            const existingProduct = await prisma.product.findFirst({
                where: {
                    name: data.name,
                },
            });
            if (existingProduct) {
                return null;
            }
            const newProduct = await prisma.product.create({ data });
            return newProduct;
        } catch (error) {
            console.error("Error creating user:", error);
            return { success: false, statusCode: 500, message: "Failed to create user" };
        }
    }
}