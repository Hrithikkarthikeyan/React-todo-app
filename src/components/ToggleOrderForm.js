import React from 'react';
import Form from 'react-bootstrap/Form';

function ToggleOrderForm(props) {

  const handleToggle = () => {
    props.setIsToggledTaskOrder(!props.isToggledTaskOrder);
  }

  return (
    <Form>
      <Form.Check
        type="switch"
        id="custom-switch"
        onChange={handleToggle}
        label="Move done tasks down"
      />
    </Form>
  )
}

export default ToggleOrderForm