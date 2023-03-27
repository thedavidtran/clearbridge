import CompanyTile from "./CompanyTile";
import companyLib from "../../utils/company";

/**
 *
 * @param {Company[]} companies
 * @returns {JSX.Element}
 * @constructor
 */
const CompanyList = ({ companies }) => {
  return (
    <div>
      {companies.map((company) => (
        <CompanyTile
          key={company.id}
          name={company.name}
          description={company.description}
          location={companyLib.getLocationCaption(company.location)}
        />
      ))}
    </div>
  );
};

export default CompanyList;
