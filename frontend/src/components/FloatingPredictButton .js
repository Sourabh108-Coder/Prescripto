import React from "react";
import { useNavigate } from "react-router-dom";

const FloatingPredictButton = () => {
  const navigate = useNavigate();

  return (
    <div
      className="floating-btn"
      onClick={() => navigate("/predict")}
      title="Check Symptoms"
    >
        
      <img
        src="https://img.freepik.com/premium-photo/animated-cute-robot-transparent-background-friendly-cheery-mini-robot-png-image_1257429-74457.jpg?w=900"
        alt="AI Assistant"
        className="robo_img"
      />
    </div>
  );
};

export default FloatingPredictButton;