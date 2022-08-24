// @flow

import * as React from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { fetchQuery, commitMutation } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import SkillList from "./components/SkillList";
import SkillDialog from "./components/SkillDialog";

import Environment from "./relay/Environment";

import type { AppMutationResponse } from "./__generated__/AppMutation.graphql";
import type { AppQueryResponse } from "./__generated__/AppQuery.graphql";

import type { Area } from "./components/SkillList";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "./App.css";

const mutation = graphql`
  mutation AppMutation($input: IntroduceSkillInput!) {
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
  query AppQuery {
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

function App(): React.Node {
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

  const onSkillsUpdated = React.useCallback((response: AppMutationResponse) => {
    const area = response.introduceSkill?.area;
    if (area) {
      setAreas((prev) => ({ ...prev, [area.id]: area }));
    }
  }, []);

  const onAdd = React.useCallback(
    (skill) => {
      setIsOpen(false);
      commitMutation(Environment, {
        mutation,
        variables: { input: { skillName: skill, areaId: selectedArea } },
        onCompleted: (response: AppMutationResponse, errors) => {
          if (response) {
            onSkillsUpdated(response);
          }
        },
      });
    },
    [selectedArea, onSkillsUpdated]
  );

  React.useEffect(() => {
    fetchQuery(Environment, query, {}).then((data: AppQueryResponse) => {
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

  return (
    <>
      <Container>
        <h1 className="mb-4">Skill List App</h1>
        <Button key="new" onClick={openAddDialog}>
          <i className="fa fa-plus me-2" aria-hidden="true"></i>
          Add New Skill
        </Button>
        <Row>
          {Object.values(areas).map((area: Area) => (
            <Col key={area.id}>
              <SkillList
                area={area}
                onSelected={() => setSelectedArea(area.id)}
                selected={selectedArea === area.id}
              />
            </Col>
          ))}
        </Row>
      </Container>

      <SkillDialog show={isOpen} onCancel={onCancel} onSuccess={onAdd} />
    </>
  );
}

export default App;
