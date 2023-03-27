import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders code challenge", () => {
  render(<App />);
  expect(
    screen.getByRole("button", { name: "Add Company" })
  ).toBeInTheDocument();
});
