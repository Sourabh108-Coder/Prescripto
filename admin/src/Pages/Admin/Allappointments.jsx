import React, { useContext, useEffect } from 'react'
import { Admincontext } from '../../Context/Admincontext'
import { MdCancel } from "react-icons/md";

const Allappointments = () => {

  const{adtoken,appointments,setappointments,getallappointments,cancelappointment}=useContext(Admincontext);

  useEffect(()=>
  {

    if(adtoken)
    {
      getallappointments();
    }
  },[adtoken])

  return (
    <div className='doc-fet2'>
      <h1 className='all-doc'>All Appointments</h1>

      {/* <div className='appo-data'>
        <div>
          <h3>S.No</h3>
          <h3>Patient</h3>
          <h3>Email</h3>
          <h3>Date & Time</h3>
          <h3>Doctor</h3>
          <h3>Fees</h3>
          <h3>Action</h3>
        </div>

        {
          appointments.map((item,index)=>(
            
            <div key={index}>
              <h4>{index+1}</h4>
              <h4>{item.userdata.name}</h4>
              <h4>{item.userdata.email}</h4>
              <h4>{item.slotdate} | {item.slottime}</h4>
              <h4>{item.docdata.name}</h4>
              <h4>{item.docdata.fee}</h4>
              <h4>X</h4>
            </div>
          ))
        }
      </div> */}


<div className='appo-data'>
  <div className='table-header'>
    <div className='table-cell'><h3>S.No</h3></div>
    <div className='table-cell'><h3>Patient</h3></div>
    <div className='table-cell'><h3>Email</h3></div>
    <div className='table-cell'><h3>Date & Time</h3></div>
    <div className='table-cell'><h3>Doctor</h3></div>
    <div className='table-cell'><h3>Fees</h3></div>
    <div className='table-cell'><h3>Action</h3></div>
  </div>

  {appointments.map((item, index) => (
    <div key={index} className='table-row'>
      <div className='table-cell'><h4>{index + 1}</h4></div>
      <div className='table-cell'><h4>{item.userdata.name}</h4></div>
      <div className='table-cell'><h4>{item.userdata.email}</h4></div>
      <div className='table-cell'><h4>{item.slotdate} | {item.slottime}</h4></div>
      <div className='table-cell'><h4>{item.docdata.name}</h4></div>
      <div className='table-cell'><h4>{item.docdata.fee}</h4></div>
      <div className='table-cell'>{item.canceled?<h4 className='cano'>Cancelled</h4>:item.iscompleted?<h4 className='cano5'>Completed</h4>:<MdCancel className='can-ico' onClick={()=>cancelappointment(item._id)}/>}</div>
    </div>
  ))}
</div>
    </div>
  )
}

export default Allappointments
