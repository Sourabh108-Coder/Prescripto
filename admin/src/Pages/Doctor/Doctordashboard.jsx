import React, { useContext, useEffect } from 'react'
import { Doctorcontext } from '../../Context/Doctorcontext'
import { FaUserDoctor } from "react-icons/fa6";
import { MdPointOfSale } from "react-icons/md";
import { RiEmpathizeFill } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiFileList3Line } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";

const Doctordashboard = () => {

  const{ getdashdata,dashdata,setdashdata,doctoken,completedappo,cancelledappo}=useContext(Doctorcontext);

  useEffect(()=>
  {
    if(doctoken)
    {
      getdashdata();
    }

  },[doctoken])


  return dashdata && (
    <div className='doc-fet2'>
          <h1 className='all-doc'>Dashboard</h1>
    
          <div className="container">
            <div className='box'>
              <div className='icon'>{<GiTakeMyMoney />}</div>
              <div className='info'>
                <h4>{dashdata.earings}</h4>
                <h5>Earnings</h5>
              </div>
            </div>
          
    
          
            <div className='box'>
              <div className='icon'>{<MdPointOfSale />}</div>
              <div className='info'>
                <h4>{dashdata.appointments}</h4>
                <h5>Appointments</h5>
              </div>
            </div>
          
    
          
            <div className='box'>
              <div className='icon'>{<RiEmpathizeFill />}</div>
              <div className='info'>
                <h4>{dashdata.patients}</h4>
                <h5>Patients</h5>
              </div>
            </div>
          </div>
    
          <div>
            <div className='headingjii'>
              <h1 className='all-doc'><RiFileList3Line className='list-ico'/>  Latest Bookings</h1>
            </div>
    
            <div>
              {
                dashdata. latestappointments.length > 0 ? (dashdata. latestappointments.map((item,index)=>(
                  <div key={index} className='appointment-card'>
                    <img src={item.userdata.image}/>
    
                    <div className='info2'>
                      <h4>{item.userdata.name}</h4>
                      <h4>{item.slotdate}</h4>
                    </div>
    
                    <div className='table-cell2'>{
                                  item.canceled?(<h4 className='cano'>Cancelled</h4>):(item.iscompleted?(<h4 className='cano5'>Completed</h4>):(<div className='table-cell2 '><FaCircleCheck className='can-ico1' onClick={()=>completedappo(item._id)}/><MdCancel className='can-ico' onClick={()=>cancelledappo(item._id)}/></div>))}</div>
    
                  </div>
                ))) :(<div class="no-appointments">
                       <img src="https://cdnl.iconscout.com/lottie/premium/thumb/data-error-8597339-6842609.gif" />
                       <h2>No Appointments Available Yet!!</h2>
                     </div>)
              }
            </div>
          </div>
        </div>
  )
}

export default Doctordashboard
