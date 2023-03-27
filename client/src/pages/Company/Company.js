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
  return (
    <div className="container mx-auto bg-white rounded-xl border p-8 m-4">
      <CompanyList companies={mockData} />
    </div>
  );
};

export default Company;
