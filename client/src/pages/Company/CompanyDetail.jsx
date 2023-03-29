import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import Button from "../../components/ui/Button";

import companyLib from "../../utils/company";

const CompanyDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: company,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["companyDetail"],
    queryFn: () => {
      const url = `/companies/${id}`;
      return fetch(url, {
        method: "GET",
      }).then(async (res) => {
        return res.json();
      });
    },
  });

  const companyMutation = useMutation({
    mutationKey: ["companyDelete"],
    mutationFn: () => {
      const url = `/companies/${id}`;
      return fetch(url, {
        method: "DELETE",
      }).then(async (res) => {
        return res.json();
      });
    },
    onSuccess: (data) => {
      const { name } = data;
      alert(`Company ${name} removed.`);
      navigate("/");
    },
  });

  const deleteHandler = async () => {
    await companyMutation.mutate();
  };

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
        <Button onClick={deleteHandler}>Delete</Button>
      </div>
      <div>{description}</div>
    </div>
  );
};

export default CompanyDetail;
