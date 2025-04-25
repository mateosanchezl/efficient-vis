"use client";
import { useState } from "react";

function ImageDisplay({ image, imageUploaded, transformedImageFile }) {
  const [showTransformed, setShowTransformed] = useState(false);
  const [transformedImageFilename, setTransformedImageFilename] = useState(transformedImageFile);

  const handleTransformClick = () => {
    setShowTransformed(!showTransformed);
  };

  return (
    <div className="flex flex-col items-center">
      {imageUploaded ? (
        <>
          <div className="relative w-full h-80 bg-base-300 rounded-lg overflow-hidden flex justify-center items-center">
            <img
              src={
                showTransformed ? `http://127.0.0.1:5000/images/${transformedImageFilename}` : image
              }
              alt="Display Image"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          {transformedImageFilename && (
            <button onClick={handleTransformClick} className="btn btn-sm btn-outline mt-4 w-full">
              {showTransformed ? "Show Original Image" : "Show Processed Image"}
            </button>
          )}
        </>
      ) : (
        <div className="w-full h-80 bg-base-300 rounded-lg flex justify-center items-center">
          <p className="text-base-content opacity-50">No image uploaded</p>
        </div>
      )}
    </div>
  );
}

export default ImageDisplay;
