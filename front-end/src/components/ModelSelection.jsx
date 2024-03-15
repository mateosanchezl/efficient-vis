import React from "react";

function ModelSelection({ handleModelSelect, selectedModel }) {
  return (
    <select
      className="select select-bordered w-full max-w-xs"
      value={selectedModel}
      onChange={handleModelSelect}
    >
      <option disabled value="">
        Choose a model to test
      </option>
      <option value="efficientnet_v2_s">EfficientNetv2S</option>
      <option value="alexnet">AlexNet</option>
    </select>
  );
}

export default ModelSelection;
