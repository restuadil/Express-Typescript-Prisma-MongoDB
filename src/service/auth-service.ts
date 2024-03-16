import { prisma } from "../db/prisma";
import { UserRequest } from "../model/user-model";

export const AuthService = {
    register: async (data: UserRequest) => {
        try {
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        { username: data.username },
                        { email: data.email },
                    ],
                },
            });

            if (existingUser) {
                return null;
            }
            const newUser = await prisma.user.create({ data });
            return {
                data: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    first_name: newUser.first_name,
                    last_name: newUser.last_name
                }
            };
        } catch (error) {
            console.error("Error creating user:", error);
            return { success: false, statusCode: 500, message: "Failed to create user" };
        }
    },
}