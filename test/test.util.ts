import { prisma } from "../src/db/prisma";


export const UserTest = {
    async delete() {
        await prisma.user.deleteMany({
            where: {
                username: "restuadil",
            },
        });
    },

    async create() {
        await prisma.user.create({
            data: {
                id: "65f47ae077fd2c504dc18cf4",
                username: "restuadil",
                email: "restuadil09@gmail.com",
                password: "12345",
                first_name: "restu",
                last_name: "adil",
            },
        });
    }
}