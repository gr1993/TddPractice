const request = require('supertest');
const app = require('../../server');
const newProduct = require('../data/new-product.json');

let firstProduct;

it("POST /api/product", async () => {
    const response = await request(app)
        .post("/api/product")
        .send(newProduct);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.description).toBe(newProduct.description);
});

it("should return 500 on POST /api/product", async () => {
   const response = await request(app)
        .post('/api/product')
        .send({ name: "phone" });
   expect(response.statusCode).toBe(500);
   expect(response.body).toStrictEqual({ message: "Product validation failed: description: Path `description` is required." });
});

it("GET /api/product", async () => {
    const response = await request(app).get("/api/product");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].name).toBeDefined();
    expect(response.body[0].description).toBeDefined();
    firstProduct = response.body[0];
});

it("GET /api/product/:productId", async() => {
    const response = await request(app).get('/api/product/' + firstProduct._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(firstProduct.name);
    expect(response.body.description).toBe(firstProduct.description);
});

it("GET id doesn't exist /api/product/:productId", async() => {
    const response = await request(app).get('/api/product/' + '616fdf096e2ac88bcf22cc51');
    expect(response.statusCode).toBe(404);
});