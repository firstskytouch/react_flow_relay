import { useCallback, useState } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

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

SkillList.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SkillList;
