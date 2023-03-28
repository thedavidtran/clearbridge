import { useQuery } from "@tanstack/react-query";

import CompanyList from "./CompanyList";
import CompanyAddButton from "./CompanyAddButton";

const Company = () => {
  const {
    data: companies,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: () => {
      return fetch("/companies", {
        method: "GET",
      }).then(async (res) => {
        return res.json();
      });
    },
  });

  return (
    <div className="container mx-auto bg-white rounded-xl border p-8 m-4">
      {isError ? (
        <div>Error occurred: {error.message}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <CompanyList companies={companies} />
      )}
      <div className="py-2">
        <div className="float-right">
          <CompanyAddButton />
        </div>
      </div>
    </div>
  );
};

export default Company;
