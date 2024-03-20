import supertest from "supertest"
import { app } from "../src"
import { logger } from "../src/utils/logger"
import { ProductTest } from "./test.util"

describe("GET /api/products", () => {
    afterEach(async () => {
        await ProductTest.delete()
    })
    it("should get all products", async () => {
        await ProductTest.create()
        const response = await supertest(app)
            .get("/api/products")
        logger.info(response.body)
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            success: true,
            statusCode: 200,
            message: expect.any(String),
            data: expect.any(Array),
            pagination: {
                current_page: expect.any(Number),
                limit: expect.any(Number),
                total_data: expect.any(Number),
                total_page: expect.any(Number),
            },
        })
    })
})
describe("GET /api/products/:id", () => {
    afterEach(async () => {
        await ProductTest.delete()
    })
    it("should get a product by id", async () => {
        await ProductTest.create()
        const response = await supertest(app)
            .get("/api/products/65f47ae077fd2c504dc18cf4")
        logger.info(response.body)
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            success: true,
            statusCode: 200,
            message: expect.any(String),
            data: expect.any(Object),
        })
    })
    it("should not get a product by id if product not found", async () => {
        const response = await supertest(app)
            .get("/api/products/wrongId")
        logger.info(response.body)
        expect(response.status).toBe(404)
        expect(response.body).toEqual({
            success: false,
            statusCode: 404,
            message: "Product not found",
        })
    })
})
describe("DELETE /api/products/:id", () => {
    afterEach(async () => {
        await ProductTest.delete()
    })
    it("should delete a product by id", async () => {
        await ProductTest.create()
        const response = await supertest(app)
            .delete("/api/products/65f47ae077fd2c504dc18cf4")
        logger.info(response.body)
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            success: true,
            statusCode: 200,
            message: expect.any(String),
            data: expect.any(String),
        })
    })
    it("should not delete a product by id if product not found", async () => {
        const response = await supertest(app)
            .delete("/api/products/wrongId")
        logger.info(response.body)
        expect(response.status).toBe(404)
        expect(response.body).toEqual({
            success: false,
            statusCode: 404,
            message: "Product not found",
        })
    })
})
describe("POST /api/products", () => {
    afterEach(async () => {
        await ProductTest.delete()
    })
    it("should create a product", async () => {
        const response = await supertest(app)
            .post("/api/products")
            .send({
                name: "barang123",
                description: "description barang123",
                category: "barang134",
                price: 12341
            })
        logger.info(response.body)
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            success: true,
            statusCode: 200,
            message: expect.any(String),
            data: expect.any(Object),
        })
    })
    it("should not create a product if invalid data", async () => {
        const response = await supertest(app)
            .post("/api/products")
            .send({ name: "test", description: "test", category: "test" })
        logger.info(response.body)
        expect(response.status).toBe(422)
        expect(response.body).toEqual({
            success: false,
            statusCode: 422,
            message: expect.any(String),
        })
    })
    it("should not create a product if name already exists", async () => {
        await ProductTest.create()
        const response = await supertest(app)
            .post("/api/products")
            .send({ name: "test", price: 100, description: "test", category: "test" })
        logger.info(response.body)
        expect(response.status).toBe(422)
        expect(response.body).toEqual({
            success: false,
            statusCode: 422,
            message: expect.any(String),
        })
    })
})