// @flow

import * as React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import SkillList from "./components/SkillList";
import RelayEnvironment from "./relay/RelayEnvironment";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "./App.css";

function App(): React.Node {
  return (
    <>
      <Container>
        <h1 className="mb-4">Skill List App</h1>
        <Row>
          <SkillList title="Front End" area="frontend" />
          <SkillList title="Back End" area="backend" />
        </Row>
      </Container>
    </>
  );
}

export default App;
