import supertest from "supertest"
import { app } from '../src/index';
import { logger } from "../src/utils/logger";
import { UserTest } from "./test.util";

describe("POST /api/auth/register", () => {
    afterEach(async () => {
        await UserTest.delete()
    })
    it("should create a new user", async () => {
        const userData = {
            username: "testuser",
            email: "testemail@gmail.com",
            password: "testpassword",
            role: "USER",
            first_name: "testfirst",
            last_name: "testlast"
        }
        const response = await supertest(app)
            .post("/api/auth/register")
            .send(userData)
        logger.info(response.body)
        expect(response.status).toBe(201)
        expect(response.body).toEqual({
            success: true,
            statusCode: 201,
            message: "User created successfully",
            data: {
                "id": expect.any(String),
                "username": "testuser",
                "email": "testemail@gmail.com",
                "role": "USER",
                "first_name": "testfirst",
                "last_name": "testlast",
                "address": {
                    "province": null,
                    "city": null,
                    "street": null,
                    "postal_code": null
                }
            },
        })
    })
    it("should not create a new user if username already exists", async () => {
        await UserTest.create()
        const userData = {
            username: "testuser",
            email: "testemail@gmail.com",
            password: "testpassword",
            role: "USER",
            first_name: "testfirst",
            last_name: "testlast"
        }
        const response = await supertest(app)
            .post("/api/auth/register")
            .send(userData)
        logger.info(response.body)
        expect(response.status).toBe(400)
        expect(response.body).toEqual({
            success: false,
            statusCode: 400,
            message: "Username or email already exists",
        })
    })
    it("should not create a new user if invalid data", async () => {
        const userData = {
            username: "testuser",
            email: "testemail@gmail.com",
            role: "USER",
            first_name: "testfirst",
            last_name: "testlast"
        }
        const response = await supertest(app)
            .post("/api/auth/register")
            .send(userData)
        logger.info(response.body)
        expect(response.status).toBe(422)
        expect(response.body).toEqual({
            success: false,
            statusCode: 422,
            message: expect.any(String),
        })
    })
})
describe("POST /api/auth/login", () => {
    afterEach(async () => {
        await UserTest.delete()
    })
    it("should login a user", async () => {
        await UserTest.create()
        const userLogin = {
            email: "testemail@gmail.com",
            password: "testpassword",
        }
        const response = await supertest(app)
            .post("/api/auth/login")
            .send(userLogin)
        logger.info(response.body)
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            success: true,
            statusCode: 200,
            message: "Login successful",
            data: {
                "accesToken": expect.any(String),
            },
        })
    })
    it("should not login a user if invalid credentials", async () => {
        const userLogin = {
            email: "testemail@gmail.com",
            password: "wrongpassword",
        }
        const response = await supertest(app)
            .post("/api/auth/login")
            .send(userLogin)
        logger.info(response.body)
        expect(response.status).toBe(401)
        expect(response.body).toEqual({
            success: false,
            statusCode: 401,
            message: "Invalid credentials",
        })
    })
    it("should not login a user if invalid data", async () => {
        const userLogin = {
            email: "testemail@gmail.com",
        }
        const response = await supertest(app)
            .post("/api/auth/login")
            .send(userLogin)
        logger.info(response.body)
        expect(response.status).toBe(422)
        expect(response.body).toEqual({
            success: false,
            statusCode: 422,
            message: expect.any(String),
        })
    })
})
describe("POST /api/auth/logout", () => {
    // TODO NEXT
})
describe("GET /api/users", () => {
    afterEach(async () => {
        await UserTest.delete()
    })
    it("should get all users", async () => {
        await UserTest.create()
        const response = await supertest(app)
            .get("/api/users")
        logger.info(response.body)
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            success: true,
            statusCode: 200,
            data: expect.any(Array),
        })
    })
})
describe("GET /api/users/:id", () => {
    afterEach(async () => {
        await UserTest.delete()
    })
    it("should get a user by id", async () => {
        await UserTest.create()
        const response = await supertest(app)
            .get("/api/users/65f47ae077fd2c504dc18cf4")
        logger.info(response.body)
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            success: true,
            statusCode: 200,
            data: expect.any(Object),
        })
    })
    it("should not get a user by id if user not found", async () => {
        const response = await supertest(app)
            .get("/api/users/wrongId")
        logger.info(response.body)
        expect(response.status).toBe(404)
        expect(response.body).toEqual({
            success: false,
            statusCode: 404,
            message: "User not found",
        })
    })
})
describe("DELETE /api/users/:id", () => {
    afterEach(async () => {
        await UserTest.delete()
    })
    it("should delete a user by id", async () => {
        await UserTest.create()
        const response = await supertest(app)
            .delete("/api/users/65f47ae077fd2c504dc18cf4")
        logger.info(response.body)
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            success: true,
            statusCode: 200,
            message: "User deleted successfully",
        })
    })
    it("should not delete a user by id if user not found", async () => {
        const response = await supertest(app)
            .delete("/api/users/wrongId")
        logger.info(response.body)
        expect(response.status).toBe(404)
        expect(response.body).toEqual({
            success: false,
            statusCode: 404,
            message: "User not found",
        })
    })
})
describe('PUT /api/users/:id', () => {
    beforeEach(async () => {
        await UserTest.create();
    })
    afterEach(async () => {
        await UserTest.delete();
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
            message: expect.any(String),
        });
    })
    it('should return 404 if username or email already exists', async () => {
        const response = await supertest(app).put('/api/users/65f47ae077fd2c504dc18cf4').send({
            email: "restuadil@gmail.com",
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
            message: expect.any(String),
        });
    })
    it('should update a user', async () => {
        const response = await supertest(app)
            .put('/api/users/65f47ae077fd2c504dc18cf4')
            .send({
                email: "updatedemail@gmail.com",
                username: "updatedusername",
            })
        logger.info(response.body)
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            success: true,
            statusCode: 200,
            message: "User updated successfully",
            data: expect.any(Object),
        })
    })
})
