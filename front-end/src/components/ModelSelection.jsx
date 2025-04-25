"use client";

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

  // Group models by family
  const modelFamilies = {
    "EfficientNet B Series": availableModels.filter((m) => m.includes("_b")),
    "EfficientNet V2 Series": availableModels.filter((m) => m.includes("_v2")),
  };

  return (
    <div className="card bg-base-300 shadow-md p-4">
      <h3 className="font-medium mb-3">Model Selection</h3>
      <select
        className="select select-bordered w-full"
        value={selectedModel}
        onChange={handleModelSelect}
      >
        {Object.entries(modelFamilies).map(([family, models]) => (
          <optgroup key={family} label={family}>
            {models.map((modelName) => (
              <option key={modelName} value={modelName}>
                {modelName.replace(/_/g, " ")}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <div className="text-xs text-base-content/60 mt-2">
        Select a model to use for classification
      </div>
    </div>
  );
}

export default ModelSelection;
