import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

function AddSkill({ onAdd }) {
  return (
    <Button variant="primary" onClick={onAdd}>
      Add Skill
    </Button>
  );
}

AddSkill.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddSkill;
