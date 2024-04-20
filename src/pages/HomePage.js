import React, { useEffect, useState } from 'react'
import TodoList from '../components/TodoList';
import { Button } from 'react-bootstrap';
import TodoGroup from '../components/TodoGroup';
import GroupModal from '../components/GroupModal';
import SearchBar from '../components/SearchBar';
import DropdownFilters from '../components/DropdownFilters';
import Dropdown from 'react-bootstrap/Dropdown';


function HomePage() {
  const user_name = localStorage.getItem('user_name');
  const user_id = localStorage.getItem('user_id');
  const [tasks, setTasks] = useState([]);
  const [groups, setGroups] = useState([]);
  const [list, setList] = useState(null);
  const [listName, setListName] = useState("Reminders");
  const [groupModalShow, setGroupModalShow] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [showTodoForm, setShowTodoForm] = useState(true);
  const [tasksName, setTasksName] = useState("");
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [totalTasksCount, setTotalTasksCount] = useState(0);


  useEffect(() => {
    setShowTodoForm(true);
    fetch("/api/task?user=" + user_id, {
      method: 'get',
    }).then(r => r.json())
      .then(response => {
        if(response){
          var groupTasksByList = response.reduce(function(rv, x) {
              (rv[x["ListId"]] = rv[x["ListId"]] || []).push(x);
              return rv;
            }, {});
          setAllTasks(groupTasksByList);
          setTasks(groupTasksByList[list]);
          if(groupTasksByList[list] !== undefined){
            setTotalTasksCount(groupTasksByList[list].length);
            setCompletedTasksCount(groupTasksByList[list].filter(task => task["Status"]===1).length)
          }
        }else{
          console.log("Oops, Something went wrong!");
        }
      })
  }, [list]);

  useEffect(() => {
    fetch("/api/taskgroup?user=" + user_id, {
      method: 'get',
    }).then(r => r.json())
      .then(response => {
        if(response){
          setGroups(response);
        }else{
          console.log("Oops, Something went wrong!");
        }
      })
  }, []);

  function handleReminderClick() {
    setShowTodoForm(true);
    setListName("Reminders")
    setList(null);
    setTasks(allTasks[null]);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    window.location.href = '/';
    // history.push('/login');
  }
  
  return (
    <div>
      <div className="d-flex flex-row mh-100" style={{height: "100vh"}}>
        <div className="h-100" style={{width: "35%", backgroundColor: "black", overflowX: "hidden", overflowY: "auto"}}>
          <div>TODO</div>
          <div style={{textAlign: "center", marginTop: "30px"}}>
            <div style={{marginLeft: "40px", width: "465px"}}>
              <SearchBar setTasks={setTasks} setList={setList} allTasks={allTasks} list={list} setShowTodoForm={setShowTodoForm} setTasksName={setTasksName} />
            </div>
            <Button style={{width: "80%", marginTop: "30px"}} onClick={() => handleReminderClick()}>Reminders</Button>
            <div style={{display: "flex", justifyContent: "center", marginTop: "30px"}}>
              <DropdownFilters setTasks={setTasks} setList={setList} setTasksName={setTasksName} setShowTodoForm={setShowTodoForm} />
            </div>
          </div>
          <Button style={{width: "30%", marginTop: "30px", marginLeft: "20px"}} onClick={() => setGroupModalShow(true)}>Add Group</Button>
          <GroupModal show={groupModalShow} setGroupModalShow={setGroupModalShow} groups={groups} setGroups={setGroups} onHide={() => setGroupModalShow(false)} />
          <div style={{marginTop: "30px", marginLeft: "20px", marginBottom: "50px"}}>
            {(groups.length === 0) ? (<div style={{textAlign: "center", color: "white", fontSize: "20px"}}>No Groups..</div>) :  
              groups.map((group) => { 
                return <TodoGroup groups={groups} setGroups={setGroups} groupId={group['GroupId']} groupName={group['GroupName']} setList={setList} setListName={setListName} /> 
            })}    
          </div>
        </div>

        <div className="bg-white h-100" style={{width: "80%", marginLeft: "100px", overflowX: "hidden", overflowY: "auto"}}>
          <div style={{textAlign: "right", marginRight: "60px", marginTop: "20px"}}>
            <Dropdown data-bs-theme="dark">
              <Dropdown.Toggle id="dropdown-basic">
                {user_name}&nbsp;&nbsp;&nbsp;&nbsp;
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleLogout()}>Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {(showTodoForm)? (<div style={{fontSize: "40px", fontWeight: "bold"}}>{listName}</div>
            ) : (<div style={{fontSize: "40px", fontWeight: "bold"}}>{tasksName}</div>)}
          <TodoList setCompletedTasksCount={setCompletedTasksCount} setTotalTasksCount={setTotalTasksCount} completedTasksCount={completedTasksCount} totalTasksCount={totalTasksCount} tasks={tasks} setTasks={setTasks} list={list} setList={setList} showTodoForm={showTodoForm} />
        </div>
      </div>
    </div>
  ) 
}

export default HomePage