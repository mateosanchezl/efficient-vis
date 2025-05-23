"use client";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function EnhancedAnalysisButton({ handleEnhancedAnalysis, isLoading }) {
  const [sparkPosition, setSparkPosition] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        setSparkPosition((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 20);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <div className="card bg-base-300 shadow-md p-4 h-full flex flex-col justify-between w-full">
      <h3 className="font-medium mb-3">Advanced Features</h3>
      <button
        className="btn btn-primary w-full relative overflow-hidden group"
        onClick={handleEnhancedAnalysis}
        disabled={isLoading}
      >
        <span className="relative z-10">
          {isLoading ? "Analyzing..." : "Get Enhanced Analysis"}
        </span>

        {/* Spark effect */}
        <div
          className="absolute w-8 h-8 bg-white/30 rounded-full blur-sm"
          style={{
            left: `${sparkPosition}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            filter: "blur(8px)",
            opacity: isLoading ? 0 : 0.6,
            transition: "opacity 0.3s",
          }}
        />

        {/* Glow trail */}
        <div
          className="absolute inset-0 opacity-25 bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            left: `${sparkPosition - 50}%`,
            width: "100%",
            opacity: isLoading ? 0 : 0.2,
            transition: "opacity 0.3s",
          }}
        />
      </button>
      <div className="text-xs text-base-content/60 mt-2">
        Get detailed AI explanation of the image content
      </div>
    </div>
  );
}

EnhancedAnalysisButton.propTypes = {
  handleEnhancedAnalysis: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default EnhancedAnalysisButton;
