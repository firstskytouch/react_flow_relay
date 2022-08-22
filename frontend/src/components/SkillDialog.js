import { useCallback, useState } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function SkillDialog({ show, onCancel, onSuccess }) {
  const [skill, setSkill] = useState("");

  const handleSave = () => {
    onSuccess(skill);
  };

  const handleOnChange = useCallback((e) => {
    setSkill(e.target.value);
  }, []);

  return (
    <Modal show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Skill Dialog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label htmlFor="inputSkill">New Skill</Form.Label>
        <Form.Control
          type="text"
          id="inputSkill"
          value={skill}
          onChange={handleOnChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

SkillDialog.propTypes = {
  show: PropTypes.bool,
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default SkillDialog;
