import { createContext, useEffect, useState } from "react";
// import { doctors } from "../data";
import axios from 'axios';
import {toast} from 'react-toastify';


export const AppContext=createContext()

const AppContextProvider=(props)=>
{

    const backendUrl="http://localhost:8000";

    const[doctors,setdoctors]=useState([]);

    const[token,settoken]=useState(localStorage.getItem('token')?(localStorage.getItem('token')):(false));

    const[userdata,setuserdata]=useState(false);

    const getuserprofile=async()=>
    {
        try
        {
            const res=await axios.get(backendUrl+"/api/v1/prescripto/fetchuser",{headers:{token}});

            if(res.data.success)
            {
                setuserdata(res.data.data);
                toast.success("Profile Fetched Successfully")
                console.log(res.data.data);
            }

            else
            {
                toast.error(res.data.message);
               
            }
        }
        

        catch(error)
        {
            toast.error("Error in fetching  the user profile");
            console.log("hello mere bhai...."+error.message);
        }
    }

    const getdoctorsdata=async()=>
    {
        try
        {
            const res=await axios.get(backendUrl+'/api/v1/prescripto/doctorsdata');

            if(res.data.success)
            {
                toast.success("Fetched Successfully");
                setdoctors(res.data.data);
                console.log("oye moye" + JSON.stringify(res.data.data));
            }

            else
            {
                toast.error("Error in Fetching");
            }
        }

        catch(error)
        {
            console.log("Hey this is the error"+error.message);

            toast.error(error.message);
        }
    }

    const value=
    {
        doctors,
        getdoctorsdata,
        token,
        settoken,
        backendUrl,
        userdata,
        setuserdata,
        getuserprofile,
    }

    useEffect(()=>{

        getdoctorsdata();
    },[])

    useEffect(()=>{

        if(token)
        {
            getuserprofile();
        }

        else
        {
            setuserdata(false);
        }
    },[token])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default  AppContextProvider