import React from "react";
import resetIcon from "../assets/refresh.png";

function ResetImageButton({ imageUploaded, isLoading, handleRefresh }) {
  return imageUploaded && !isLoading ? (
    <button className="pb-6" onClick={handleRefresh}>
      <img src={resetIcon} width={20} height={20} />
    </button>
  ) : null;
}

export default ResetImageButton;
