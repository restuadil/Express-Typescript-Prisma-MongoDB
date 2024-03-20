import { Prisma } from "@prisma/client";
import { prisma } from "../db/prisma"
import { ProductQuery, ProductRequest, ProductResponse } from "../model/product-model";
import { logger } from "../utils/logger";
import { pageAble, pagination } from "../model/pagination";


export const ProductService = {
    getAllProducts: async (query: ProductQuery): Promise<pageAble<ProductResponse>> => {
        const { name, category, page = 1, limit = 20 } = query;
        try {
            const filters: Prisma.ProductWhereInput[] = [];
            if (name) filters.push({ name: { contains: name, mode: "insensitive" } });
            if (category) filters.push({ category: { contains: category, mode: "insensitive" } });

            const totalData = await prisma.product.count({ where: { AND: filters } });
            const data = await prisma.product.findMany({
                where: { AND: filters },
                skip: (page - 1) * limit,
                take: Number(limit),
            });
            const pagination: pagination = {
                total_data: totalData,
                limit: Number(limit),
                current_page: Number(page),
                total_page: Math.ceil(totalData / limit),
            };
            return { data, pagination };
        } catch (error) {
            logger.error(error);
            throw new Error('Failed to retrieve products');
        } finally {
            await prisma.$disconnect();
        }
    },

    getProductById: async (id: string): Promise<ProductResponse | null> => {
        try {
            const data = await prisma.product.findUnique({ where: { id: id, }, });
            if (!data) {
                return null;
            }
            return data
        } catch (error) {
            logger.error(error)
            return null
        } finally {
            await prisma.$disconnect();
        }
    },
    createProduct: async (data: ProductRequest): Promise<ProductResponse | null> => {
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
            logger.error(error)
            return null
        } finally {
            await prisma.$disconnect();
        }
    },
    deleteProduct: async (id: string): Promise<ProductResponse | null> => {
        try {
            const product = await prisma.product.delete({
                where: { id: id },
            });
            return product;
        } catch (error) {
            logger.error(error)
            return null;
        } finally {
            await prisma.$disconnect();
        }
    },
    updateProduct: async (id: string, data: ProductRequest): Promise<ProductResponse | null> => {
        try {
            const existingProduct = await prisma.product.findFirst({ where: { name: data.name } });
            if (existingProduct && existingProduct.id !== id) return null;
            const productFromDb = await prisma.product.findUnique({ where: { id: id } });
            if (!productFromDb) return null;

            const updatedProduct = await prisma.product.update({
                where: { id: id },
                data: {
                    name: data.name || productFromDb.name,
                    description: data.description || productFromDb.description,
                    price: data.price || productFromDb.price,
                    category: data.category || productFromDb.category
                }
            });

            if (updatedProduct) {
                return updatedProduct;
            } else {
                return null;
            }
        } catch (error) {
            logger.error(error);
            return null;
        } finally {
            await prisma.$disconnect();
        }
    }
    ,
}