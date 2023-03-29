/** Generic UI Tile Component */

/**
 * Constructs the Tile component.
 * @param {string} caption Text to display in the header section of the tile.
 * @param {string} subCaption Secondary text to display in the header section of the tile
 * @param {string} [description] Text to display in the description section of the tile.
 * @returns {JSX.Element}
 * @constructor
 */
const Tile = ({ children, caption, subCaption, description }) => {
  return (
    <div className="border border-slate-200 border-1">
      <div className="flex flex-row h-12 p-2 bg-slate-200">
        <div className="flex flex-row items-center space-x-4">
          <h1 className="text-2xl font-bold ml-2">{caption}</h1>
          <p>|</p>
          <h2>{subCaption}</h2>
        </div>
        {children ? <Tile.Toolbar>{children}</Tile.Toolbar> : null}
      </div>
      <div className="p-2">
        <p>{description}</p>
      </div>
    </div>
  );
};

Tile.Toolbar = ({ children }) => {
  return <div className="flex flex-grow flex-row-reverse">{children}</div>;
};

export default Tile;
