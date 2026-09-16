import React, { useContext, useState } from 'react'
import { Admincontext } from '../Context/Admincontext';
import axios from "axios";
import {  toast } from 'react-toastify';
import { Doctorcontext } from '../Context/Doctorcontext';


const Login = () => {

    const[status,setstatus]=useState("Admin");

    const{setadtoken,backendUrl}=useContext(Admincontext);

    const{setdoctoken}=useContext(Doctorcontext);

    const[formdata,setformdata]=useState(
        {
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

    const submithandler=async(event)=>
    {
        event.preventDefault();

        try
        {

            if(status==="Admin")
            {

                console.log(backendUrl+formdata.email+formdata.password);
                
                const {data}=await axios.post("http://localhost:8000/api/v1/prescripto/loginadmin",formdata);

                if(data.success)
                {
                    localStorage.setItem("adtoken",data.data);
                    setadtoken(data.data);
                    toast.success("Login Successfully")
                }

                else
                {
                   toast.error(data.message);
                }
            }

            else
            {
                const res=await axios.post(backendUrl+"/api/v1/prescripto/logindoctor",formdata);

                if(res.data.success)
                {
                    localStorage.setItem("doctoken",res.data.data);
                    setdoctoken(res.data.data);
                    console.log(res.data.data);
                    toast.success("Login SuccessFully");
                }

                else
                {
                   toast.error(res.data.message);
                }
            }

        }

        catch(error)
        {

            toast.error("Invalid Credentials");

            console.log("logo"+error.message);
        }
    }

  return (
    <form className='login-cont' onSubmit={submithandler}>
        <div className='login-card'>
            <h1><span>{status} </span> Login</h1>

            <div className='input-group'>
               <label for="inp2"><b>Email</b></label>
               <input type="email" id="inp2" required placeholder='Enter your Email' value={formdata.email} onChange={onchangehandler} name="email" className='input-field'/>
           </div>

           <div className='input-group'>
               <label for="inp2"><b>Password</b></label>
               <input type="password" id="inp2" required placeholder='Enter your Password' value={formdata.password} onChange={onchangehandler} name="password" className='input-field'/>
           </div>

           <button type='submit' className='submit-btn'>Sign In</button>

           {
            status=="Admin"?(<h4 className='log-sig'><b>Doctor Login ? <span className='sp' onClick={()=>setstatus("Doctor")}>Click Here</span></b></h4>):(<h4 className='log-sig'><b>Admin Login ? <span className='sp'  onClick={()=>setstatus("Admin")}>Click Here</span></b></h4>)
           }
        </div> 
    </form>
  )
}

export default Login
