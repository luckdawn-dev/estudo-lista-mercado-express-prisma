import request from "supertest";
import { app } from "../index.js";

describe("Category Controller", () => {
  it("GET /health should return 200", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
  });
});
