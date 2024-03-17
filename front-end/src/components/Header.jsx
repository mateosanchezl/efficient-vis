import React from "react";

function Header({ selectedModel }) {
  return (
    <>
      <h1 className="text-3xl font-bold">
        EfficientNet Classification Testing
      </h1>
      {selectedModel.length > 1 ? (
        <h2 className="pt-2">
          <span className="text-accent font-extralight">{selectedModel}</span>{" "}
          currently selected
        </h2>
      ) : undefined}
    </>
  );
}

export default Header;
