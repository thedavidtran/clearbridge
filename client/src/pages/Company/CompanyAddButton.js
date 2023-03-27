const addCompanyHandler = () => {
  console.log("Add Company Clicked!");
};

const CompanyAddButton = () => {
  return (
    <button
      className="w-100 rounded-full px-4 py-1 mx-1 items-center bg-slate-400 hover:bg-slate-300"
      onClick={addCompanyHandler}
    >
      <span className="text-white">Add Company</span>
    </button>
  );
};

export default CompanyAddButton;
