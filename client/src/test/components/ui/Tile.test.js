import { render, screen } from "@testing-library/react";

import Tile from "../../../components/ui/Tile";

test("renders Tile component", () => {
  render(
    <Tile
      caption={"Caption"}
      subCaption={"SubCaption"}
      description={"Description"}
    />
  );
  expect(screen.getByText("Caption")).toBeInTheDocument();
});
