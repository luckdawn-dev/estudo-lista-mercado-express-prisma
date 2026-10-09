import request from "supertest";
import express from "express";
import categoryController from "../src/controllers/category-controller";

const app = express();
app.use(express.json());
app.use("/category", categoryController);

describe("Category Controller", () => {
  it("GET /category should return 200", async () => {
    const res = await request(app).get("/category");
    expect(res.status).toBe(200);
  });

  it("POST /category with invalid body should return 400", async () => {
    const res = await request(app).post("/category").send({});
    expect(res.status).toBe(400);
  });
});
