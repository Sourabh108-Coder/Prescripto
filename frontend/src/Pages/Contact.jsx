import React from 'react'

const Contact = () => {
  return (
    <section className="contact-section">

      <h1 className="contact-title">Contact Us</h1>

      <div className="contact-container">

        {/* LEFT - IMAGE + INFO */}
        <div className="contact-left">
          <img 
            src="https://doutormarvin.com.br/wp-content/uploads/2023/12/capa-site-novo7.gif" 
            alt="office"
          />

          <div className="contact-info">
            <h3>Our Office</h3>
            <p className='con-pa'>
              54703 Williams Station 
              Suite 350, Washington, USA
            </p>

            <p>
              <b>Tel:</b> (415) 555-3012 <br /><br/>
              <b>Email:</b> prescripto2310@gmail.com
            </p>

            <button className="job-btn">Explore Jobs</button>
          </div>
        </div>

        {/* RIGHT - FORM */}
        <div className="contact-right">
          <h2>Send us a message</h2>

          <form className="contact-form">
            <input type="text" placeholder="Your Name" required className='con-in' />
            <input type="email" placeholder="Your Email" required className='con-in' />
            <input type="text" placeholder="Subject" className='con-in' />
            <textarea placeholder="Your Message" rows="5" required className='con-in'></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>

      </div>
    </section>
  )
}

export default Contact