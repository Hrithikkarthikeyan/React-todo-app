import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateTaskModal from './UpdateTaskModal';
import EditIcon from '@mui/icons-material/Edit';

function TodoItem({ task, deleteTask, toggleCompleted, setTasks, tasks}) {
  const [updateTaskModalShow, setUpdateTaskModalShow] = useState(false);

  function handleChange() {
    toggleCompleted(task['TaskId']);
  }

  return (
    <Card bg='' style={{marginTop: "8px", width: "600px",  backgroundColor: task['Status']? "rgba(0, 0, 0, 0.2)" : ""}}>
      <Card.Body  style={{}}>
        <div className='todo-item' style={{}}>
          <Form style={{}}>
            <Form.Check
              type="checkbox"
              onChange={handleChange}
              checked={(task['Status'])? true : false}
            />
          </Form>
          <div className={(task['Status'])? "text-decoration-line-through" : ""} style={{fontSize: "20px", marginLeft: "20px", }}>{task['TaskName']}</div>
          <div style={{position: "absolute", right: "10px", top: "12px" }}>
            <Button variant="light" style={{backgroundColor: "white", color: "black"}}  onClick={() => setUpdateTaskModalShow(true)}>
              <EditIcon />
            </Button>
            <UpdateTaskModal tasks={tasks} setTasks={setTasks} show={updateTaskModalShow} task={task} setUpdateTaskModalShow={setUpdateTaskModalShow} onHide={() => setUpdateTaskModalShow(false)} />
            <Button variant="light" style={{backgroundColor: "white", color: "black", marginLeft: "10px"}}   onClick={() => deleteTask(task['TaskId'])}>
              <DeleteIcon />
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default TodoItem