import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

import AddSkill from "./AddSkill";
import SkillDialog from "./SkillDialog";

function SkillList({ title }) {
  const [skills, setSkills] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const openAddDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCancel = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onAdd = useCallback((skill) => {
    setIsOpen(false);
    setSkills((prev) => [...prev, skill]);
  }, []);

  return (
    <Col>
      <h2>{title}</h2>
      <ListGroup>
        {skills.map((skill) => (
          <ListGroup.Item key={skill}>{skill}</ListGroup.Item>
        ))}
      </ListGroup>
      <AddSkill onAdd={openAddDialog} />

      <SkillDialog show={isOpen} onCancel={onCancel} onSuccess={onAdd} />
    </Col>
  );
}

SkillList.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SkillList;
