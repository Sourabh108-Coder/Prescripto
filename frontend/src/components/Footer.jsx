import React from 'react'
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa6'

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

        <p className='left-fot-para'>
          Prescripto makes healthcare simple and accessible. Book appointments
          with trusted doctors, manage your consultations, and get the care you
          need from the comfort of your home.
        </p>

        <div className='social-icons'>

            <a
              href='https://github.com/Sourabh108-Coder'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='GitHub'
            >
              <FaGithub />
            </a>

            <a
              href='https://www.linkedin.com/in/sourabh-kumar-407079267'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='LinkedIn'
            >
              <FaLinkedin />
            </a>

            <a
              href='https://thesourabh.pythonanywhere.com/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Portfolio'
            >
              <FaGlobe />
            </a>
        </div>
      </div>


      <div className='fo-li'>

        <div className='center-side-footer'>
          <p className='foot-para'><b>Company</b></p>

          <ul className='footer-list'>
            <a href = '/'><li>Home</li></a>
            <a href = '/about'><li>About Us</li></a>
            <a href = '/contact'><li>Contact Us</li></a>
            <a href = '/doctors'><li>Doctors</li></a>
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
