import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import CompanyService from "../../src/services/company";
import CompanyModel from "../../src/model/company";

beforeAll(async () => {
  await CompanyModel.deleteMany({}); // Remove all companies
});

const cleanUpData = async () => {
  await CompanyModel.deleteMany({ name: "TEST COMPANY" });
  await CompanyModel.deleteMany({ name: "TEST COMPANY UPDATED" });
};

beforeEach(cleanUpData);
afterEach(cleanUpData);
describe("Tests the Company Service", () => {
  describe("find() API", () => {
    const MockModel = {
      find: vi.fn(() => {
        return {
          sort: vi.fn(() => {
            return {
              exec: vi.fn(() => {
                return [];
              }),
            };
          }),
        };
      }),
    };
    const companyService = CompanyService(MockModel);
    test("Valid", async () => {
      const findSpy = vi.spyOn(MockModel, "find");
      await companyService.find();
      expect(findSpy).toHaveBeenCalledTimes(1);
    });
    test("Model throws error during find", async () => {
      MockModel.find.mockImplementation(() => {
        throw Error("mock error");
      });
      const result = await companyService.find();
      expect(result).toStrictEqual([]);
    });
  });
  describe("findOne() API", () => {
    const companyService = CompanyService(CompanyModel);
    test("companyId provided", async () => {
      const findByIdSpy = vi.spyOn(CompanyModel, "findById");
      await companyService.findOne("123456789012345678901234");
      expect(findByIdSpy).toHaveBeenCalledTimes(1);
    });
    test("companyId provided exists", async () => {
      const source = await CompanyModel.create({
        name: "TEST COMPANY",
        location: { city: "Toronto", state: "ON" },
        description: "Test description",
        founded: "2023-03-27",
      });
      const company = await companyService.findOne(source.id);
      expect(company).not.toBe(null);
    });
    test("companyId provided does not exist", async () => {
      const company = await companyService.findOne("123456789012345678901234");
      expect(company).toBe(null);
    });
  });
  describe("insert() API", () => {
    const companyService = CompanyService(CompanyModel);
    test("all required fields populated", async () => {
      const result = await companyService.insert({
        name: "TEST COMPANY",
        location: {
          city: "Toronto",
          state: "ON",
        },
        description: "Small description",
      });
      expect(result).not.toBe(null);
    });
    test("missing required field 'name'", async () => {
      await expect(() =>
        companyService.insert({
          location: {
            city: "Toronto",
            state: "ON",
          },
          description: "Small description",
        })
      ).rejects.toThrowError(
        "Company validation failed: name: Path `name` is required."
      );
    });
    test("missing required field 'city'", async () => {
      await expect(() =>
        companyService.insert({
          name: "TEST COMPANY",
          location: {
            state: "ON",
          },
          description: "Small description",
        })
      ).rejects.toThrowError(
        "Company validation failed: location.city: Path `location.city` is required."
      );
    });
    test("missing required field 'state'", async () => {
      await expect(() =>
        companyService.insert({
          name: "TEST COMPANY",
          location: {
            city: "Toronto",
          },
          description: "Small description",
        })
      ).rejects.toThrowError(
        "Company validation failed: location.state: Path `location.state` is required."
      );
    });
    test("missing required field 'description'", async () => {
      await expect(() =>
        companyService.insert({
          name: "TEST COMPANY",
          location: {
            city: "Toronto",
            state: "ON",
          },
        })
      ).rejects.toThrowError(
        "Company validation failed: description: Path `description` is required."
      );
    });
  });
  describe("update() API", () => {
    const companyService = CompanyService(CompanyModel);
    test("update non-existent company", async () => {
      await expect(() =>
        companyService.update("123456789012345678901234", {
          name: "TEST COMPANY UPDATED",
          location: {
            city: "Toronto",
            state: "ON",
          },
        })
      ).rejects.toThrowError("Company does not exist");
    });
    test("update existing company", async () => {
      const source = await CompanyModel.create({
        name: "TEST COMPANY",
        location: { city: "Toronto", state: "ON" },
        description: "Test description",
        founded: "2023-03-27",
      });
      const result = await companyService.update(source.id, {
        name: "TEST COMPANY UPDATED",
        location: {
          city: "Toronto",
          state: "ON",
        },
        description: "Test description 2",
        founded: "2023-03-27",
      });
      expect(result).not.toBe(null);
      const company = await CompanyModel.findById(source.id);
      expect(company.name).toBe("TEST COMPANY UPDATED");
      expect(company.description).toBe("Test description 2");
    });
  });
});
