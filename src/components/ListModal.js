import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function ListModal(props) {
  const [listName, setListName] = useState('');
  function addNewList(){
    props.setListModalShow(false);
    const newList = {
      "ListName": listName,
      "GroupId": props.groupId
    }
    fetch("/api/tasklist", {
      method: 'post',
      body: JSON.stringify(newList)
    }).then(r => r.json())
      .then(response => {
        if(response){
          fetch("/api/tasklist?group=" + props.groupId, {
            method: 'get',
          }).then(r => r.json())
            .then(response => {
              if(response){
                props.setLists(response);
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
          Create New List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            {/* <Form.Label>Group name</Form.Label> */}
            <Form.Control
              type="text"
              placeholder="Enter List name"
              onChange={e => setListName(e.target.value)}
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.setListModalShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => addNewList()}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ListModal