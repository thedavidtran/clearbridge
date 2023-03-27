import { afterAll, describe, expect, test } from "vitest";
import app from "../../src/app.js";

afterAll(async () => {
  await app.close();
});

describe("Company Routes", () => {
  test("GET - should retrieve list of companies", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/companies",
    });
    expect(response.statusCode).toBe(200);
    const companies = response.json();
    expect(companies.length).toBe(2);
  });
});
