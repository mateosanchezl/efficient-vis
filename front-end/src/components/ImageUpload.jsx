"use client";

function ImageUpload({ handleFileChange, imageUploaded }) {
  return (
    <div className="w-full">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-medium">Upload an image for classification</span>
        </div>
        <div
          className={`border-2 border-dashed border-base-content/20 rounded-lg p-4 text-center hover:border-primary/50 transition-colors ${
            imageUploaded ? "bg-base-300/50" : "bg-base-300"
          }`}
        >
          <input
            type="file"
            className="file-input file-input-bordered w-full hidden"
            onChange={handleFileChange}
            id="file-upload"
            accept="image/*"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center justify-center py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mb-2 text-base-content/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm text-base-content/60">
                {imageUploaded ? "Change image" : "Click to upload or drag and drop"}
              </p>
            </div>
          </label>
        </div>
      </label>
    </div>
  );
}

export default ImageUpload;
