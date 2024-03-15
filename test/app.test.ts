import supertest from "supertest";
import { app } from '../src/index';





describe('GET /', () => {
    it('responds with 200', async () => {
        const response = await supertest(app).get('/');
        expect(response.status).toBe(200);
        // expect(response.text).toBe('[]');
    });
});
