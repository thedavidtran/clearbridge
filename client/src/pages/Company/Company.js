import { useEffect, useState } from "react";

import CompanyList from "./CompanyList";
import CompanyAddButton from "./CompanyAddButton";

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("/companies", {
      method: "GET",
    })
      .then(async (res) => {
        return await res.json();
      })
      .then((data) => {
        setIsLoaded(true);
        setCompanies(data);
      });
  }, []);

  return (
    <div className="container mx-auto bg-white rounded-xl border p-8 m-4">
      {isLoaded ? <CompanyList companies={companies} /> : <div>Loading...</div>}
      <div className="py-2">
        <div className="float-right">
          <CompanyAddButton />
        </div>
      </div>
    </div>
  );
};

export default Company;
