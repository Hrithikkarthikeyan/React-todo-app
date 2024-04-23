import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function DropdownFilters(props) {

  function handleFilterClick(filter) {
    // props.setList(-1);
    props.setShowTodoForm(false);
    var filterName; 
    if(filter==="all"){
      filterName = "All";
    }else if(filter==="done"){
      filterName = "Completed";
    }else{
      filterName = "Todo";
    }
    props.setTasksName(filterName + " Tasks");
    const userId = localStorage.getItem('user_id');
    fetch(process.env.REACT_APP_API_URI + "/api/filter?user=" + userId + "&filter=" + filter, {
      method: 'get',
    }).then(r => r.json())
      .then(response => {
        if(response){
          setTimeout(function() {
            props.setTasks(response);
          }, 10)
        }else{
          console.log("Oops, Something went wrong!");
        }
      })
  }

  return (
    <div style={{width: "70%"}}>
      <Dropdown style={{width: "300px"}}>
        <Dropdown.Toggle id="dropdown-basic">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Filters&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleFilterClick("all")}>All</Dropdown.Item>
          <Dropdown.Item onClick={() => handleFilterClick("done")}>Done</Dropdown.Item>
          <Dropdown.Item onClick={() => handleFilterClick("todo")}>Yet to do</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default DropdownFilters