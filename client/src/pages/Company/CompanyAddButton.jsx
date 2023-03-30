import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";

const CompanyAddButton = () => {
  const navigateCreateCompany = () => {
    navigate("/add");
  };

  const navigate = useNavigate();
  return <Button onClick={navigateCreateCompany}>Add Company</Button>;
};

export default CompanyAddButton;
