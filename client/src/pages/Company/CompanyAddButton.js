import { useNavigate } from "react-router-dom";

const CompanyAddButton = () => {
  const navigateCreateCompany = () => {
    navigate("/add");
  };

  const navigate = useNavigate();
  return (
    <button
      className="w-100 rounded-full px-4 py-1 mx-1 items-center bg-slate-400 hover:bg-slate-300"
      onClick={navigateCreateCompany}
    >
      <span className="text-white">Add Company</span>
    </button>
  );
};

export default CompanyAddButton;
