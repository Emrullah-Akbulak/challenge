import request from "supertest";
import app from "../../src";
import { db } from "../../src/database/db";
import { CustomerDbManager } from "../../src/database/customer";
import {
  DomainInfoDbManager,
  DomainNamingType,
} from "../../src/database/domain-info";
import EmailGeneratorManager from "../../src/business/email-generator";

describe("POST /email-generator/generate", () => {
  let customerDbManager: CustomerDbManager;
  let domainInfoDbManager: DomainInfoDbManager;

  beforeEach(() => {
    db["customers"] = [];
    db["domainInfo"] = [];

    customerDbManager = new CustomerDbManager();
    domainInfoDbManager = new DomainInfoDbManager();
  });

  it("should generate an email based on provided names and domain with FIRST_INITIAL_LAST structure", async () => {
    domainInfoDbManager.create({
      domain: "babbel.com",
      type: DomainNamingType.FIRST_INITIAL_LAST,
    });

    const response = await request(app).post("/email-generator/generate").send({
      firstName: "John",
      lastName: "Doe",
      domain: "babbel.com",
    });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.success.message).toContain("jdoe@babbel.com");
  });

  it("should generate an email based on provided names and domain with FIRST_LAST structure", async () => {
    domainInfoDbManager.create({
      domain: "google.com",
      type: DomainNamingType.FIRST_LAST,
    });

    const response = await request(app).post("/email-generator/generate").send({
      firstName: "John",
      lastName: "Doe",
      domain: "google.com",
    });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.success.message).toContain("johndoe@google.com");
  });

  it("should return not found if domain does not exists", async () => {
    const response = await request(app).post("/email-generator/generate").send({
      firstName: "John",
      lastName: "Doe",
      domain: "nonexistent.com",
    });

    expect(response.status).toBe(404);
    expect(response.body).toBeDefined();
    expect(response.body.error.code).toBe(1404);
    expect(response.body.error.message).toContain("Domain");
  });

  it.each([
    [
      { firstName: "", lastName: "Doe", domain: "example.com" },
      "Invalid first name",
    ],
    [
      { firstName: "John", lastName: "", domain: "example.com" },
      "Invalid last name",
    ],
    [{ firstName: "John", lastName: "Doe", domain: "" }, "Invalid domain"],
  ])("should return a validation error if data is invalid", async (obj) => {
    const response = await request(app)
      .post("/email-generator/generate")
      .send(obj);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
