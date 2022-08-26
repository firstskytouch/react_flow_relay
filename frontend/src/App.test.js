import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const titleElement = screen.getByText(/Skill List App/i);
  expect(titleElement).toBeInTheDocument();

  const addButtonElement = screen.getByText(/Add New Skill/i);
  expect(addButtonElement).toBeInTheDocument();
});
