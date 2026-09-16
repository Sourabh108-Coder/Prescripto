import React from 'react'
import { TbEyeStar } from "react-icons/tb";
import { GiHealthPotion } from "react-icons/gi";

const About = () => {
  return (
    <div className='about-page'>
      
        <h1 className='ab-he'>ABOUT US</h1>
      

      <div  className='appo-doc-page'>

              <div className='doc-img-det'>
                 <img src='https://cdnl.iconscout.com/lottie/premium/thumb/doctor-doing-corona-test-of-girl-5010064-4171914.gif' className='choice-img1'/>
              </div>

              <div className='full-doc-detail'>
                <p>Welcome to Prescripto ,  your trusted partner in managing your healthcare needs conveniently and effeciently. At Prescripto , we understand the credentials and helps you to  face when it comes to scheduling doctor appointments and managing their health records.</p>
                <p>Prescripto is committed to excellence in healthcare technology. We continously strive to enhance our platform,integrating the latest advancements to imporve our user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care , Prescripto is here to support you every step of the way.</p>
                <b><h2>Our Vision<TbEyeStar className='vision-icon'/></h2></b>
                <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
                <b className='hashtags'> <GiHealthPotion className='health-dil'/> #Stay Blessed #Stay Calm #Be Healthy #Be Nourished <GiHealthPotion className='health-dil'/></b>
              </div>
      </div>

      <div className='choose-us'>
        <p><h3>WHY <span className='choco'>  CHOOSE US</span></h3></p>
      </div>

      <div className='three'>
        <div className='ott1'>
          <b>Efficiency</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='ott'>
          <b>Convenience</b>
          <p>Access to a network of trusted healthcare professional in your area.</p>
        </div>
        <div className='ott'>
          <b>Persnolization</b>
          <p>Tailored recommendations and reminders to help you to stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About
