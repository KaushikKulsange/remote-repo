import React, { useState } from 'react'

function ForgetPasswordComponent() {
    const [email,setEmail]=useState("");
    const [otp,setOTP]=useState("");
    const [credentials,setCredentials]=useState({password:"",confirmPassword:""})

    const changeEmail=(event)=>{
        let value=event.target.value;
        setEmail(value);
    }

    const changeOTP=(event)=>{
        let value=event.target.value;
        setOTP(value);
    }

    const handleChange=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        setCredentials({...credentials,[name]:value})
    }

    const Validate=()=>{
        let pswd=credentials.password;
        let cpswd=credentials.confirmPassword;
        if(pswd.trim().length<5){
            document.getElementById("passworderr").innerHTML="Minimum Length Is 5";
            return false;
        }

        if(cpswd!==pswd){
            document.getElementById("confirmPassworderr").innerHTML="Password Did Not Match";
            return false;
        }
        document.getElementById("passworderr").innerHTML="";
        document.getElementById("confirmPassworderr").innerHTML="";
        return true;
    }

    const changePassword=()=>{
        if(Validate()){

        }
    }

  return (
    <div>
        <div className="container">
            <table>
                <tbody>
                    <tr>
                        <td><label htmlFor='email'>Enter Email</label></td>
                        <td><input id="email" name='email'value={email} onChange={changeEmail}/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button type='button' id='btn' name='btn'>Generate OTP</button></td>
                        <td></td>
                    </tr>
                    <tr id="otprow" hidden>
                        <td><label htmlFor='otp'>Enter Email</label></td>
                        <td><input id="otp" name='otp'value={otp} onChange={changeOTP}/></td>
                        <td id="val_result"></td>
                    </tr>
                    <tr>
                    <td></td>
                        <td><button type='button' id='btn' name='btn'>Validate OTP</button></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><label htmlFor='password'>New Password</label></td>
                        <td><input type='text' id='password' value={credentials.password} onChange={handleChange}/></td>
                        <td id="passworderr"></td>
                    </tr>
                    <tr>
                    <td><label htmlFor='confirmPassword'>New Password</label></td>
                        <td><input type='text' id='confirmPassword' value={credentials.password} onChange={handleChange}/></td>
                        <td id="confirmPassworderr"></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button id="cpswdbtn" onClick={changePassword}>Change Password</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ForgetPasswordComponent