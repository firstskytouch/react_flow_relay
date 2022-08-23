// @flow

import * as React from "react";

import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

import SkillDialog from "./SkillDialog";

type Skill = {
  id: string,
  name: string,
}

type Props = {
  query: {
    id: string,
    name: string,
    skills: {
      edges: $ReadOnlyArray<{
        node: Skill
      }>
    },
  },
};

function SkillList({ query }: Props): React.Node {
  const [skills, setSkills] = React.useState<Skill[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const openAddDialog = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCancel = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const onAdd = React.useCallback((skill) => {
    setIsOpen(false);
    setSkills((prev) => [...prev, skill]);
  }, []);

  React.useEffect(() => {
    const skills = query.skills.edges.map(edge => edge.node);
    setSkills(skills);
  }, [query.skills]);

  return (
    <Col>
      <ListGroup>
        <ListGroup.Item key="title" variant="success">
          {query.name}
        </ListGroup.Item>
        {skills.map((skill) => (
          <ListGroup.Item key={skill.id}>{skill.name}</ListGroup.Item>
        ))}
        <ListGroup.Item action key="new" onClick={openAddDialog}>
          <i className="fa fa-plus me-2" aria-hidden="true"></i>
          Add New Skill
        </ListGroup.Item>
      </ListGroup>
      <SkillDialog show={isOpen} onCancel={onCancel} onSuccess={onAdd} />
    </Col>
  );
}

export default SkillList;
