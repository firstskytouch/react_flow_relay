import * as React from "react";
import { renderHook, act } from "@testing-library/react-hooks";

import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";

import useGql from "./Gql";

const frontEndArea = {
  id: "QXJlYTox",
  name: "Front End",
  skills: {
    edges: [
      { node: { id: "U2tpbGw6Mg==", name: "React" } },
      { node: { id: "U2tpbGw6NA==", name: "CSS" } },
      { node: { id: "U2tpbGw6NQ==", name: "HTML" } },
      { node: { id: "U2tpbGw6OA==", name: "Enzyme" } },
    ],
  },
};

const newFrontEndArea = {
  id: "QXJlYTox",
  name: "Front End",
  skills: {
    edges: [
      { node: { id: "U2tpbGw6Mg==", name: "React" } },
      { node: { id: "U2tpbGw6NA==", name: "CSS" } },
      { node: { id: "U2tpbGw6NQ==", name: "HTML" } },
      { node: { id: "U2tpbGw6OA==", name: "Enzyme" } },
      { node: { id: "U2tpbGw6OQ==", name: "Javascript" } },
    ],
  },
};

const backEndArea = {
  id: "QXJlYToy",
  name: "Back End",
  skills: {
    edges: [
      { node: { id: "U2tpbGw6MQ==", name: "Node.js" } },
      { node: { id: "U2tpbGw6Mw==", name: "Python" } },
      { node: { id: "U2tpbGw6Ng==", name: "MongoDB" } },
      { node: { id: "U2tpbGw6Nw==", name: "PostgreSQL" } },
    ],
  },
};

const areas = {
  QXJlYTox: frontEndArea,
  QXJlYToy: backEndArea,
};

test("gql states", () => {
  const environment = createMockEnvironment();

  const { result } = renderHook(() => useGql(environment));

  expect(result.current.selectedArea).toBe("");
  expect(result.current.areas).toStrictEqual({});
  expect(result.current.isOpen).toBe(false);

  act(() => {
    result.current.setSelectedArea("front");
  });
  expect(result.current.selectedArea).toBe("front");

  act(() => {
    result.current.openAddDialog();
  });

  expect(result.current.isOpen).toBe(true);

  act(() => {
    result.current.onCancel();
  });

  expect(result.current.isOpen).toBe(false);
});

test("gql query and mutation", async () => {
  const environment = createMockEnvironment();

  const { result, waitForNextUpdate } = renderHook(() => useGql(environment));
  environment.mock.resolveMostRecentOperation((operation) => ({
    data: {
      frontEnd: frontEndArea,
      backEnd: backEndArea,
    },
  }));
  await waitForNextUpdate();
  expect(result.current.areas).toStrictEqual(areas);
  act(() => result.current.setSelectedArea(frontEndArea.id));
  expect(result.current.selectedArea == frontEndArea.id);
  act(() => {
    result.current.onAdd("Javascript");
    environment.mock.resolveMostRecentOperation((operation) => ({
      data: { introduceSkill: { area: newFrontEndArea } },
    }));
  });
  const { edges } = result.current.areas[frontEndArea.id].skills;
  const last = edges[edges.length - 1];
  expect(last.node.name).toBe("Javascript");
});
