import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/nn.jpg";

function Hero() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/home");
  };

  return (
    <div
      className="hero fixed top-0 right-0 bottom-0 left-0" // Make the div cover the whole page
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover", // Ensure the background image covers the whole div
      }}
    >
      <div className="hero-overlay absolute inset-0 bg-black opacity-50"></div>
      <div className="hero-content text-center text-neutral-content relative z-10">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-white">ComVis</h1>
          <p className="mb-5 text-white">
            A simple website to test pre-trained state of the art computer
            vision models trained on ImageNet-1k on your own images.
          </p>
          <button className="btn btn-primary" onClick={navigateToHome}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
