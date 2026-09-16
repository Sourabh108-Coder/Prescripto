import React, { useContext, useEffect } from 'react'
import { Doctorcontext } from '../../Context/Doctorcontext'
import { MdCancel } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";


const Doctorappointment = () => {

  const{doctoken,setdoctoken,backendUrl,allappointments,setallappointments,getallappointments,completedappo,cancelledappo}=useContext(Doctorcontext);

  useEffect(()=>
  {

    if(doctoken)
    {
      getallappointments();
    }

  },[doctoken]);

  return (
    <div className='doc-fet2'>

      <h1 className='all-doc'>All Appointments</h1>

      
      <div className='appo-data'>
        <div className='table-header'>
          <div className='table-cell'><h3>S.No</h3></div>
          <div className='table-cell'><h3>Patient</h3></div>
          <div className='table-cell'><h3>Email</h3></div>
          <div className='table-cell'><h3>Date & Time</h3></div>
          <div className='table-cell'><h3>Fees</h3></div>
          <div className='table-cell'><h3>Payment</h3></div>
          <div className='table-cell'><h3>Action</h3></div>
        </div>
      
        {allappointments.length >0 ? (allappointments.map((item, index) => (
          <div key={index} className='table-row'>
            <div className='table-cell'><h4>{index + 1}</h4></div>
            <div className='table-cell'><h4>{item.userdata.name}</h4></div>
            <div className='table-cell'><h4>{item.userdata.email}</h4></div>
            <div className='table-cell'><h4>{item.slotdate} | {item.slottime}</h4></div>
            <div className='table-cell'><h4>{item.amount}</h4></div>
            <div className='table-cell'><h4>{item.payment ? "Online":"Cash"}</h4></div>
            <div className='table-cell'>
            {
              item.canceled?(<h4 className='cano'>Cancelled</h4>):(item.iscompleted?(<h4 className='cano5'>Completed</h4>):(<div className='table-cell2 '><FaCircleCheck className='can-ico1' onClick={()=>completedappo(item._id)}/><MdCancel className='can-ico' onClick={()=>cancelledappo(item._id)}/></div>))
            }
            </div>
          </div>
        ))):(<div class="no-appointments">
              <img src="https://cdnl.iconscout.com/lottie/premium/thumb/data-error-8597339-6842609.gif" />
              <h2>No Appointments Available Yet!!</h2>
            </div>)}
      </div>
    </div>
  )
}

export default Doctorappointment
