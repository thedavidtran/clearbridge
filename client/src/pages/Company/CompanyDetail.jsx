import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Button from "../../components/ui/Button";

import companyLib from "../../utils/company";

const CompanyDetail = () => {
  const { id } = useParams();
  const {
    data: company,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["detail"],
    queryFn: () => {
      const url = `/companies/${id}`;
      return fetch(url, {
        method: "GET",
      }).then(async (res) => {
        return res.json();
      });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  const { name, founded, location, description } = company;

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">{name}</h1>
      <div className="flex items-center space-x-4 py-2 justify-center">
        {founded ? <p>{companyLib.getDateCaption(founded)}</p> : null}
        <p>{companyLib.getLocationCaption(location)}</p>
        <p>|</p>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>
      <div>{description}</div>
    </div>
  );
};

export default CompanyDetail;
