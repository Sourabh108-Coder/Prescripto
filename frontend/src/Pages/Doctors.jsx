import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';

const Doctors = () => {

  const{speciality}=useParams();

  const{doctors}=useContext(AppContext);

  const[filterdoc,setfilterdoc]=useState([]);

  const navigate=useNavigate();

  const applyfilter=()=>
  {
    if(speciality)
    {
      setfilterdoc(doctors.filter(doc=>doc.speciality===speciality));
    }

    else
    {
      setfilterdoc(doctors);
    }
  }

  useEffect(()=>{

    applyfilter();

  },[doctors,speciality])

  console.log(speciality);

  return (
    <div className='doc-appo'>
      <p className='doc-para-spec'><b>Browse through the Doctors Specialist</b></p>

      <div className='sided2'>

        <div className='menu-doc'>
          <p onClick={()=>speciality==='Physician'?navigate('/doctor'):navigate('/doctor/Physician')}>General Physician</p>
          <p onClick={()=>speciality==='Gymecologist'?navigate('/doctor'):navigate('/doctor/Gymecologist')}>Gymecologist</p>
          <p onClick={()=>speciality==='Dermetologist'?navigate('/doctor'):navigate('/doctor/Dermetologist')}>Dermetologist</p>
          <p onClick={()=>speciality==='Pediatricians'?navigate('/doctor'):navigate('/doctor/Pediatricians')}>Pediatricians</p>
          <p onClick={()=>speciality==='Neurologist'?navigate('/doctor'):navigate('/doctor/Neurologist')}>Neurologist</p>
          <p onClick={()=>speciality==='Gastroenterologist'?navigate('/doctor'):navigate('/doctor/Gastroenterologist')}>Gastroenterologist</p>
        </div>

        <div className='map-doc1'>
          {
            filterdoc.map((item,index)=>(
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

      </div>
    </div>
  )
}

export default Doctors
