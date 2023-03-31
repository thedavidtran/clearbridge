import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import app from "../../src/app.js";
import CompanyModel from "../../src/model/company";

afterAll(async () => {
  await app.close();
});

beforeAll(async () => {
  await CompanyModel.deleteMany({}); // Remove all companies
});

const cleanUpData = async () => {
  await CompanyModel.deleteMany({ name: "TEST COMPANY" });
  await CompanyModel.deleteMany({ name: "TEST COMPANY UPDATED" });
};

beforeEach(cleanUpData);
afterEach(cleanUpData);

describe("Company Routes", () => {
  const companiesUri = "/companies";
  describe("GET - should retrieve list of companies", async () => {
    test("Empty list of companies", async () => {
      const response = await app.inject({
        method: "GET",
        url: companiesUri,
      });
      expect(response.statusCode).toBe(200);
      const companies = response.json();
      expect(companies.length).toBe(0);
    });
    test("Exists at least one company with all fields", async () => {
      const source = await CompanyModel.create({
        name: "TEST COMPANY",
        location: { city: "Toronto", state: "ON" },
        description: "Test description",
        founded: "2023-03-27",
      });
      const response = await app.inject({
        method: "GET",
        url: companiesUri,
      });
      expect(response.statusCode).toBe(200);
      const companies = response.json();
      expect(companies.length).toBe(1);
      const [company] = companies;
      expect(company.hasOwnProperty("name")).toBeTruthy();
      expect(company.hasOwnProperty("location")).toBeTruthy();
      expect(company.hasOwnProperty("description")).toBeTruthy();
      expect(company.hasOwnProperty("founded")).toBeTruthy();
      const { location } = company;
      expect(location.hasOwnProperty("city")).toBeTruthy();
      expect(location.hasOwnProperty("state")).toBeTruthy();
    });
  });
  describe("POST - add a company", async () => {
    test("request contains all required fields", async () => {
      const response = await app.inject({
        method: "POST",
        url: companiesUri,
        body: {
          name: "TEST COMPANY",
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
          name: "TEST COMPANY",
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
          name: "TEST COMPANY",
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
          name: "TEST COMPANY",
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
          name: "TEST COMPANY",
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
    test("request name field max length", async () => {
      const response = await app.inject({
        method: "POST",
        url: companiesUri,
        body: {
          name: "TEST COMPANY Very Long Name...........................................",
          location: {
            city: "Toronto",
            state: "ON",
          },
          description:
            "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        },
      });
      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body).message).toBe(
        "body/name must NOT have more than 30 characters"
      );
    });
    test("request location/city field max length", async () => {
      const response = await app.inject({
        method: "POST",
        url: companiesUri,
        body: {
          name: "TEST COMPANY",
          location: {
            city: "Toronto Very Long ...................................................................",
            state: "ON",
          },
          description:
            "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        },
      });
      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body).message).toBe(
        "body/location/city must NOT have more than 50 characters"
      );
    });
    test("request location/state field max length", async () => {
      const response = await app.inject({
        method: "POST",
        url: companiesUri,
        body: {
          name: "TEST COMPANY",
          location: {
            city: "Toronto",
            state: "ON........",
          },
          description:
            "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        },
      });
      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body).message).toBe(
        "body/location/state must NOT have more than 5 characters"
      );
    });
    test("request description field max length", async () => {
      const response = await app.inject({
        method: "POST",
        url: companiesUri,
        body: {
          name: "TEST COMPANY",
          location: {
            city: "Toronto",
            state: "ON",
          },
          description:
            "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890" +
            "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890" +
            "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890" +
            "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890" +
            "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890" +
            "12345", // 505
        },
      });
      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body).message).toBe(
        "body/description must NOT have more than 500 characters"
      );
    });
  });
  describe("GET - get details of a company with invalid id", async () => {
    test("Company does not exist", async () => {
      const companyId = "123456789012345678901234";
      const detailUri = `${companiesUri}/${companyId}`;
      const response = await app.inject({
        method: "GET",
        url: detailUri,
      });
      expect(response.statusCode).toBe(404);
    });
  });
  describe("DELETE - delete a company", async () => {
    test("Missing companyId in path", async () => {
      const response = await app.inject({
        method: "DELETE",
        url: companiesUri,
      });
      expect(response.statusCode).toBe(404);
    });
    test("Company does not exist", async () => {
      const companyId = "123456789012345678901234";
      const detailUri = `${companiesUri}/${companyId}`;
      const response = await app.inject({
        method: "DELETE",
        url: detailUri,
      });
      expect(response.statusCode).toBe(404);
    });
    test("Company exists", async () => {
      const company = await CompanyModel.create({
        name: "TEST COMPANY",
        location: { city: "Toronto", state: "ON" },
        description: "Test description",
      });
      expect(company).not.toBe(null);
      const detailUri = `${companiesUri}/${company.id}`;
      const response = await app.inject({
        method: "DELETE",
        url: detailUri,
      });
      expect(response.statusCode).toBe(200);
    });
  });
  describe("PUT - Update a company", async () => {
    test("Missing companyId in path", async () => {
      const response = await app.inject({
        method: "PUT",
        body: {
          name: "TEST COMPANY",
          location: {
            city: "Toronto",
            state: "ON",
          },
          description:
            "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        },
        url: companiesUri,
      });
      expect(response.statusCode).toBe(404);
    });
    test("Company does not exist", async () => {
      const companyId = "123456789012345678901234";
      const detailUri = `${companiesUri}/${companyId}`;
      const response = await app.inject({
        method: "PUT",
        body: {
          name: "TEST COMPANY",
          location: {
            city: "Toronto",
            state: "ON",
          },
          description:
            "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        },
        url: detailUri,
      });
      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.body).message).toBe(
        `Failed to update company id: ${companyId}`
      );
    });
    test("Company exists", async () => {
      const company = await CompanyModel.create({
        name: "TEST COMPANY",
        location: { city: "Toronto", state: "ON" },
        description: "Test description",
      });
      expect(company).not.toBe(null);
      const detailUri = `${companiesUri}/${company.id}`;
      const response = await app.inject({
        method: "PUT",
        body: {
          name: "TEST COMPANY UPDATED",
          location: {
            city: "Toronto",
            state: "ON",
          },
          description:
            "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        },
        url: detailUri,
      });
      expect(response.statusCode).toBe(200);
    });
  });
});
