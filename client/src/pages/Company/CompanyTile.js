import { useNavigate } from "react-router-dom";

import Tile from "../../components/ui/Tile.js";
import Button from "../../components/ui/Button";

/**
 * Constructs the CompanyTile
 * @param {string} name Company name.
 * @param {string} location Location summary string.
 * @param {string} description Company description.
 * @param {number} id Company identifier
 * @returns {JSX.Element}
 * @constructor
 */
const CompanyTile = ({ name, location, description, id }) => {
  const navigate = useNavigate();
  return (
    <Tile caption={name} subCaption={location} description={description}>
      <Button
        onClick={() => {
          navigate(`/${id}`);
        }}
      >
        More
      </Button>
    </Tile>
  );
};

export default CompanyTile;
