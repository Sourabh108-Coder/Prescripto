import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

export const Doctorcontext=createContext();

const DoctorcontextProvider=(props)=>
{

    const backendUrl="http://localhost:8000";

    const[doctoken,setdoctoken]=useState(localStorage.getItem("doctoken")?(localStorage.getItem("doctoken")):(""));

    const[allappointments,setallappointments]=useState([]);

    const[dashdata,setdashdata]=useState(false);

    const[profiledata,setprofiledata]=useState(false);


    const getallappointments=async(req,res)=>
    {
        try
        {
            const res=await axios.get(backendUrl+"/api/v1/prescripto/particular-appointment",{headers:{doctoken}});

            if(res.data.success)
            {
                setallappointments(res.data.data.reverse());
                toast.success("Fetched Successfully");
                console.log("particular"+JSON.stringify(res.data.data));
            }

            else
            {
                toast.error(res.data.message);
            }
        }

        catch(error)
        {
            toast.error('Error in Fetching');
            console.log("particular"+error.message);
        }
    }

    const completedappo=async(appointmentId)=>
    {
        try
        {
            const res=await axios.post(backendUrl+"/api/v1/prescripto/doctor-completed",{appointmentId},{headers:{doctoken}});

            if(res.data.success)
            {
                toast.success("Completed");
                getallappointments();
            }

            else
            {
                toast.error(res.data.message);
            }
        }

        catch(error)
        {
            toast.error("Error in Completion");
            console.log("completed"+error.message);
        }
    }

    const cancelledappo=async(appointmentId)=>
    {
        try
        {
            const res=await axios.post(backendUrl+"/api/v1/prescripto/cancel-doctor",{appointmentId},{headers:{doctoken}});

            if(res.data.success)
            {
                toast.success("Cancelled Succeed");
            }

            else
            {
                toast.error(res.data.message);
            }
        }

        catch(error)
        {
            toast.error("Error in Cancellation");

            console.log("cancel"+error.message);
        }
    }

    const getdashdata=async()=>
    {
        try
        {
            console.log("oye"+doctoken);
            const res=await axios.get(backendUrl+"/api/v1/prescripto/doctor-dashboard",{headers:{doctoken}});

            if(res.data.success)
            {
                setdashdata(res.data.data);
                console.log("chala"+res.data.data);
                toast.success("Fetching Dashboard");
            }
            
            else
            {
                toast.error(res.data.message);
            }
        }

        catch(error)
        {
            toast.error("Error in Fetching");

            console.log("dashing"+error.message);
        }
    }

    const getprofiledata=async()=>
    {
        try
        {
            const res=await axios.get(backendUrl+"/api/v1/prescripto/doctor-profile",{headers:{doctoken}});

            if(res.data.success)
            {
                setprofiledata(res.data.data);
                toast.success("Profile Fetched SuccessFully");
                console.log("Profile"+JSON.stringify(res.data.data));
            }

            else
            {
                toast.error(res.data.message);
            }
        }

        catch(error)
        {
            toast.error("Error in Fetching Profile");
            console.log("Profile"+error.message);
        }
    }

    const value=
    {
        doctoken,
        setdoctoken,
        backendUrl,
        allappointments,
        setallappointments,
        getallappointments,
        completedappo,
        cancelledappo,
        getdashdata,
        dashdata,
        setdashdata,
        profiledata,
        setprofiledata,
        getprofiledata
    }

    return(
        <Doctorcontext.Provider value={value}>
            {props.children}
        </Doctorcontext.Provider>
    )
}

export default DoctorcontextProvider;