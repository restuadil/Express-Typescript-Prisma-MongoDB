import { prisma } from "../src/db/prisma";


export const UserTest = {
    async delete() {
        await prisma.user.deleteMany({
            where: {
                username: "test",
            },
        });
    },

    async create() {
        await prisma.user.create({
            data: {
                id: "65f3f26eba36021e78eec38f",
                username: "test",
                email: "test",
                password: "test",
                first_name: "test",
                last_name: "test",
            },
        });
    }
}