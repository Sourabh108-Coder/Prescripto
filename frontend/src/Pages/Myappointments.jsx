import React, { useContext, useEffect, useState} from 'react'
import { AppContext } from '../Context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Myappointments = () => {

  const{backendUrl,token}=useContext(AppContext);

  const[appointments,setappointments]=useState([]);

  const navigate=useNavigate();

  const getuserappointments=async()=>
  {
    try
    {
      const res=await axios.get(backendUrl+"/api/v1/prescripto/getappointments",{headers:{token}});

      if(res.data.success)
      {
        toast.success("Appointments Fetched");

        console.log("mai hu jiii"+JSON.stringify(res.data.data));

        setappointments(res.data.data.reverse());
      }

      else
      {
        toast.warn(res.data.message);
      }
    }

    catch(error)
    {
      toast.error("Error in Fetching Appointments");

      console.log("oye hoye appo book"+error.message);
    }
  }

  const cancelappointment=async(appointmentId)=>
  {

    console.log(appointmentId);

    try
    {
      const res=await axios.post(backendUrl+"/api/v1/prescripto/cancelappointment",{appointmentId},{headers:{token}});

      if(res.data.success)
      {
        toast.success("Appointment Cancelled");
        getuserappointments();
      }

      else
      {
        toast.error(res.data.messsage);
      }

    }

    catch(error)
    {
      toast.error("Error in Cancelling");

      console.log("Hey Cancel"+error.message);
    }

  }

  const initpay=(order)=>
  {
    const options=
    {
      key:"rzp_test_xWuAjh4qFAuptt",
      amount:order.amount,
      currency:order.currency,
      name:"Prescripto",
      description:"Appointment Payment",
      order_id:order.id,
      receipt:order.receipt,
      image:"https://ph-test-11.slatic.net/shop/587a074da59362d0c6e821cf20fa16c2.jpeg",
      handler:async(response)=>
      {
        console.log(response)

        try
        {
          const res=await axios.post(backendUrl+"/api/v1/prescripto/verifypayment",response,{headers:{token}});

          if(res.data.success)
          {
            getuserappointments();
            navigate("/my-appointments");
            toast.success("Payment Succeed");
          }
        }

        catch(error)
        {
          toast.error("Error in Verifying");
          console.log("Oye Pati"+error.message);
        }
      }
    }

    const rzp=new window.Razorpay(options);

    rzp.open();
  }

  const appointmentrazorpay=async(appointmentId)=>
  {
    try
    {
      const res=await axios.post(backendUrl+"/api/v1/prescripto/payment-razorpay",{appointmentId},{headers:{token}});

      if(res.data.success)
      {
        console.log("Payment jii"+JSON.stringify(res.data.data));

        initpay(res.data.data);
      }
    }

    catch(error)
    {
      toast.error("Error in Payment");
    }
  }

  useEffect(()=>{

    if(token)
    {
      getuserappointments();
    }
  },[token])

  return (
    <div className='appointments'>
      <h2 className='appo-head'>My Appointments</h2>

      <div>
        {
          appointments.map((item,index)=>(
            <div key={index} className='actual'>
              <div>
                <img src={item.docdata.image} className='img-src'/>
              </div>

              <div className='appo-info'>
                <h2>{item.docdata.name}</h2>
                <p>{item.docdata.speciality}</p>
                <p><b>Address</b></p>
                <p>{item.docdata.address.line1}</p>
                <p>{item.docdata.address.line2}</p>
                <p><span><b>Date & Time: </b></span> {item.slotdate} <b>|</b> {item.slottime}</p>
              </div>
              <div className='all-but'>
                {!item.canceled && item.payment && !item.iscompleted &&<button className='styled-button2'>Payment Succeed</button>}
                {!item.canceled && !item.payment && !item.iscompleted &&<button className="styled-button2" onClick={()=>appointmentrazorpay(item._id)}>Pay Online</button>}
                {!item.canceled && !item.payment && !item.iscompleted &&<button className="styled-button3" onClick={()=>cancelappointment(item._id)}>Cancel Appointment</button>}
                {item.canceled && !item.iscompleted &&<button className='styled-button3'>Cancelled Succeed</button>}
                {item.iscompleted && <button className='styled-button2'>Completed</button>}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Myappointments
