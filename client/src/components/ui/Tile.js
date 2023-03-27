/** Generic UI Tile Component */

/**
 * Constructs the Tile component.
 * @param {string} caption Text to display in the header section of the tile.
 * @param {string} subCaption Secondary text to display in the header section of the tile
 * @param {string} [description] Text to display in the description section of the tile.
 * @returns {JSX.Element}
 * @constructor
 */
const Tile = ({ caption, subCaption, description }) => {
  return (
    <div>
      <div>
        <h1>{caption}</h1>
        <h2>{subCaption}</h2>
        <div>more...</div>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default Tile;
