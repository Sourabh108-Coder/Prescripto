import React, { useContext, useEffect } from 'react'
import { Admincontext } from '../../Context/Admincontext'
import { FaUserDoctor } from "react-icons/fa6";
import { MdPointOfSale } from "react-icons/md";
import { RiEmpathizeFill } from "react-icons/ri";
import { RiFileList3Line } from "react-icons/ri";
import { MdCancel } from "react-icons/md";

const Dashboard = () => {

  const{ dashboarddata,dashdata,setdashdata,adtoken,cancelappointment}=useContext(Admincontext);

  useEffect(()=>{

    if(adtoken)
    {
      dashboarddata();
    }
  },[adtoken])

  return dashdata && (
    <div className='doc-fet2'>
      <h1 className='all-doc'>Dashboard</h1>

      <div className="container">
        <div className='box'>
          <div className='icon'>{<FaUserDoctor />}</div>
          <div className='info'>
            <h4>{dashdata.doctor}</h4>
            <h5>Doctors</h5>
          </div>
        </div>
      

      
        <div className='box'>
          <div className='icon'>{<MdPointOfSale />}</div>
          <div className='info'>
            <h4>{dashdata.appointment}</h4>
            <h5>Appointments</h5>
          </div>
        </div>
      

      
        <div className='box'>
          <div className='icon'>{<RiEmpathizeFill />}</div>
          <div className='info'>
            <h4>{dashdata.user}</h4>
            <h5>Patients</h5>
          </div>
        </div>
      </div>

      <div>
        <div className='headingjii'>
          {/* <div><RiFileList3Line className='list-ico'/></div> */}
          <h1 className='all-doc'><RiFileList3Line className='list-ico'/>  Latest Bookings</h1>
        </div>

        <div>
          {
            dashdata.latestappointments.map((item,index)=>(
              <div key={index} className='appointment-card'>
                <img src={item.docdata.image}/>

                <div className='info2'>
                  <h4>{item.docdata.name}</h4>
                  <h4>{item.slotdate}</h4>
                </div>

                <div className='table-cell2'>{item.canceled?<h4 className='cano2'>Cancelled</h4>:item.iscompleted?<h4 className='cano5'>Completed</h4>:<MdCancel className='can-ico2' onClick={()=>cancelappointment(item._id)}/>}</div>

              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard
