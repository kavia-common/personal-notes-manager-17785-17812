import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders sign in form when not authenticated", () => {
  render(<App />);
  const signin = screen.getByText(/Sign In/i);
  expect(signin).toBeInTheDocument();
});
