import { render, renderHook, screen, waitFor } from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import CompanyList from "../../../pages/Company/CompanyList";

import companyLib from "../../../utils/company.js";

const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => ({
    navigate: mockedNavigator,
  }),
}));

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

export function useCustomHook() {
  return useQuery({
    queryKey: ["companies"],
    queryFn: async () => Promise.resolve(mockCompanies),
  });
}

test("renders CompanyList component", async () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  render(<CompanyList companies={mockCompanies} />);
  const { result } = renderHook(() => useCustomHook(), { wrapper });
  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  for (const company of mockCompanies) {
    expect(screen.getByText(company.name)).toBeInTheDocument();
    expect(
      screen.getByText(companyLib.getLocationCaption(company.location))
    ).toBeInTheDocument();
    expect(screen.getByText(company.description)).toBeInTheDocument();
  }
});
