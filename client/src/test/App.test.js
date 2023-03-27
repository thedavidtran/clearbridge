import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders company list page", () => {
  render(<App />);
  expect(
    screen.getByRole("button", { name: "Add Company" })
  ).toBeInTheDocument();
});
