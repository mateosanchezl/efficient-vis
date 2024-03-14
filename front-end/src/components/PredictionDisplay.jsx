import React from "react";
import Loading from "./Loading";
import { useState } from "react";

function PredictionDisplay({ predictions, isLoading }) {
  const [normalised, setNormalised] = useState(false);

  const predictionDisplay = () => {
    if (Object.keys(predictions).length > 0) {
      return (
        <>
          <p className="text-3xl">
            Model's Top {Object.keys(predictions).length} Predictions:{" "}
          </p>
          <br />
          {multiplePrediction()}
          <br />
          {!normalised ? (
            <button
              className="btn"
              onClick={() => {
                setNormalised(true);
              }}
            >
              Normalise Predictions
            </button>
          ) : (
            <button
              className="btn"
              onClick={() => {
                setNormalised(false);
              }}
            >
              Revert
            </button>
          )}
        </>
      );
    } else {
      return "Waiting for image...";
    }
  };

  const normalise = (predictions) => {
    let total = 0;
    for (const key in predictions) {
      total += predictions[key].confidence;
    }
    const normalisedPredictions = {};
    for (const key in predictions) {
      normalisedPredictions[key] = {
        ...predictions[key],
        confidence: normalised
          ? Number((predictions[key].confidence / total) * 100).toFixed(2)
          : predictions[key].confidence,
      };
    }
    return normalisedPredictions;
  };

  const multiplePrediction = () => {
    console.log("Currently normalised flag", normalised);
    console.log("Original", predictions);
    const normalisedPredictions = normalise(predictions);
    if (!normalised) {
      // console.log(predictions);
      return Object.entries(predictions).map(([key, value]) => {
        return (
          <p>
            {value.prediction} - {value.confidence}%
          </p>
        );
      });
    } else {
      // console.log(normalise(predictions));
      return Object.entries(normalisedPredictions).map(([key, value]) => {
        return (
          <p>
            {value.prediction} -{" "}
            <span
              className={
                value.confidence > 50 ? "text-green-300" : "text-orange-300"
              }
            >
              {value.confidence}%
            </span>
          </p>
        );
      });
    }
  };

  return (
    <div className="text-xl">
      {isLoading ? <Loading /> : predictionDisplay()}
    </div>
  );
}

export default PredictionDisplay;
