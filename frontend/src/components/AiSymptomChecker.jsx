import React from 'react'
import { useNavigate } from 'react-router-dom'

const AiSymptomChecker = () => {

    const navigate = useNavigate();

  return (
    <section className="ai-section">
      <div className="ai-container">

        <div className="ai-text">
          <h2>Not sure what’s wrong?</h2>
          <p>
            Use our AI-powered symptom checker to get possible causes based on your symptoms
            and find the right doctor quickly.
          </p>

          <ul>
            <li>Enter your symptoms</li>
            <li>Get instant suggestions</li>
            <li>Connect with specialists</li>
          </ul>

          <button className="ai-btn" onClick={()=>navigate("/predict")}>Try Symptom Checker</button>

          <p className="ai-note">
            <span className='star'>*</span> This is not a medical diagnosis.
          </p>
        </div>

        <div className="ai-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
            alt="AI Checker"
          />
        </div>

      </div>
    </section>
  )
}

export default AiSymptomChecker