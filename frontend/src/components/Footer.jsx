import React from 'react'

const Footer = () => {
  return (
    <div className='foot-sec'>

      <div className='left-side-footer'>
        <div className='head'>
          <img
            src='https://ph-test-11.slatic.net/shop/587a074da59362d0c6e821cf20fa16c2.jpeg'
            className='logo'
            alt='Prescripto Logo'
          />
          <h1 className='head-heading1'>Prescripto</h1>
        </div>

        <p>
          Prescripto makes healthcare simple and accessible. Book appointments
          with trusted doctors, manage your consultations, and get the care
          you need from the comfort of your home.
        </p>
      </div>

      <div className='fo-li'>

         <div className='center-side-footer'>
           <p className='foot-para'><b>Company</b></p>

           <ul className='footer-list'>
             <li>Home</li>
             <li>About Us</li>
             <li>Contact Us</li>
             <li>Privacy Policy</li>
           </ul>
         </div>

         <div className='right-side-footer'>
           <p className='foot-para'><b>Get In Touch</b></p>

           <ul className='footer-list'>
             <li>+1-212-456-7890</li>
             <li>Prescripto2310@gmail.com</li>
           </ul>
         </div>

      </div>

    </div>
  )
}

export default Footer
