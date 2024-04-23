import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function UpdateTaskModal(props) {
  const [updatedTaskName, setUpdatedTaskName] = useState("");

  function handleUpdateTaskName() {
    props.setUpdateTaskModalShow(false);
    const editedTask = {
      "TaskId": props.task["TaskId"],
      "TaskName": updatedTaskName
    }
    fetch(process.env.REACT_APP_API_URI + "/api/task/edit", {
      method: 'put',
      body: JSON.stringify(editedTask)
    }).then(r => r.json())
      .then(response => {
        if(response){
          console.log(response);
          props.setTasks(props.tasks.map(task => { 
            if (task["TaskId"] === props.task["TaskId"]) {
              return {...task, "TaskName": updatedTaskName};
            }else{
              return task;
            }
          }))
        }else{
          console.log("Oops, Something went wrong!");
        }
      })
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            {/* <Form.Label>Group name</Form.Label> */}
            <Form.Control
              type="text"
              defaultValue={props.task["TaskName"]}
              onChange={e => setUpdatedTaskName(e.target.value)}
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.setUpdateTaskModalShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleUpdateTaskName()}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateTaskModal