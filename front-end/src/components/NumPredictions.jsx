"use client";

function NumPredictions({ value, handleNumPredsChange }) {
  return (
    <div className="card bg-base-200 shadow-md p-4">
      <h3 className="font-medium mb-3">Number of Predictions</h3>
      <div className="flex items-center justify-between">
        <button
          onClick={() => handleNumPredsChange(false)}
          className="btn btn-circle btn-sm"
          disabled={value <= 1}
        >
          -
        </button>

        <div className="flex flex-col items-center">
          <div className="badge badge-lg badge-primary">{value}</div>
          <input
            type="range"
            min="1"
            max="10"
            value={value}
            className="range range-primary range-xs mt-2"
            onChange={(e) => {
              const newValue = Number.parseInt(e.target.value);
              if (newValue > value) handleNumPredsChange(true);
              else if (newValue < value) handleNumPredsChange(false);
            }}
          />
        </div>

        <button
          onClick={() => handleNumPredsChange(true)}
          className="btn btn-circle btn-sm"
          disabled={value >= 10}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default NumPredictions;
