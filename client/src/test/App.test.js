import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders code challenge", () => {
  render(<App />);
  const element = screen.getByText(/Company A/i);
  expect(element).toBeInTheDocument();
});
