const request = require('supertest')
const baseURL = "http://localhost:3000"

jest.useRealTimers();

jest.setTimeout(90000);

describe("GET /products", () => {
  const product = {
    // _id: "1",
    name: "Drink water",
    price: 34,
  }
  beforeAll(async () => {
    // create the product
    await request(baseURL).post("/api/products").send(product);
  })
  it("should return 200", async () => {
    const response = await request(baseURL).get("/api/products");
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(null);
  });
  afterAll(async () => {
    await request(baseURL).delete(`/api/products/${product._id}`)
  })
});