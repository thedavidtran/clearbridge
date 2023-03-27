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
});
