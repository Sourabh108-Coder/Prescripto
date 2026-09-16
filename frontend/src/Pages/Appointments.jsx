import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import { FaCheckCircle } from "react-icons/fa";
import { FcInfo } from "react-icons/fc";
import Relateddoc from '../components/Relateddoc';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointments = () => {

  const{docId}=useParams();

  const{doctors,backendUrl,getdoctorsdata,token,}=useContext(AppContext);

  const[savedocinfo,setsavedocinfo]=useState(null);

  const[docslot,setdocslot]=useState([]);

  const[slotindex,setslotindex]=useState(0);

  const[slottime,setslottime]=useState("");

  const navigate=useNavigate();

  const daysofweek=['SUN','MON','TUE','WED','THU','FRI','SAT'];

  const getavailableslots=async()=>
  {
    setdocslot([]);

    let today=new Date();

    for(let i=0;i<7;i++)
    {
      let currdate=new Date(today);
      currdate.setDate(today.getDate()+i);

      let endTime=new Date();
      endTime.setDate(today.getDate()+i);
      endTime.setHours(21,0,0,0);

      if(today.getDate()===currdate.getDate())
      {
        currdate.setHours(currdate.getHours()>10?currdate.getHours()+1:10);
        currdate.setMinutes(currdate.getMinutes()>30?30:0);
      }

      else
      {
        currdate.setHours(10);
        currdate.setMinutes(0);
      }

      let timeslots=[];

      while(currdate<endTime)
      {
        let formatted=currdate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});

        timeslots.push({
          datetime:new Date(currdate),
          time:formatted
        })

        currdate.setMinutes(currdate.getMinutes()+30);
      }

      setdocslot(prev=>([...prev,timeslots]));
    }
  }

  const fetchdocinfo= async()=>
  {
    const docinfo=doctors.find(doc=> doc._id===docId);

    setsavedocinfo(docinfo);

    console.log("hello"+savedocinfo);
  }

  useEffect(()=>{
    fetchdocinfo()
  },[doctors,docId]);

  useEffect(() => {
    if (savedocinfo) {
      console.log("hello jii" + savedocinfo.name); 
    }
  }, [savedocinfo]);

  useEffect(()=>
  {
    getavailableslots();
  },[savedocinfo])

  useEffect(()=>{

    console.log(docslot);
  },[docslot])


  const bookappointment=async()=>
  {

    if(!token)
    {
      toast.warn("Please Log In or Sign Up to Book");
      return navigate("/login");
    }
    try
    {
      const date=docslot[slotindex][0].datetime;

      let day=date.getDate();
      let month=date.getMonth()+1;
      let year=date.getFullYear();

      let slotdate=day+"-"+month+"-"+year; 

      console.log("Hey I am slot date"+slotdate+"hey i am slottime"+slottime);

      const res=await axios.post(backendUrl+"/api/v1/prescripto/bookappointment",{docId,slotdate,slottime},{headers:{token}});

      if(res.data.success)
      {
        toast("Appointment Booked Successfully");
         getdoctorsdata();
         navigate("/my-appointments")
      }

      else
      {
        toast.info(res.data.message);
      }
    }

    catch(error)
    {
      toast.error("Error in Booking Appointment");

      console.log("Appo jii hu..."+error.message);
    }
  }

  return savedocinfo && (

    <div>
    <div className='appo-doc-page'>

              <div className='doc-img-det'>
                 <img src={savedocinfo.image} alt={savedocinfo.name} className='choice-img1'/>
              </div>


       {
             savedocinfo ? 
             (<div className='full-doc-detail'>
              <div>
                <p className='doc-name'><h2>{savedocinfo.name}<FaCheckCircle  className='verify'/></h2></p>
              </div>

              <div className='spec-deg'>
                <p><b>{savedocinfo.degree} - {savedocinfo.speciality}</b></p>
                <button className='exep-but'>{savedocinfo.experience}</button>
              </div>

              <div>
                <p><h3>About <FcInfo className='verify1'/></h3></p>
                <p className='doc-det'>{savedocinfo.about}</p>
              </div>

              <p><h3>Appointment Fee: $<span>{savedocinfo.fee}</span></h3></p>
            
     </div>):(<p>Loading...</p>)
             
       }
    </div>

     <div className='container1'>
       <p className='book-slot'><b><h1>Booking Slots</h1></b></p>

       <div className="container">
         {
            docslot.length && docslot.map((item,index)=>(

              <div onClick={()=> setslotindex(index)} key={index} className={`da-we ${slotindex===index ? 'clicked' : ''}`}>
                   <p>{item[0] && daysofweek[item[0].datetime.getDay()]}</p>
                   <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>))
         }
       </div>

       <div className="slot-container">
        {
          docslot.length && docslot[slotindex].map((item,index)=>(

           <div onClick={()=>setslottime(item.time)} className={`slot-item ${item.time===slottime? 'clicked1':''}`}>
             <p key={index}>
              {
                item.time.toLowerCase()
              }
            </p>
           </div>

          ))
        }
       </div> 

       <button className='appo-but' onClick={bookappointment}>Book An Appointment</button>
     </div>

     <Relateddoc docId={docId} speciality={savedocinfo.speciality}/>

</div>

    
  )
}

export default Appointments
