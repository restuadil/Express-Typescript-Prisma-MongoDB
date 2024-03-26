import { prisma } from "../db/prisma";

export const OrderService = {
    getAllOrders: async () => {
        try {
            const orders = await prisma.cart.findMany();
            const ordersWithProducts = await Promise.all(orders.map(async (order) => {
                const products = await prisma.product.findMany({
                    where: {
                        id: {
                            in: [order.productId]
                        }
                    }
                });
                return {
                    id: order.id,
                    products: products[0].name,
                    quantity: order.quantity
                };
            }));
            return ordersWithProducts;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw new Error('Failed to fetch orders.');
        }
    }
}