import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";

const FounderAddButton = ({ companyId }) => {
  const navigateAddFounder = () => {
    navigate(`/${companyId}/founder/add`);
  };

  const navigate = useNavigate();
  return <Button onClick={navigateAddFounder}>Add Founder</Button>;
};

export default FounderAddButton;
