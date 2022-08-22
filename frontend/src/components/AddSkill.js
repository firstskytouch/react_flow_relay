import React from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

function AddSkill({ onAdd }) {
  <Button variant="primary" onClick={onAdd}>
    Add Skill
  </Button>;
}

AddSkill.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddSkill;
