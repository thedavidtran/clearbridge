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
  expect(screen.getByText("SubCaption")).toBeInTheDocument();
  expect(screen.getByText("Description")).toBeInTheDocument();
});
