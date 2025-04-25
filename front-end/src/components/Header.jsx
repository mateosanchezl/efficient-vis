"use client";

import { useState, useEffect } from "react";
import { Brain, ChevronDown, Layers } from "lucide-react";

function Header({ selectedModel }) {
  const [scrolled, setScrolled] = useState(false);
  const [showModelInfo, setShowModelInfo] = useState(false);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Format model name for display
  const formatModelName = (name) => {
    return name
      .replace(/_/g, " ")
      .replace(/efficientnet/i, "EfficientNet")
      .replace(/b(\d)/i, "B$1")
      .replace(/v2/i, "V2")
      .replace(/s$/i, "S")
      .replace(/m$/i, "M")
      .replace(/l$/i, "L");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300  rounded-full  ${
        scrolled
          ? "bg-base-100/80 backdrop-blur-md shadow-md"
          : "bg-gradient-to-r from-primary to-primary-focus text-primary-content"
      }`}
    >
      <div className="container mx-auto rounded-full">
        <div className="navbar px-4 py-3">
          <div className="flex-1 gap-2">
            <div
              className={`w-10 h-10 rounded-lg grid place-items-center ${
                scrolled ? "bg-primary text-primary-content" : "bg-primary-content/10"
              }`}
            >
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Efficient<span className="font-light">Vis</span>
              </h1>
              <p
                className={`text-xs ${
                  scrolled ? "text-base-content/60" : "text-primary-content/70"
                }`}
              >
                Advanced image recognition
              </p>
            </div>
          </div>

          <div className="flex-none rounded-full">
            <div
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all ${
                scrolled
                  ? "bg-base-200 hover:bg-base-300"
                  : "bg-primary-content/10 hover:bg-primary-content/20"
              }`}
              onClick={() => setShowModelInfo(!showModelInfo)}
            >
              <Layers className="w-4 h-4" />
              <span className="text-sm font-medium">{formatModelName(selectedModel)}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${showModelInfo ? "rotate-180" : ""}`}
              />

              {/* Model info tooltip */}
              {showModelInfo && (
                <div className="absolute top-full right-0 mt-2 p-4 w-64 bg-base-100 rounded-lg shadow-xl z-10 text-base-content">
                  <h3 className="font-medium mb-1">Current Model</h3>
                  <p className="text-sm mb-2">{formatModelName(selectedModel)}</p>
                  <div className="text-xs text-base-content/70">
                    <p className="mb-1">
                      EfficientNet models are optimized for both accuracy and computational
                      efficiency.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="badge badge-primary badge-sm">Active</div>
                      <span>|</span>
                      <span>
                        Parameters:{" "}
                        {selectedModel.includes("b0")
                          ? "5.3M"
                          : selectedModel.includes("v2_l")
                          ? "118.5M"
                          : "10M+"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle divider */}
      <div className={`h-[1px] w-full ${scrolled ? "bg-base-300" : "bg-primary-content/10"}`}></div>
    </header>
  );
}

export default Header;
