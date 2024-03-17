import { prisma } from "../src/db/prisma";


export const UserTest = {
    async delete() {
        await prisma.user.deleteMany({
            where: {
                username: { in: ["testuser", "restuadil", "updatedusername"] }
            },
        });
    },

    async create() {
        await prisma.user.createMany({
            data: [
                {
                    id: "65f47ae077fd2c504dc18cf4",
                    username: "testuser",
                    email: "testemail@gmail.com",
                    password: "testpassword",
                    role: "USER",
                    first_name: "testfirst",
                    last_name: "testlast",
                    address: {
                        province: "testProvince",
                        city: "testCity",
                        street: "testStreet",
                        postal_code: "testPostalCode"
                    },
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    id: "65f47ae077fd2c504dc18cf5",
                    username: "restuadil",
                    email: "restuadil@gmail.com",
                    password: "restuadil",
                    role: "USER",
                    first_name: "testfirst",
                    last_name: "testlast",
                    address: {
                        province: "testProvince",
                        city: "testCity",
                        street: "testStreet",
                        postal_code: "testPostalCode"
                    },
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ]
        });
    }
}