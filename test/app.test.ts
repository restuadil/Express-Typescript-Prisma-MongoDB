import supertest from "supertest";
import { app } from '../src/index';
import { UserTest } from "./test.util";
import { logger } from '../src/utils/logger';

describe('GET /users', () => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });
    it('should respond with status 200 and return an array of users', async () => {

        const response = await supertest(app).get('/users');
        logger.info(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            statusCode: 200,
            data: [{
                email: "restuadil09@gmail.com",
                id: "65f47ae077fd2c504dc18cf4",
                username: "restuadil",
            }],
        });
    });
});

describe('GET /users/:id', () => {
    beforeEach(async () => {
        await UserTest.create();
    });
    afterEach(async () => {
        await UserTest.delete();
    });
    it('should respond with status 404 ', async () => {
        const response = await supertest(app).get('/users/65f47ae077fd2c504dc18cf5');
        logger.info(response.body);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            success: false,
            statusCode: 404,
            message: "User not found",
        });
    })
    it('should respond with status 200 and return an user', async () => {
        const response = await supertest(app).get('/users/65f47ae077fd2c504dc18cf4');
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
            },
        });
    });
})

describe('POST /users', () => {
    afterEach(async () => {
        await UserTest.delete();
    })
    it('should reject registration if username is already taken', async () => {
        await UserTest.create();

        const response = await supertest(app)
            .post("/users")
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
            .post("/users")
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
            username: "restuadil",
            password: "password123",
            first_name: "New",
            last_name: "User",
        };
        const response = await supertest(app)
            .post("/users")
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
                "username": "restuadil",
                "first_name": "New",
                "last_name": "User"
            }
        })
    });
})