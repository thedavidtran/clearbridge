import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import Founder from "../Founder/Founder";
import Button from "../../components/ui/Button";

import companyLib from "../../utils/company";

const CompanyDetail = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const {
    data: company,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["companyDetail", companyId],
    queryFn: () => {
      const url = `${process.env.REACT_APP_API_URL}/companies/${companyId}`;
      return fetch(url, {
        method: "GET",
        mode: "cors",
      }).then(async (res) => {
        return res.json();
      });
    },
  });

  const companyMutation = useMutation({
    mutationKey: ["companyDelete"],
    mutationFn: () => {
      const url = `${process.env.REACT_APP_API_URL}/companies/${companyId}`;
      return fetch(url, {
        method: "DELETE",
        mode: "cors",
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

  const editHandler = async () => {
    navigate(`/edit/${companyId}`);
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
        <Button onClick={editHandler}>Edit</Button>
        <Button onClick={deleteHandler}>Delete</Button>
      </div>
      <div>{description}</div>
      <Founder companyId={companyId} />
    </div>
  );
};

export default CompanyDetail;
