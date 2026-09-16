import React from 'react'

const Footer = () => {
  return (
    <div className='foot-sec'>
      <div className='left-side-footer'>
        <div className='head'>
          <img src='https://ph-test-11.slatic.net/shop/587a074da59362d0c6e821cf20fa16c2.jpeg' className='logo'/>
          <h1 className='head-heading1'>Prescripto</h1>
        </div>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a gallery of type and scrambled it to make a type specimen.</p>
      </div>

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
  )
}

export default Footer
