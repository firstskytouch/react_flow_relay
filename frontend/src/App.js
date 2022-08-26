// @flow

import * as React from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import type { Area } from "./components/SkillList";
import SkillList from "./components/SkillList";
import SkillDialog from "./components/SkillDialog";

import useGql from "./hooks/Gql";
import Environment from "./relay/Environment";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "./App.css";

function App(): React.Node {
  const {
    areas,
    selectedArea,
    setSelectedArea,
    isOpen,
    openAddDialog,
    onCancel,
    onAdd,
  } = useGql(Environment);

  return (
    <>
      <Container>
        <h1 className="mb-4">Skill List App</h1>
        <Button key="new" onClick={openAddDialog} id="btn-add-new-skill">
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
