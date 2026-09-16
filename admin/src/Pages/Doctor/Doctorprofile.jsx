import React, { useContext, useEffect, useState } from 'react'
import { Doctorcontext } from '../../Context/Doctorcontext'
import { toast } from 'react-toastify';
import axios from 'axios';

const Doctorprofile = () => {

  const{profiledata,setprofiledata,getprofiledata,doctoken,backendUrl}=useContext(Doctorcontext);

  const[isedit,setisedit]=useState(false);

  const updateprofile=async()=>
  {
    try
    {
      const updatedata={
        address:profiledata.address,
        fee:profiledata.fee,
        available:profiledata.available,
      }

      const res=await axios.post(backendUrl+"/api/v1/prescripto/update-doctor-profile",updatedata,{headers:{doctoken}});

      if(res.data.success)
      {
        toast.success("Updated SucccessFully");
        setisedit(false);
        getprofiledata();
      }

      else
      {
        toast.error(res.data.message);
      }
    }

    catch(error)
    {
      toast.error("Error in Updation");

      console.log("Profile"+error.message);
    }
  }

  useEffect(()=>{

    if(doctoken)
    {
      getprofiledata();
    }
  },[doctoken])

  return profiledata &&(
    <div className='doc-fet2'>
      <div className="profile-container">
       <div className='up-sec'>
        <div className='profile-image'>
          <img src={profiledata.image} className='profile-image2'/>
        </div>

        <div className='profile-details'>
          <h1>{profiledata.name}</h1>

          <div className='education-info'>
            <h3>{profiledata.degree} - {profiledata.speciality}</h3>
            <button className='experience-btn'>{profiledata.experience}</button>
          </div>

          <h3 className='appointment-fee'>Appointment Fee : <span>{isedit?<input type='number' className="custom-input" value={profiledata.fee} onChange={(e)=>setprofiledata(prev=>({...prev,fee:e.target.value}))}/>:profiledata.fee}</span></h3>

          <div className="availability">
            <input type="checkbox" onChange={()=>isedit && setprofiledata(prev=>({...prev,available:!prev.available}))}  checked={profiledata.available} id="avai" className="checkbox"/>
            <label for="avai" className="checkbox-label">
              <span className="checkbox-custom"></span>
              <h3>Available</h3>
           </label>
        </div>
      </div>
      </div>

          <div className='about-section'>
            <h2>About</h2>
            <p>{profiledata.about}</p>
          </div>

          <div className='address-section'>
            <h2>Address</h2>
            <p> {isedit?<input type='text' value={profiledata.address.line1} className='custom-input' onChange={(e)=>setprofiledata(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))}/>:profiledata.address.line1} {isedit?<br/>:<b>||</b>} {isedit?<input type="text" value={profiledata.address.line2} className='custom-input' onChange={(e)=>setprofiledata(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))}/>:profiledata.address.line2}</p>
          </div>

          

          {isedit?<button className='edit-btn' onClick={()=>updateprofile()}>Save Information</button>:<button className='edit-btn' onClick={()=>setisedit(true)}>Edit</button>}

        </div>
      </div>
  )
}

export default Doctorprofile
