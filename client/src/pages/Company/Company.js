import CompanyList from "./CompanyList";

const mockData = [
  {
    id: 1,
    name: "Company A",
    location: { city: "Toronto", state: "ON" },
    description: "Start up that serves widgets.",
  },
  {
    id: 2,
    name: "Company B",
    location: { city: "San Francisco", state: "CA" },
    description: "Silicon Valley company",
  },
];

const Company = () => {
  return <CompanyList companies={mockData} />;
};

export default Company;
