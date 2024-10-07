import request from "supertest";
import app from "../../src";

describe("GET /", () => {
  it("should return 'Hello World!'", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.success.message).toContain("Hello World!");
  });
});
