import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../../Services/UserService';

function SignInComponent() {

    const [credential,setCredential]=useState({email:"",password:""});

    const navigate=useNavigate();

    const handlechange=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        console.log(value)
        setCredential({...credential,[name]:value})
    }

    const login=()=>{
        console.log("Login")
        UserService.loginUser(credential)
        .then((result)=>{
            console.log(result.data)
            sessionStorage.setItem("jwt",result.data.jwt)
            if(result.data.role==="ROLE_CUSTOMER"){
              navigate("/booktable")
            }else{
              navigate("/home")
            }
        }).catch((err)=>{
            alert("Authentication Failed")
        })
    }

  return (
    <div>

<form>
  <div className="form-group" style={{width: "18rem"}}>
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credential.email} onChange={handlechange}   aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group" style={{width: "18rem"}}>
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credential.password} onChange={handlechange} placeholder="Password"/>
  </div>

  <button type="button" className="btn btn-primary" onClick={login}>Login</button>
</form>

<Link to="/register">Register</Link>
    </div>
  )
}

export default SignInComponent