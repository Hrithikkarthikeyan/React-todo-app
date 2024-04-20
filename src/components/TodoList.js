import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem';
import { Button, Form } from 'react-bootstrap';

function TodoList({tasks, setTasks, list, setList, showTodoForm, completedTasksCount, totalTasksCount, setCompletedTasksCount, setTotalTasksCount}) {
  const [text, setText] = useState("");
  function addTask(text) {
    if(text.length === 0){
      return ;
    }
    const date = new Date();
    const newTask = {
      "Status": 0,
      "TaskName": text,
      "Description": "Some description",
      "Deadline": date.toISOString().split('T')[0],
      "ListId": list,
      "UserId": localStorage.getItem('user_id')
    };
    // (tasks === undefined)? setTasks([newTask]) : setTasks([...tasks, newTask]);
    setList(-1);
    
    setText('');
    fetch("/api/task", {
      method: 'post',
      body: JSON.stringify(newTask)
    }).then(r => r.json())
      .then(response => {
        if(response){
          setList(list);
          console.log(response);
        }else{
          console.log("Oops, Something went wrong!");
        }
      })
  }

  function deleteTask(id) {
    fetch("/api/task?task=" + id, {
      method: 'delete'
    }).then(r => r.json())
      .then(response => {
        if(response){
          // console.log(response);
          setTotalTasksCount(totalTasksCount-1);
        }else{
          console.log("Oops, Something went wrong!");
        }
      })
    setTasks(tasks.filter(task => task["TaskId"] !== id));
  }

  function toggleCompleted(id) {
    setTasks(tasks.map(task => {
      if (task["TaskId"] === id) {
        const editedTask = {
          "TaskId": task["TaskId"],
          "Status": !task["Status"]
        }
        fetch("/api/task/edit", {
          method: 'put',
          body: JSON.stringify(editedTask)
        }).then(r => r.json())
          .then(response => {
            if(response){
              console.log(response);
            }else{
              console.log("Oops, Something went wrong!");
            }
          })
        if(!task["Status"]===false){
          setCompletedTasksCount(completedTasksCount-1);
        }else{
          setCompletedTasksCount(completedTasksCount+1);
        }
        return {...task, "Status": !task["Status"]};
      } else {
        return task;
      } 
    }));
  }

  return (
    <div key={list}>
      <div className='todo-list' key={list}>
        {showTodoForm && (
          <div>
            <div style={{fontSize: "20px", marginBottom: "20px"}}>{completedTasksCount} / {totalTasksCount} Completed</div>
            <div className="d-flex flex-row mt-2">
              <div style={{width: "530px"}}>
                <Form onSubmit={() => addTask(text)}>
                  <Form.Control
                    key={list}
                    value={text}
                    type="text"
                    placeholder="Enter Todo"
                    className=" mr-sm-2"
                    onChange={e => setText(e.target.value)}
                    style={{width: "530px"}}
                  />
                </Form>
              </div>
              <div style={{marginLeft: "10px"}}>
                <Button onClick={() => addTask(text)}>Add</Button>
              </div>
            </div>
          </div>)}
        {(tasks === undefined)? (<div style={{fontSize: "20px", marginTop: "20px", marginLeft: "5px"}}>No tasks in this list</div>) : 
        tasks.map((task) => {
          return <TodoItem 
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    toggleCompleted={toggleCompleted}
                    setTasks={setTasks}
                    tasks={tasks}
                  />
        })}
      </div>
    </div>
  )
}

export default TodoList