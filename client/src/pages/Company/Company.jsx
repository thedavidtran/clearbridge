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
      return fetch(`${process.env.REACT_APP_API_URL}/companies`, {
        method: "GET",
        mode: "cors",
      }).then(async (res) => {
        return res.json();
      });
    },
  });

  return (
    <div className="">
      {isError ? (
        <div>Error occurred: {error.message}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : companies.length ? (
        <CompanyList companies={companies} />
      ) : (
        <div>No Companies</div>
      )}
      <div className="py-2 flex flex-row-reverse">
        <CompanyAddButton />
      </div>
    </div>
  );
};

export default Company;
