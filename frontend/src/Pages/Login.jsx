import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const[status,setstatus]=useState("Sign In");

  const{token,settoken,backendUrl}=useContext(AppContext);

  const navigate=useNavigate();

  const[formdata,setformdata]=useState(
    {
      name:"",
      email:"",
      password:"",
    }
  );

   const onchangehandler=(event)=>
    {
        const{name,value}=event.target;

        setformdata((prev)=>{
            return{
                ...prev,
                [name]:value,
            }
        })
    }

  const onsubmithandler=async(event)=>
  {
    event.preventDefault();

    try
    {
      if(status=='Sign Up')
      {
        
        const res=await axios.post(backendUrl+"/api/v1/prescripto/registeruser",formdata);

        if(res.data.success)
        {
          localStorage.setItem('token',res.data.data);
          settoken(res.data.data);
          toast.success("Register Successfully");
        }

        else
        {
          toast.error(res.data.message);
        }
      }

      else
      {
        const res=await axios.post(backendUrl+'/api/v1/prescripto/loginuser',formdata);

        if(res.data.success)
        {
          localStorage.setItem('token',res.data.data);
          settoken(res.data.data);
          toast.success("Login Successfully");
        }

        else
        {
          toast.error(res.data.message);
        }
      }
    }

    catch(error)
    {
      toast.error("Error in Processing");
      console.log("Hey login+register"+error.message);
    }
  }

  useEffect(()=>{

    if(token)
    {
      navigate("/");
    }
  },[token])

  return (
    <form className='login-cont' onSubmit={onsubmithandler}>

      <div className='login-card'>
        <h1>{status==="Sign Up"?("Create Account"):("Sign In")}</h1>
        <p><b>Please {status==="Sign Up"?("Sign Up"):("Sign In")} To Book Appointment</b></p>

        {
          status==="Sign Up"?
          (<div className='input-group'>
            <label for="inp1"><b>USERNAME</b></label>
                
            <input type="text" id="inp1" required placeholder='Enter your Full Name' value={formdata.name} onChange={onchangehandler} name="name" className='input-field'/>
         </div>):("")
        }

         <div className='input-group'>
           <label for="inp2"><b>Email</b></label>
           <input type="email" id="inp2" required placeholder='Enter your Email' value={formdata.email} onChange={onchangehandler} name="email" className='input-field'/>
        </div>

         <div className='input-group'>
           <label for="inp3"><b>Password</b></label>
           <input type="password" id="inp3" required placeholder='Enter your Password' value={formdata.password} onChange={onchangehandler} name="password" className='input-field'/>
        </div>

        <button type='submit' className='submit-btn'>{status==="Sign Up"?("Create Account "):("Sign In")}</button>

       {
        status=="Sign Up"?(<h4 className='log-sig'><b>Already have an Account? <span className='sp' onClick={()=>setstatus("Sign In")}>Login Here</span></b></h4>):(<h4 className='log-sig'><b>Dont't have an Account? <span className='sp' onClick={()=>setstatus("Sign Up")}>Sign Up Here</span></b></h4>)
       }
      </div>
      
    </form>
  )
}

export default Login
