import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteListModal from './DeleteListModal';


function ListItem(props) {
  const [deleteListModalShow, setDeleteListModalShow] = useState(false);

  function handleListClick(list) {
    props.setList(list['ListId']);
    props.setListName(list['ListName']);
  }

  return (
    <div className='d-flex flex-row'>
      <div key={props.list['ListId']} style={{marginTop: "3px"}}>
        <Button onClick={() => handleListClick(props.list)} style={{width: "200px"}}>{props.list['ListName']}</Button>
      </div>
      <div style={{marginLeft: "3px"}}>
        <Button variant="light" style={{height: "40px", backgroundColor: "white", color: "black"}}   onClick={() => setDeleteListModalShow(true)}>
          <DeleteIcon />
        </Button>
        <DeleteListModal setListName={props.setListName} show={deleteListModalShow} setDeleteListModalShow={setDeleteListModalShow} setList={props.setList} lists={props.lists} listName={props.list["ListName"]} setLists={props.setLists} list={props.list} onHide={() => setDeleteListModalShow(false)}/>
      </div>
    </div>
  )
}

export default ListItem