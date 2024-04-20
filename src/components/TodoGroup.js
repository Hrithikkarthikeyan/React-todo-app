import React, { useState, useEffect } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from 'react-bootstrap/Button';
import ListModal from './ListModal';
import DeleteGroupModal from './DeleteGroupModal';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem  from './ListItem';


function TodoGroup(props) {
  const [listModalShow, setListModalShow] = useState(false);
  const [deleteGroupModalShow, setDeleteGroupModalShow] = useState(false);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetch("/api/tasklist?group=" + props.groupId, {
      method: 'get',
    }).then(r => r.json())
      .then(response => {
        if(response){
          setLists(response);
        }else{
          console.log("Oops, Something went wrong!");
        }
      })
  }, []);

  // function handleListClick(list) {
  //   props.setList(list['ListId']);
  //   props.setListName(list['ListName']);
  // }


  return (
    <div className="d-flex flex-row" style={{width: "100%", marginTop: "20px"}} key={props.groupId}>
      <div style={{width: "80%"}}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <div style={{fontSize: "20px"}}>{props.groupName}</div>
          </AccordionSummary>
          <AccordionDetails>
              {(lists.length === 0)? (<div>No lists</div>) : lists.map((list) => {
                return (
                  <ListItem list={list} listId={list["Listid"]} listName={list["ListName"]} setLists={setLists} setList={props.setList} setListName={props.setListName} lists={lists} />
                )
              })}
            <Button style={{width: "40%", marginTop: "30px"}} onClick={() => setListModalShow(true)}>Add List</Button>
            <ListModal show={listModalShow} setListModalShow={setListModalShow} groupId={props.groupId} lists={lists} setLists={setLists} onHide={() => setListModalShow(false)} />
          </AccordionDetails>
        </Accordion>
      </div>
      <div style={{justifyContent: "center", marginLeft: "10px"}}>
        <Button variant="light" style={{height: "55px", backgroundColor: "white", color: "black"}}   onClick={() => setDeleteGroupModalShow(true)}>
          <DeleteIcon />
        </Button>
        <DeleteGroupModal groupName={props.groupName} show={deleteGroupModalShow} setDeleteGroupModalShow={setDeleteGroupModalShow} groups={props.groups} setGroups={props.setGroups} groupId={props.groupId} setList={props.setList} onHide={() => setDeleteGroupModalShow(false)}/>
      </div>
    </div>
  )
}

export default TodoGroup