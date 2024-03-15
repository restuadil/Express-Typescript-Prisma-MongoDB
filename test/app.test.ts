// user.test.ts
import supertest from "supertest";
import { app } from '../src/index';

describe('GET /users', () => {
    it('should respond with status 200 and return an array of users', async () => {



        // Send GET request to /users
        const response = await supertest(app).get('/users');

        // Assertions
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
