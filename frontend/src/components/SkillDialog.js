// @flow

import * as React from 'react';

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

type Props = {
  show: bool,
  onCancel: Function,
  onSuccess: Function,
}

function SkillDialog({ show, onCancel, onSuccess }: Props): React.Node {
  const [skill, setSkill] = React.useState("");

  const handleSave = React.useCallback(() => {
    onSuccess(skill);
    setSkill('');
  }, [skill, onSuccess]);

  const handleOnChange = React.useCallback((e) => {
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
        <Button variant="secondary" onClick={onCancel} id='btn-cancel'>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} id='btn-success'>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SkillDialog;
