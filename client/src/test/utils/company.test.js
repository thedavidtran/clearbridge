import companyLib from "../../utils/company";

describe("company utils library", () => {
  test("getLocationCaption", () => {
    const location = {
      city: "Toronto",
      state: "ON",
    };
    const result = companyLib.getLocationCaption(location);
    expect(result).toBe("Toronto, ON");
  });
  test("getDateCaption", () => {
    const date = new Date("2023-03-06T00:00:00.000+00:00");
    expect(companyLib.getDateCaption(date)).toBe("Mar 5, 2023");
  });
});
