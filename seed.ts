import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

export const prisma = new PrismaClient();
async function createDummyData() {
    try {
        // Buat 10 pengguna dummy
        for (let i = 0; i < 100; i++) {
            await prisma.user.create({
                data: {
                    username: faker.internet.userName(),
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    first_name: faker.person.firstName(),
                    last_name: faker.person.lastName(),
                    address: {
                        province: faker.location.country(),
                        city: faker.location.city(),
                        street: faker.location.streetAddress(),
                        postal_code: faker.location.zipCode(),
                    }
                },
            });
        }

        // Buat 20 produk dummy
        for (let i = 0; i < 100; i++) {
            await prisma.product.create({
                data: {
                    name: faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    price: parseFloat(faker.commerce.price()),
                    category: faker.commerce.department(),
                },
            });
        }
        console.log('Dummy data created successfully!');
    } catch (error) {
        console.error('Error creating dummy data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createDummyData();