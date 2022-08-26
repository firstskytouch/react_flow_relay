import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import SkillList from "./SkillList";

const area = {
  id: "test-id",
  name: "Front End",
  skills: {
    edges: [
      {
        node: {
          id: "skill-1",
          name: "Javascript",
        },
      },
    ],
  },
};

test("non-selected list", async () => {
  const { container } = render(
    <SkillList area={area} />
  );
  const alerts = container.getElementsByClassName("alert-primary")
  expect(alerts.length).toBe(0);
});

test("selected list", async () => {
  const { container } = render(
    <SkillList area={area} selected />
  );
  const alerts = container.getElementsByClassName("alert-primary")
  expect(alerts.length).toBe(1);
});

test("selecting list", async () => {
  const handleOnClickedMock = jest.fn();
  render(
    <SkillList area={area} selected onSelected={handleOnClickedMock} />
  );
  fireEvent.click(screen.getByText(area.name));
  expect(handleOnClickedMock).toHaveBeenCalled();
});
