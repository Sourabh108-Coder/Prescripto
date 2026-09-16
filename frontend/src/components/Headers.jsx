import React from 'react'
import { FaArrowRight } from "react-icons/fa";

const Headers = () => {
  return (
    <div className='header-sec'>

      <div className='left-side'>
        <h1 className='head-heading'>Book Appointment <br/>With Trusted Doctors .</h1>

        <div className='grp-img-text'>
          <div className='group'>
            <img src='https://www.pngkit.com/png/full/50-503951_profile-circle-profile-pic-in-circle.png' className='grp'/>
            <img src='https://www.pikpng.com/pngl/b/355-3555383_circle-profile-picture-clipart.png' className='grp1'/>
            <img src='https://cdn.esquimaltmfrc.com/wp-content/uploads/2015/09/flat-faces-icons-circle-man-6-940x940.png' className='grp2'/>
          </div>
          <p className='grp-para'>Simply Browse through our extensive list of trusted doctors,<br/>schedule your appointment hassle-free</p>
        </div>

        <a href='#specialityDoc' className='anchor'>Book Appointment{<FaArrowRight className='arrow-icon'/>}</a>
      </div>

      <div className='right-side'>
        <img src='https://purepng.com/public/uploads/large/purepng.com-doctors-and-nursesdoctorsdoctors-and-nursesclinicianmedical-practitionernotepad-1421526857435avyjw.png' className='grp-doc'/>
      </div>
    </div>
  )
}

export default Headers
