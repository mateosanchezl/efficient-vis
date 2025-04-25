"use client";

import { useEffect, useState } from "react";

function AnimatedExplanation({ explanation }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!explanation) {
      setDisplayedText("");
      setIsComplete(false);
      return;
    }

    setDisplayedText("");
    setIsComplete(false);

    let index = 0;
    const timer = setInterval(() => {
      if (index < explanation.length) {
        setDisplayedText((prev) => prev + explanation.charAt(index));
        index++;
      } else {
        clearInterval(timer);
        setIsComplete(true);
      }
    }, 20); // Speed of typing animation

    return () => clearInterval(timer);
  }, [explanation]);

  if (!explanation) return null;

  return (
    <div className="mt-6">
      <div className="divider">AI Explanation</div>
      <div className="card bg-base-300 p-4 shadow-inner">
        <p className="whitespace-pre-line">
          {displayedText}
          {!isComplete && <span className="animate-pulse">|</span>}
        </p>
      </div>
    </div>
  );
}

export default AnimatedExplanation;
