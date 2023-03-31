import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";

import mongoose from "mongoose";
import app from "../../src/app.js";
import CompanyModel from "../../src/model/company";
import FounderModel from "../../src/model/founder.js";

const { ObjectId } = mongoose.mongo;
afterAll(async () => {
  await app.close();
});

beforeAll(async () => {
  await CompanyModel.deleteMany({}); // Remove all companies
  await FounderModel.deleteMany({}); // Remove all founders.
});

const cleanUpData = async () => {
  await CompanyModel.deleteMany({ name: "TEST COMPANY" });
  await FounderModel.deleteMany({ name: "TEST USER" });
};

beforeEach(cleanUpData);
afterEach(cleanUpData);

describe("Founder Routes", () => {
  const foundersUri = "/founders";
  describe("GET - should retrieve list of founders for a specific company", async () => {
    test("Empty list of founders", async () => {
      const company = await CompanyModel.create({
        name: "TEST COMPANY",
        location: { city: "Toronto", state: "ON" },
        description: "Test description",
        founded: "2023-03-27",
      });
      const foundersQueryUri = `${foundersUri}?companyId=${company.id}`;
      const response = await app.inject({
        method: "GET",
        url: foundersQueryUri,
      });
      expect(response.statusCode).toBe(200);
      const founders = response.json();
      expect(founders.length).toBe(0);
    });
    test("Exists at least one founder", async () => {
      const company = await CompanyModel.create({
        name: "TEST COMPANY",
        location: { city: "Toronto", state: "ON" },
        description: "Test description",
        founded: "2023-03-27",
      });
      const foundersQueryUri = `${foundersUri}?companyId=${company.id}`;
      await FounderModel.create({
        name: "TEST USER",
        title: "Developer",
        company: company.id,
      });
      const response = await app.inject({
        method: "GET",
        url: foundersQueryUri,
      });
      expect(response.statusCode).toBe(200);
      const founders = response.json();
      expect(founders.length).toBe(1);
      const [founderResponse] = founders;
      expect(founderResponse.hasOwnProperty("name")).toBeTruthy();
      expect(founderResponse.hasOwnProperty("title")).toBeTruthy();
    });
  });
  describe("PUT - add a founder", async () => {
    test("request contains all required fields", async () => {
      const company = await CompanyModel.create({
        name: "TEST COMPANY",
        location: { city: "Toronto", state: "ON" },
        description: "Test description",
        founded: "2023-03-27",
      });
      const response = await app.inject({
        method: "POST",
        url: foundersUri,
        body: {
          name: "TEST USER",
          title: "Developer",
          companyId: company.id,
        },
      });
      expect(response.statusCode).toBe(200);
    });
    test("request missing required 'name' field", async () => {
      const company = await CompanyModel.create({
        name: "TEST COMPANY",
        location: { city: "Toronto", state: "ON" },
        description: "Test description",
        founded: "2023-03-27",
      });
      const foundersQueryUri = `${foundersUri}?companyId=${company.id}`;
      const response = await app.inject({
        method: "POST",
        url: foundersQueryUri,
        body: {
          title: "Developer",
        },
      });
      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body).message).toBe(
        "body must have required property 'name'"
      );
    });
    test("request missing required 'title' field", async () => {
      const company = await CompanyModel.create({
        name: "TEST COMPANY",
        location: { city: "Toronto", state: "ON" },
        description: "Test description",
        founded: "2023-03-27",
      });
      const response = await app.inject({
        method: "POST",
        url: foundersUri,
        body: {
          name: "TEST USER",
          companyId: company.id,
        },
      });
      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body).message).toBe(
        "body must have required property 'title'"
      );
    });
    test("duplicate founder", async () => {
      const company = await CompanyModel.create({
        name: "TEST COMPANY",
        location: { city: "Toronto", state: "ON" },
        description: "Test description",
        founded: "2023-03-27",
      });
      await FounderModel.create({
        name: "TEST USER",
        title: "Developer",
        company: new ObjectId(company.id),
      });
      const response = await app.inject({
        method: "POST",
        url: foundersUri,
        body: {
          name: "TEST USER",
          title: "Developer",
          companyId: company.id,
        },
      });
      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.body).message).toBe("Founder already exists");
    });
  });
});
