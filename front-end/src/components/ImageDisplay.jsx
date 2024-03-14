import React from "react";

function ImageDisplay({ image, imageUploaded }) {
  return (
    <div className="flex-grow flex items-center justify-center">
      {imageUploaded ? (
        <img
          src={image}
          alt="Image"
          className="w-[75%] h-[75%] object-cover"
          style={{ objectFit: "contain" }}
        />
      ) : null}
    </div>
  );
}

export default ImageDisplay;
