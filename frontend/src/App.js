import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import SkillList from "./components/SkillList";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Container>
      <Row>
        <SkillList title="Front End" />
        <SkillList title="Back End" />
      </Row>
    </Container>
  );
}

export default App;
