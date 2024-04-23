import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteListModal(props) {

  function deleteList(id) {
    props.setDeleteListModalShow(false);
    fetch(process.env.REACT_APP_API_URI + "/api/tasklist?list=" + id, {
      method: 'delete'
    }).then(r => r.json())
      .then(response => {
        if(response){
          // console.log(response);
          props.setList(null);
          props.setListName("Reminders");
        }else{
          console.log("Oops, Something went wrong!");
        }
      })
    props.setLists(props.lists.filter(list => list["ListId"] !== id));
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
          Delete list "{props.listName}"
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Deleting the List will delete all tasks associated with this list. 
        <div style={{marginTop: "10px"}}>
          Are you sure you want to delete this List?
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.setGroupModalShow(false)}>
          No
        </Button>
        <Button variant="danger" onClick={() => deleteList(props.list['ListId'])}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteListModal