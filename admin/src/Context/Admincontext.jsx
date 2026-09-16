import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const Admincontext=createContext();

const AdmincontextProvider=(props)=>
{

    const[adtoken,setadtoken]=useState(localStorage.getItem("adtoken")?(localStorage.getItem("adtoken")):(""));

    const backendUrl="http://localhost:8000";

    const[doctors,setdoctors]=useState([]);

    const[appointments,setappointments]=useState([]);

    const[dashdata,setdashdata]=useState(false);

    const getalldoctors=async()=>
    {
        try
        {
            const res=await axios.post(backendUrl+"/api/v1/prescripto/getalldoc",{},{headers:{adtoken}}); 

            if(res.data.success)
            {
                setdoctors(res.data.data);
                toast.success("Fetched Successfully")
                console.log("Hello here is the doctors data"+res.data.data);
            }
            else
            {
                toast.error(res.data.message);
            }
        }
        catch(error)
        {
            toast.error("Error in Fetching")
            console.log(error);
        }
    }

    const changeavailability=async (docId)=>
    {
        try
        {
            const res=await axios.post(backendUrl+"/api/v1/prescripto/changeavailability",{docId},{headers:{adtoken}});

            if(res.data.success)
            {
                toast.success("Availability Changed");
                getalldoctors();
            }

            else
            {
                toast.error("Error in Updating");
            }
        }

        catch(error)
        {
            toast.error("Error in Changing");
            console.log('Oye KOI km hega tere ko'+error);
        }
    }

    const getallappointments=async()=>
    {
        try
        {

            const res=await axios.get(backendUrl+"/api/v1/prescripto/getadminappo",{headers:{adtoken}});

            if(res.data.success)
            {
                setappointments(res.data.data);
                toast.success("Appointments Fetched");
                console.log(JSON.stringify(res.data.data));
            }
            else
            {
                toast.error(res.data.message);
            }
        }

        catch(error)
        {
            toast.error("Error in Fetching");
            console.log("mai uske roop"+error.message);
        }
    }


    const cancelappointment=async(appointmentId)=>
    {
        try
        {
            const res=await axios.post(backendUrl+"/api/v1/prescripto/cancel-admin-appointment",{appointmentId},{headers:{adtoken}});

            if(res.data.success)
            {
                toast.success("Cancelled Succeed");
                 getallappointments();
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


    const dashboarddata=async()=>
    {
        try
        {
            const res=await axios.get(backendUrl+"/api/v1/prescripto/dashboard",{headers:{adtoken}});

            if(res.data.success)
            {
                setdashdata(res.data.data);
                toast.success("Fetched Successfully");
                console.log("dashed"+JSON.stringify(res.data.data));

            }

            else
            {
                toast.error(res.data.message);
            }
        }

        catch(error)
        {
            toast.error("Error in Fetching");
            console.log("dashed"+error.message);
        }
    }

    const value=
    {
        adtoken,
        setadtoken,
        backendUrl,
        doctors,
        getalldoctors,
        changeavailability,
        appointments,
        setappointments,
        getallappointments,
        cancelappointment,
        dashboarddata,
        dashdata,
        setdashdata,
    }

    return(
        <Admincontext.Provider value={value}>
            {props.children}
        </Admincontext.Provider>
    )
}

export default AdmincontextProvider