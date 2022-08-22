import ListGroup from "react-bootstrap/ListGroup";
import PropTypes from "prop-types";
import { useState } from "react";

import AddSkill from "./AddSkill";

function SkillList({ title }) {
  const [skills, setSkills] = useState([]);

  const openAddDialog = () => {};

  return (
    <div>
      <ListGroup>
        <ListGroup.Item>{title}</ListGroup.Item>
        {skills.map((skill) => (
          <ListGroup.Item key={skill}>Dapibus ac facilisis in</ListGroup.Item>
        ))}
      </ListGroup>
      <AddSkill onAdd={openAddDialog} />
    </div>
  );
}

SkillList.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SkillList;
