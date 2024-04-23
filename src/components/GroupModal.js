import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function GroupModal(props) {
  const [groupName, setGroupName] = useState('');
  function addNewGroup(){
    props.setGroupModalShow(false);
    const newGroup = {
      "GroupName": groupName,
      "UserId": localStorage.getItem('user_id')
    }
    
    fetch(process.env.REACT_APP_API_URI + "/api/taskgroup", {
      method: 'post',
      body: JSON.stringify(newGroup)
    }).then(r => r.json())
      .then(response => {
        if(response){
          // (props.groups === undefined)? props.setGroups([newGroup]) : props.setGroups([...props.groups, newGroup]);
          const user_id = localStorage.getItem('user_id');
          fetch(process.env.REACT_APP_API_URI + "/api/taskgroup?user=" + user_id, {
            method: 'get',
          }).then(r => r.json())
            .then(response => {
              if(response){
                props.setGroups(response);
              }else{
                console.log("Oops, Something went wrong!");
              }
            })
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
          Create New Group
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            {/* <Form.Label>Group name</Form.Label> */}
            <Form.Control
              type="text"
              placeholder="Enter Group name"
              onChange={e => setGroupName(e.target.value)}
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.setGroupModalShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => addNewGroup()}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default GroupModal