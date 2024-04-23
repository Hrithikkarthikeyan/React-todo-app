import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    const signupPayload = {
      "name": username,
      "email": email,
      "password": password
    }
    fetch(process.env.REACT_APP_API_URI + "/api/signup", {
      method: 'post',
      body: JSON.stringify(signupPayload)
    }).then(r => r.json())
      .then(message => {
        if (message){
          window.location.href = '/';
          console.log(message);
        }
        else {
          console.log("Please type in correct username/password")
        }
      })
  }
  
  return (
    <div style={{backgroundColor: "black", width: "100%", height: "100vh"}}>
    <div style={{color: "white", textAlign: "center", fontSize:"50px"}}><div style={{padding: "50px", fontWeight: "bolder"}}>TODO</div></div>
    <div className={'mainContainer'}>
      <Card style={{ width: '20rem', padding: "25px", height: '25rem' }}>
      <div className={'titleContainer'}>
        Sign Up
      </div>
      <Form onSubmit={handleSignup}>
        <div>
          <Form.Control 
            type='text'
            placeholder='Enter name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{marginTop: '10px'}}>
          <Form.Control 
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{marginTop: '10px'}}>
          <Form.Control 
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div style={{marginTop: '10px'}}>
          <Form.Control 
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div style={{marginTop: '15px'}}>
          <Button type='submit'>Sign Up</Button>
        </div>
        <div style={{marginTop: "15px"}}>
          Already have an account? <Link to="/">Login</Link>
        </div>
      </Form>
      </Card>
    </div>
    </div>
  )
}

export default SignUp