import React from "react";
import { useState } from "react";

function ImageModification({ imageUploaded }) {
  const [showMods, setShowMods] = useState(false);

  const modsButton = () => {
    return (
      <div
        onClick={() => {
          setShowMods(!showMods);
        }}
        className="form-control btn btn-link  text-accent text-xs w-full max-w-xs pb-2"
      >
        {!showMods ? "Modify Image" : "Close"}
      </div>
    );
  };

  const modifications = () => {
    return <div> Modifications </div>;
  };

  const displayContent = () => {
    return (
      <div>
        {modsButton()} {showMods ? modifications() : null}
      </div>
    );
  };

  return imageUploaded ? displayContent() : null;
}

export default ImageModification;
