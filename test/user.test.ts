import supertest from "supertest";
import { app } from '../src/index';
import { UserTest } from "./test.util";
import { logger } from '../src/utils/logger';
// !! NEXT SEPERATE TEST WITHOUT ERRORS!!
describe('GET /api/users', () => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });
    it('should respond with status 200 and return an array of users', async () => {

        const response = await supertest(app).get('/api/users');
        logger.info(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            statusCode: 200,
            data: [
                {
                    email: "restuadil09@gmail.com",
                    id: "65f47ae077fd2c504dc18cf4",
                    username: "restuadil",
                },
                {
                    email: "test0@gmail.com",
                    id: "65f47ae077fd2c504dc18cf5",
                    username: "test123",
                }],
        });
    });
})
describe('GET /api/users/:id', () => {
    beforeEach(async () => {
        await UserTest.create();
    });
    afterEach(async () => {
        await UserTest.delete();
    });
    it('should respond with status 404 ', async () => {
        const response = await supertest(app).get('/api/users/wrongId');
        logger.info(response.body);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            success: false,
            statusCode: 404,
            message: "User not found",
        });
    })
    it('should respond with status 200 and return an user', async () => {
        const response = await supertest(app).get('/api/users/65f47ae077fd2c504dc18cf4');
        logger.info(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            statusCode: 200,
            data: {
                email: "restuadil09@gmail.com",
                id: "65f47ae077fd2c504dc18cf4",
                username: "restuadil",
                first_name: "restu",
                last_name: "adil",
                updated_at: expect.any(String),
                created_at: expect.any(String),
            },
        });
    });
})
describe('DELETE /api/users/:id', () => {
    beforeEach(async () => {
        await UserTest.create();
    })
    afterEach(async () => {
        await UserTest.delete();
    })
    it('should successfully delete user', async () => {
        const response = await supertest(app).delete('/api/users/65f47ae077fd2c504dc18cf4');
        logger.info(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            statusCode: 200,
            message: "User deleted successfully",
        });
    })
    it('should return 404 if user not found', async () => {
        const response = await supertest(app).delete('/api/users/wrongId');
        logger.info(response.body);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            success: false,
            statusCode: 404,
            message: "User not found",
        });
    })
})
describe('PUT /api/users/:id', () => {
    beforeEach(async () => {
        await UserTest.create();
    })
    afterEach(async () => {
        await UserTest.delete();
    })
    it('should successfully update user', async () => {
        const response = await supertest(app).put('/api/users/65f47ae077fd2c504dc18cf4').send({
            email: "test@example.com",
            username: "restuadil",
            password: "password123",
            first_name: "New",
            last_name: "User",
        });
        logger.info(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            statusCode: 200,
            message: "User updated successfully",
            data: {
                id: expect.any(String),
                email: "test@example.com",
                username: "restuadil",
                password: "password123",
                first_name: "New",
                last_name: "User",
                created_at: expect.any(String),
                updated_at: expect.any(String),
            }
        });
    })
    it('should return 404 if user not found', async () => {
        const response = await supertest(app).put('/api/users/wrongId').send({
            email: "test@example.com",
            username: "restuadil",
            password: "password123",
            first_name: "New",
            last_name: "User",
        });
        logger.info(response.body);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            success: false,
            statusCode: 404,
            message: "Something went wrong",
        });
    })
    it('should return 404 if username or email already exists', async () => {
        const response = await supertest(app).put('/api/users/65f47ae077fd2c504dc18cf4').send({
            email: "test@example.com",
            username: "test123",
            password: "password123",
            first_name: "New",
            last_name: "User",
        });
        logger.info(response.body);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            success: false,
            statusCode: 404,
            message: "Something went wrong",
        });
    })
})

describe('POST /api/auth/register', () => {
    afterEach(async () => {
        await UserTest.delete();
    })

    it('should reject registration if username is already taken', async () => {
        await UserTest.create();
        const response = await supertest(app)
            .post("/api/auth/register")
            .send({
                email: "test@example.com",
                username: "restuadil",
                password: "password123",
                first_name: "Restu",
                last_name: "Adil",
            });
        logger.info(response.body);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            success: false,
            statusCode: 400,
            message: "Username or email already exists",
        });

    });
    it('should reject register new user if request is invalid', async () => {
        const response = await supertest(app)
            .post("/api/auth/register")
            .send({
                email: "",
                username: "",
                password: "",
                first_name: "",
                last_name: "",
            });
        logger.info(response.body);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            success: false,
            statusCode: 400,
            message: expect.any(String),
        })
    });
    it('should successfully register new user', async () => {
        const userData = {
            email: "test@example.com",
            username: "randomdata",
            password: "password123",
            first_name: "New",
            last_name: "User",
        };
        const response = await supertest(app)
            .post("/api/auth/register")
            .send(userData);
        logger.info(response.body);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            "success": true,
            "statusCode": 201,
            "message": "User created successfully",
            data: {
                "id": expect.any(String),
                "email": "test@example.com",
                "username": "randomdata",
                "first_name": "New",
                "last_name": "User"
            }
        })

    });
})


