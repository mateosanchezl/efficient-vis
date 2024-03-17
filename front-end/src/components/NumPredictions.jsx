import React from "react";

function NumPredictions({ value, handleNumPredsChange }) {
  return (
    <div className="form-control w-full max-w-xs pt-4">
      <div className="flex items-center justify-center">
        <p className="pb-5">Number of Predictions:</p>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={() => {
            handleNumPredsChange(false);
          }}
          className="btn btn-sm px-3 py-1 rounded-md btn-secondary"
        >
          -
        </button>
        <div className="px-3 py-1 bg-accent text-black rounded-md">{value}</div>
        <button
          onClick={() => {
            handleNumPredsChange(true);
          }}
          className="btn btn-sm px-3 py-1 rounded-md btn-secondary"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default NumPredictions;
