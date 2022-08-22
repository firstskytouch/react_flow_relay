import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import SkillList from "./components/SkillList";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "./App.css";

function App() {
  return (
    <>
      <Container>
        <h1 className="mb-4">Skill List App</h1>
        <Row>
          <SkillList title="Front End" />
          <SkillList title="Back End" />
        </Row>
      </Container>
    </>
  );
}

export default App;
