import React from "react";

function ImageDisplay({ image, imageUploaded }) {
  return (
    <div className="flex justify-center items-center mb-8 pt-10">
      {imageUploaded ? (
        <img src={image} alt="Image" className="w-2/5 h-2/5 object-contain" />
      ) : null}
    </div>
  );
}

export default ImageDisplay;
