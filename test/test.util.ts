import { prisma } from "../src/db/prisma";


export const UserTest = {
    async delete() {
        await prisma.user.deleteMany({
            where: {
                username: { in: ["restuadil", "test123"] }
            },
        });
    },

    async create() {
        await prisma.user.createMany({
            data: [
                {
                    id: "65f47ae077fd2c504dc18cf4",
                    username: "restuadil",
                    email: "restuadil09@gmail.com",
                    password: "12345",
                    first_name: "restu",
                    last_name: "adil",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: "65f47ae077fd2c504dc18cf5",
                    username: "test123",
                    email: "test0@gmail.com",
                    password: "12345",
                    first_name: "test",
                    last_name: "test",
                    created_at: new Date(),
                    updated_at: new Date(),
                }
            ]
        });
    }
}