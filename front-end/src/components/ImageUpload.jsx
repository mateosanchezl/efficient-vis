import React from "react";

function ImageUpload({ handleFileChange }) {
  return (
    <div className="form-control w-full max-w-xs">
      <label>
        <div className="label">
          <span className="label-text text-lg">Upload or drop an image</span>
        </div>
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}

export default ImageUpload;
