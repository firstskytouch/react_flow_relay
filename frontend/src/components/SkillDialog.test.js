import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import SkillDialog from "./SkillDialog";

test("loads dialog and clicked cancel", async () => {
  const handleOnCancelMock = jest.fn();
  render(<SkillDialog show onCancel={handleOnCancelMock} />);
  fireEvent.click(screen.getByText(/Cancel/i));
  expect(handleOnCancelMock).toHaveBeenCalled();
});

test("loads dialog and returning a new skill", async () => {
  const handleOnSuccessMock = jest.fn();
  const newSkill = "Javascript"
  handleOnSuccessMock.mockImplementation(skill => {
    expect(skill).toBe(newSkill)
  })
  const dialog = render(<SkillDialog show onSuccess={handleOnSuccessMock} />);
  const input = dialog.getByLabelText(/New Skill/i);
  fireEvent.change(input, { target: { value: newSkill } });

  fireEvent.click(screen.getByText(/Add/i));
  expect(handleOnSuccessMock).toHaveBeenCalled();
});
