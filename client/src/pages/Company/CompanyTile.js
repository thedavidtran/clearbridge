import Tile from "../../components/ui/Tile.js";

const CompanyTile = ({ name, location, description }) => {
  return (
    <Tile caption={name} subCaption={location} description={description} />
  );
};

export default CompanyTile;
