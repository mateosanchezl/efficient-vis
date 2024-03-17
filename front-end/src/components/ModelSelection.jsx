import React from "react";

function ModelSelection({ handleModelSelect, selectedModel }) {
  const availableModels = [
    "efficientnet_b0",
    "efficientnet_b1",
    "efficientnet_b2",
    "efficientnet_b3",
    "efficientnet_b4",
    "efficientnet_b5",
    "efficientnet_b6",
    "efficientnet_b7",
    "efficientnet_v2_s",
    "efficientnet_v2_m",
    "efficientnet_v2_l",
  ];
  return (
    <select
      className="select select-bordered w-full max-w-xs"
      value={selectedModel}
      onChange={handleModelSelect}
    >
      <option disabled value="">
        Choose a model to test
      </option>
      {availableModels.map((modelName, index) => (
        <option key={index} value={modelName}>
          {modelName}
        </option>
      ))}
    </select>
  );
}

export default ModelSelection;
