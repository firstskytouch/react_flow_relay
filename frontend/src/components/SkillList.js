// @flow

import * as React from 'react';

import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

import SkillDialog from "./SkillDialog";

type Props = {
  title: string
}

function SkillList({ title }: Props): React.Node {
  const [skills, setSkills] = React.useState([]);
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

  return (
    <Col>
      <ListGroup>
        <ListGroup.Item key="title" variant="success">
          {title}
        </ListGroup.Item>
        {skills.map((skill) => (
          <ListGroup.Item key={skill}>{skill}</ListGroup.Item>
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
