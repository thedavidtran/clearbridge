import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import FounderService from "../../src/services/founder";
import CompanyModel from "../../src/model/company";
import FounderModel from "../../src/model/founder";

beforeAll(async () => {
  await CompanyModel.deleteMany({}); // Remove all companies
  await FounderModel.deleteMany({}); // Remove all founders
});

const cleanUpData = async () => {
  await CompanyModel.deleteMany({ name: "TEST COMPANY" });
  await FounderModel.deleteMany({ name: "TEST USER" });
};

beforeEach(cleanUpData);
afterEach(cleanUpData);
describe("Tests the Founder Service", () => {
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
    const founderService = FounderService(MockModel);
    test("Valid", async () => {
      const findSpy = vi.spyOn(MockModel, "find");
      await founderService.find("123456789012345678901234");
      expect(findSpy).toHaveBeenCalledTimes(1);
    });
    test("Model throws error during find", async () => {
      MockModel.find.mockImplementation(() => {
        throw Error("mock error");
      });
      await expect(() =>
        founderService.find("123456789012345678901234")
      ).rejects.toThrowError("mock error");
    });
  });
  describe("insert() API", () => {
    const founderService = FounderService(FounderModel);
    test("all required fields populated", async () => {
      const source = await CompanyModel.create({
        name: "TEST COMPANY",
        location: { city: "Toronto", state: "ON" },
        description: "Test description",
        founded: "2023-03-27",
      });
      const result = await founderService.insert({
        name: "TEST USER",
        title: "Developer",
        companyId: source.id,
      });
      expect(result).not.toBe(null);
    });
    test("missing required field 'companyId'", async () => {
      await expect(() =>
        founderService.insert({
          name: "TEST USER",
          title: "Developer",
        })
      ).rejects.toThrowError(
        "Founder validation failed: company: Path `company` is required."
      );
    });
    test("test duplicate founder by name", async () => {
      const source = await CompanyModel.create({
        name: "TEST COMPANY",
        location: { city: "Toronto", state: "ON" },
        description: "Test description",
        founded: "2023-03-27",
      });
      const success = await founderService.insert({
        name: "TEST USER",
        title: "Developer",
        companyId: source.id,
      });
      expect(success).not.toBe(null);
      // duplicate
      await expect(() =>
        founderService.insert({
          name: "TEST USER",
          title: "Developer",
          companyId: source.id,
        })
      ).rejects.toThrowError("Founder already exists");
    });
  });
});
