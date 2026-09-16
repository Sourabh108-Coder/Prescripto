import React from 'react'
import {Link} from 'react-router-dom';
import { specialityData } from '../data'

const Doctorspeciality = () => {
  return (
    <div id='specialityDoc' className='header-low-sec'>

      <h1 className='head-low-sec-head'>Find By Speciality</h1>
      <p className='head-low-sec-para'>Simply Browse through our extensive list of trusted doctors, schedule your appointment hassle-free</p>

      <div className='data-div'>
        {
            specialityData.map((item,index)=>(

                <Link key={index} to={`/doctor/${item.speciality}`} className="no-underline">
                    <img src={item.image} className='choice-img'/>
                    <p >{item.speciality}</p>
                </Link>
            ))
        }
      </div>
    </div>
  )
}

export default Doctorspeciality


