import React, { useState } from 'react'
import axios from 'axios';
import { setAuthToken } from '../helpers/setAuthToken';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginPayload = {
      "email": email,
      "password": password
    }
    fetch(process.env.REACT_APP_API_URI + "/api/login", {
      method: 'post',
      body: JSON.stringify(loginPayload)
    }).then(r => r.json())
      .then(token => {
        if (token.access_token){
          console.log(token.access_token);
          localStorage.setItem("token", token.access_token); 
          localStorage.setItem("user_id", token.user_id);  
          localStorage.setItem("user_name", token.user_name);  
          setAuthToken(token.access_token);     
          window.location.href = '/';
        }
        else {
          console.log(token);
        }
      })
  }

const handleEmailChange = (e) => {
  setEmail(e.target.value)
}

const handlePasswordChange = (e) => {
  setPassword(e.target.value)
}
  return (
    <div style={{backgroundColor: "black", width: "100%", height: "100vh"}}>
      <div style={{color: "white", textAlign: "center", fontSize:"50px"}}><div style={{padding: "50px", fontWeight: "bolder"}}>TODO</div></div>
      <div className={'mainContainer'}>
        <Card style={{ width: '20rem', padding: "25px", height: '20rem' }}>
        <div className={'titleContainer'}>
          Login
        </div>
        <Form onSubmit={handleSubmit}>
          <div className={'inputContainer'}>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              onChange={handleEmailChange}
              value={email} 
              required
            />
          </div>
          <div className={'inputContainer'} style={{marginTop: '10px'}}>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={handlePasswordChange}
              value={password}
              required
            />
          </div>
          <div className={'inputContainer'} style={{marginTop: '15px', alignItems: "center", display: "flex"}}>
            <Button type="submit">
              Login
            </Button>
          </div>
          
          <div style={{marginTop: "15px"}}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </Form>
        </Card>
      </div>
    </div>
  )
}

export default Login