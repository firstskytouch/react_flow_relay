import * as React from "react";
import { fetchQuery, commitMutation } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import type { GqlMutationResponse } from "./__generated__/GqlMutation.graphql";
import type { GqlQueryResponse } from "./__generated__/GqlQuery.graphql";

const mutation = graphql`
  mutation GqlMutation($input: IntroduceSkillInput!) {
    introduceSkill(input: $input) {
      area {
        id
        name
        skills {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
`;

const query = graphql`
  query GqlQuery {
    backEnd {
      id
      name
      skills {
        edges {
          node {
            id
            name
          }
        }
      }
    }
    frontEnd {
      id
      name
      skills {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

function useGql(environment) {
  const [selectedArea, setSelectedArea] = React.useState("");
  const [areas, setAreas] = React.useState({});

  const [isOpen, setIsOpen] = React.useState(false);

  const openAddDialog = React.useCallback(() => {
    if (selectedArea) {
      setIsOpen(true);
    }
  }, [selectedArea]);

  const onCancel = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const onSkillsUpdated = React.useCallback((response: GqlMutationResponse) => {
    const area = response.introduceSkill?.area;
    if (area) {
      setAreas((prev) => ({ ...prev, [area.id]: area }));
    }
  }, []);

  const onAdd = React.useCallback(
    (skill) => {
      setIsOpen(false);
      commitMutation(environment, {
        mutation,
        variables: { input: { skillName: skill, areaId: selectedArea } },
        onCompleted: (response: GqlMutationResponse, errors) => {
          if (response) {
            onSkillsUpdated(response);
          }
        },
      });
    },
    [selectedArea, onSkillsUpdated]
  );

  React.useEffect(() => {
    fetchQuery(environment, query, {}).then((data: GqlQueryResponse) => {
      const { frontEnd, backEnd } = data;
      const newAreas = {};
      if (frontEnd?.id) {
        newAreas[frontEnd.id] = data.frontEnd;
      }
      if (backEnd?.id) {
        newAreas[backEnd.id] = data.backEnd;
      }
      setAreas(newAreas);
    });
  }, []);

  return {
    areas,
    selectedArea,
    setSelectedArea,
    isOpen,
    openAddDialog,
    onCancel,
    onAdd,
  };
}

export default useGql;
