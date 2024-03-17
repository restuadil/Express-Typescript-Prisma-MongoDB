import { Role } from "@prisma/client";
import { prisma } from "../db/prisma";
import { UserRequest } from "../model/user-model";
import { hashing } from "../utils/hashing";

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
            const hashedPassword = hashing(data.password);
            const newUser = await prisma.user.create({
                data: {
                    username: data.username,
                    email: data.email,
                    password: hashedPassword,
                    role: data.role as Role,
                    first_name: data.first_name,
                    last_name: data.last_name
                }
            });
            return {
                data: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role,
                    first_name: newUser.first_name,
                    last_name: newUser.last_name
                }
            };
        } catch (error) {
            console.error("Error creating user:", error);
            return { success: false, statusCode: 500, message: "Failed to create user" };
        }
    },
    login: async (email: string) => {
        return await prisma.user.findFirst({ where: { email } });
    },
}