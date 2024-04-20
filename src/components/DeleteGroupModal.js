import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteGroupModal(props) {

  function deleteGroup(id) {
    props.setDeleteGroupModalShow(false);
    fetch("/api/taskgroup?group=" + id, {
      method: 'delete'
    }).then(r => r.json())
      .then(response => {
        if(response){
          // console.log(response);
          props.setList(null);
        }else{
          console.log("Oops, Something went wrong!");
        }
      })
    props.setGroups(props.groups.filter(group => group["GroupId"] !== props.groupId));
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
          Delete group "{props.groupName}"
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Deleting the group will delete all the lists and tasks associated with this group. 
        <div style={{marginTop: "10px"}}>Are you sure you want to delete this group?</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.setDeleteGroupModalShow(false)}>
          No
        </Button>
        <Button variant="danger" onClick={() => deleteGroup(props.groupId)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteGroupModal