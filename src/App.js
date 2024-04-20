import './App.css';
import { setAuthToken } from './helpers/setAuthToken';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from "./pages/Login";
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const token = localStorage.getItem("token");
  if (token) {
      setAuthToken(token);
  }

  function hasJWT() {
    let flag = false;
    localStorage.getItem("token") ? flag=true : flag=false
    return flag
  }

  function handleLogout() {
    localStorage.removeItem('token');
    window.location.href = '/';
    // history.push('/login');
  }

  return (
    <Router>
      <div >
        {!hasJWT() ? (
            <div>
              {/* <div>
                <Link to="/">Login</Link>
              </div>
              <div>
                <Link to="/signup">Sign up</Link>
              </div> */}
            </div>
          
        ) : (
            <div>
              {/* <Button onClick={() => handleLogout()}>Logout</Button> */}
            </div>
        )}

        <Routes>
          <Route exact="true" path="/" element={hasJWT() ? <HomePage /> : <Login />} >
          </Route>
          <Route path="/signup" element={<SignUp />} >
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
