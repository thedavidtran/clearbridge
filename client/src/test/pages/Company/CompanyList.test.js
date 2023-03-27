import { render, screen } from "@testing-library/react";

import CompanyList from "../../../pages/Company/CompanyList";

import companyLib from "../../../utils/company.js";

test("renders CompanyList component", () => {
  const mockCompanies = [
    {
      id: "1",
      name: "Company A",
      location: { city: "Toronto", state: "ON" },
      description: "Small widget factory",
    },
    {
      id: "2",
      name: "Acme",
      location: { city: "San Francisco", state: "CA" },
      description: "Warehousing",
    },
  ];
  render(<CompanyList companies={mockCompanies} />);
  for (const company of mockCompanies) {
    expect(screen.getByText(company.name)).toBeInTheDocument();
    expect(
      screen.getByText(companyLib.getLocationCaption(company.location))
    ).toBeInTheDocument();
    expect(screen.getByText(company.description)).toBeInTheDocument();
  }
});
