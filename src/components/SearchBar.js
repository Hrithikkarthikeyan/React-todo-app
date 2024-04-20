import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

function SearchBar(props) {
  const handleSearch = (searchTaskString) => {
    if(searchTaskString.length === 0){
      props.setList(props.list);
      props.setTasks(props.allTasks[props.list]);
      props.setShowTodoForm(true);
      return ;
    }
    props.setShowTodoForm(false);
    props.setTasksName("Search Results for \"" + searchTaskString + "\"" );
    const userId = localStorage.getItem('user_id');
    fetch("/api/search?task=" + searchTaskString + "&user=" + userId, {
      method: 'get',
    }).then(r => r.json())
      .then(response => {
        if(response){
          props.setTasks(response);
        }else{
          console.log("Oops, Something went wrong!");
        }
      })
  }

  return (
    <div style={{width: "70%"}}>
      <Form onSubmit={(event) => event.preventDefault()}>
        <Form.Control
          type="text"
          placeholder="Search Task"
          className=" mr-sm-2"
          onChange={e => handleSearch(e.target.value)}
        />
      </Form>
    </div>
  )
}

export default SearchBar