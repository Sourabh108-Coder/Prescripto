import React, { useContext, useEffect } from 'react'
import { AppContext } from '../Context/AppContext'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Relateddoc = ({docId,speciality}) => {

    const{doctors}=useContext(AppContext);

    const[reldoc,setreldoc]=useState([]);

    const navigate=useNavigate();

    useEffect(()=>{

        if(doctors.length>0 && speciality)
        {
            const doctorsdata=doctors.filter(doc=>doc.speciality===speciality && doc._id!==docId);

            setreldoc(doctorsdata);
        }

    },[doctors,speciality,docId])


  return (
     <div className='top-doc'>
      <h1>Related Doctors To Book</h1>
      <p>Simply Browse through our extensive list of trusted Doctors.</p>

      <div className='map-doc'>
        {
            reldoc.slice(0,12).map((item,index)=>(
                <div className='disp-doc' onClick={()=>navigate(`/appointments/${item._id}`)}>
                    <img src={item.image} className='top-doc-img'/>

                    <div className='top-doc-desp'>
                    <p className={item.available?'dot':'dotu'}></p><p className={item.available?'tetu':'tetu2'}>  {item.available?'Available':'Not Available'}</p>
                    </div>

                    <p className='para para1'><b>{item.name}</b></p>
                    <p className='para'><b>{item.speciality}</b></p>
                </div>
            ))
        }
      </div>
      <button  className="more-btn" onClick={()=>{navigate("/doctor")}}>More</button>
    </div>
  )
}

export default Relateddoc
