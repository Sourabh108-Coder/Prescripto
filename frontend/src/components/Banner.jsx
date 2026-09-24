import React from 'react'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate=useNavigate();

  return (
    <div className='font-div'>
      <div className='left-side-banner'>
        <div>
            <p className='head-heading2'><b>Book Appointments</b></p>
            <p className='head-heading2 head_bot'><b>With 100+ Trusted Doctors</b></p>

            <button className='anchor' onClick={()=>navigate("/login")}>Create Account</button>
        </div>
      </div>
      <div className='right-side-banner'>
        <img src='https://www.pngarts.com/files/3/Female-Doctor-Transparent-Images.png' className='grp-doc'/>
      </div>
    </div>
  )
}

export default Banner
