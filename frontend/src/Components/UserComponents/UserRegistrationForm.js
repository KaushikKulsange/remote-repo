import React, { useState } from 'react'
import UserService from '../../Services/UserService'
import { useNavigate } from 'react-router-dom'

function UserRegistrationForm() {
    const [details,setDetails]=useState({firstName:"",lastName:"",email:"",password:"",
        confirmPassword:"",phoneNumber:"",address:"",role:"ROLE_CUSTOMER"})

    const [checks,setCheck]=useState({firstName:false,lastName:false,email:false,password:false,
        confirmPassword:false,phoneNumber:false,address:false,role:true})

    const [emailValidated,setEmailValidate]=useState(false);

    const navigate=useNavigate();

    const handleNames=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        setDetails({...details,[name]:value})

        if(isFinite(value) || value.trim().length==0){
            document.getElementById(name+"err").innerHTML="Invalid "+name;
        }else{
            setCheck({...checks,[name]:true})
            document.getElementById(name+"err").innerHTML="";

        }
    }

    const handleEmail=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        setDetails({...details,[name]:value})
        if(isFinite(value) || value.trim().length==0){
            document.getElementById(name+"err").innerHTML="Invalid email"
        }else{
            setCheck({...checks,[name]:true})
            document.getElementById(name+"err").innerHTML="";
            setEmailValidate(false);
        }
    }

    const handlePassword=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        setDetails({...details,[name]:value})
        if(value.length<5 || value.trim().length<5){
            document.getElementById(name+"err").innerHTML="Invalid Password"
        }else{
            setCheck({...checks,[name]:true})
            document.getElementById(name+"err").innerHTML="";
        }
    }

    const handleConfirmPassword=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        setDetails({...details,[name]:value})
        if(value!==details.password){
            document.getElementById(name+"err").innerHTML="Password Did Not Match"
        }else{
            setCheck({...checks,[name]:true})
            document.getElementById(name+"err").innerHTML="";
        }
    }

    const handleNumber=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        setDetails({...details,[name]:value})
        console.log(parseInt(value))
        console.log(isFinite(value)+" "+value.length)
        if(value.trim().length!=10 || (!isFinite(value))){
            document.getElementById(name+"err").innerHTML="Invalid Number"
        }else{
            setCheck({...checks,[name]:true})
            document.getElementById(name+"err").innerHTML="";
        }
    }

    const validate=()=>{
        console.log(details)
        if(checks.firstname==false || checks.lastname==false || checks.password==false ||checks.confirmPassword==false || checks.phoneNumber==false || checks.address==false || checks.role==false || emailValidated==false){
            return false;
        }
        return true;
    }

    const validateEmail=()=>{
        if(checks.email==true){
            UserService.emailValidation(details.email)
            .then((result)=>{
                console.log(result.data)
                document.getElementById("emailerr").innerHTML=""
                //Makes Otp input tag visible
                document.getElementById("otprow").hidden=false; 
            })
            .catch((err)=>{
                console.log(err);
                document.getElementById("emailerr").innerHTML="Invalid email"
            })
        }else{
            alert("Enter Email")
        }
    }

    const validateOTP=(event)=>{
        let value=document.getElementById("otp").value;
        UserService.otpValidation(value)
        .then((result)=>{
            console.log(result.data);
            alert("OTP Validation Successful")
            setEmailValidate(true);
        }).catch((err)=>{
            alert("OTP Validation Failed")
            setEmailValidate(false);
        })
    }

    const register=()=>{
        console.log(validate())
        if(validate()){
            alert("Fill Form Correctly")
        }else if(emailValidated==false){
            alert("Validate Email")
        }
        else{
            UserService.registerUser(details)
            .then((result)=>{
                console.log(result.data);
                alert("Successful")
                navigate("/signin")
            })
        }
    }

  return (
    <div>
        <div className="container">
            <form>
                <table>
                    <tbody>
                        <tr>
                        <td><label htmlFor='firstname'>Firstname</label></td>
                        <td><input type='text' id='firstname' name='firstName'
                         value={details.firstname} onChange={handleNames}/></td>
                        <td id="firstNameerr"></td>
                        </tr>

                        <tr>
                        <td><label htmlFor='lastname'>Firstname</label></td>
                        <td><input type='text' id='lastname' name='lastName'value={details.lastname} onChange={handleNames}/></td>
                        <td id="lastNameerr"></td>
                        </tr>

                        <tr>
                        <td><label htmlFor='email'>Email</label></td>
                        <td><input type='email' id='email' name='email'
                        value={details.email} onChange={handleEmail} /></td>
                        <td><button type='button' name='validateemail' onClick={validateEmail}>Validate Email</button></td>
                        <td id="emailerr"></td>
                        </tr>

                        <tr id="otprow" hidden="true">
                        <td><label htmlFor='otp'>Enter OTP</label></td>
                        <td><input type='text' id="otp" name="otp"/></td>
                        <td><button type='button' name='otpbtn' onClick={validateOTP}>Validate OTP</button></td>
                        </tr>

                        <tr>
                        <td><label htmlFor='password'>Password</label></td>
                        <td><input type='password' id='password' name='password'
                        value={details.password} onChange={handlePassword}/></td>
                        <td id="passworderr"></td>
                        </tr>

                        <tr>
                        <td><label htmlFor='confirmPassword'>Confirm Password</label></td>
                        <td><input type='password' id='confirmPassword' name='confirmPassword'
                        value={details.confirmPassword} onChange={handleConfirmPassword}/></td>
                        <td id="confirmPassworderr"></td>
                        </tr>

                        <tr>
                        <td><label htmlFor='phoneNumber'>Phone Number</label></td>
                        <td><input type='text' id='phoneNumber' name='phoneNumber'
                        value={details.phoneNumber} onChange={handleNumber}/></td>
                        <td id="phoneNumbererr"></td>
                        </tr>

                        <tr>
                        <td><label htmlFor='address'>Address</label></td>
                        <td><input type='text' id='address' name='address'
                        value={details.address} onChange={handleNames}/></td>
                        <td id="addresserr"></td>
                        </tr>
                        <tr>
                            <td><button type='button' name='btn' onClick={register}>Register</button></td>
                        </tr>
                    </tbody>
                </table>
                
            </form>
        </div>
    </div>
  )
}

export default UserRegistrationForm