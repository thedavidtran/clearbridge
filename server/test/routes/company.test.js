import { afterAll, describe, expect, test } from "vitest";
import app from "../../src/app.js";

afterAll(async () => {
  await app.close();
});

describe("Company Routes", () => {
  const companiesUri = "/companies";
  test("GET - should retrieve list of companies", async () => {
    const response = await app.inject({
      method: "GET",
      url: companiesUri,
    });
    expect(response.statusCode).toBe(200);
    const companies = response.json();
    expect(companies.length).toBe(2);
    const [company] = companies;
    expect(company.hasOwnProperty("name")).toBeTruthy();
    expect(company.hasOwnProperty("location")).toBeTruthy();
    expect(company.hasOwnProperty("description")).toBeTruthy();
    const { location } = company;
    expect(location.hasOwnProperty("city")).toBeTruthy();
    expect(location.hasOwnProperty("state")).toBeTruthy();
  });
  describe("POST - add a company", async () => {
    test("request contains all required fields", async () => {
      const response = await app.inject({
        method: "POST",
        url: companiesUri,
        body: {
          name: "Company X",
          location: {
            city: "Toronto",
            state: "ON",
          },
          description: "Description of the test company",
        },
      });
      expect(response.statusCode).toBe(200);
    });
    test("request missing required 'name' field", async () => {
      const response = await app.inject({
        method: "POST",
        url: companiesUri,
        body: {
          location: {
            city: "Toronto",
            state: "ON",
          },
          description: "Missing company name description",
        },
      });
      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body).message).toBe(
        "body must have required property 'name'"
      );
    });
    test("request missing required 'location' field", async () => {
      const response = await app.inject({
        method: "POST",
        url: companiesUri,
        body: {
          name: "Company X",
          description: "Missing company name description",
        },
      });
      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body).message).toBe(
        "body must have required property 'location'"
      );
    });
    test("request contains 'location' field, missing required 'city' field", async () => {
      const response = await app.inject({
        method: "POST",
        url: companiesUri,
        body: {
          name: "Company X",
          location: {
            state: "ON",
          },
          description: "Missing location city",
        },
      });
      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body).message).toBe(
        "body/location must have required property 'city'"
      );
    });
    test("request contains 'location' field, missing required 'state' field", async () => {
      const response = await app.inject({
        method: "POST",
        url: companiesUri,
        body: {
          name: "Company X",
          location: {
            city: "Toronto",
          },
          description: "Missing location state",
        },
      });
      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body).message).toBe(
        "body/location must have required property 'state'"
      );
    });
    test("request missing required description field", async () => {
      const response = await app.inject({
        method: "POST",
        url: companiesUri,
        body: {
          name: "Company X",
          location: {
            city: "Toronto",
            state: "ON",
          },
        },
      });
      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body).message).toBe(
        "body must have required property 'description'"
      );
    });
  });
});
