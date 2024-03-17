import React from "react";
import { useState } from "react";

function ImageDisplay({ image, imageUploaded, transformedImageFile }) {
  const [showTransformed, setShowTransformed] = useState(false);

  const handleTransformClick = () => {
    setShowTransformed(!showTransformed);
  };

  return (
    <div className="flex flex-col justify-center items-center mb-8 pt-10">
      {imageUploaded ? (
        <>
          <div className="flex justify-center items-center w-80 h-80 overflow-hidden mb-2">
            <img
              src={
                showTransformed
                  ? `http://127.0.0.1:5000/images/${transformedImageFile}`
                  : image
              }
              alt="Display Image"
              className="max-w-full max-h-full object-contain" // or use object-cover based on your need
            />
          </div>
          <div
            onClick={handleTransformClick}
            className="btn btn-link text-accent text-xs w-full max-w-xs"
          >
            See what the model sees
          </div>
        </>
      ) : null}
    </div>
  );
}

export default ImageDisplay;
