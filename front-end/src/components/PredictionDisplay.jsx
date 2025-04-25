"use client";

import { useState } from "react";
import Loading from "./Loading";
import AnimatedExplanation from "./AnimatedExplanation";

function PredictionDisplay({ predictions, isLoading, explanation }) {
  const [normalised, setNormalised] = useState(false);

  const predictionDisplay = () => {
    if (Object.keys(predictions).length > 0) {
      return (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th className="w-12">#</th>
                  <th>Label</th>
                  <th className="text-right">Confidence</th>
                </tr>
              </thead>
              <tbody>{multiplePrediction()}</tbody>
            </table>
          </div>

          <button
            className={`btn btn-sm ${normalised ? "btn-secondary" : "btn-accent"}`}
            onClick={() => setNormalised(!normalised)}
          >
            {normalised ? "Show Raw Values" : "Normalize Values"}
          </button>

          {explanation && <AnimatedExplanation explanation={explanation} />}
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center h-40 text-base-content/60">
          <p className="text-lg">Waiting for image...</p>
          <p className="text-sm mt-2">Upload an image to see predictions</p>
        </div>
      );
    }
  };

  const multiplePrediction = () => {
    const normalisedPredictions = normalise(predictions);
    return Object.keys(normalisedPredictions).map((key, index) => {
      const confidence = Number.parseFloat(normalisedPredictions[key].confidence);
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{normalisedPredictions[key].prediction}</td>
          <td className="text-right">
            <div className="flex items-center justify-end gap-2">
              <div className="w-24 bg-base-300 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${Math.min(100, confidence)}%` }}
                ></div>
              </div>
              <span>{confidence}%</span>
            </div>
          </td>
        </tr>
      );
    });
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

  return <div className="w-full">{isLoading ? <Loading /> : predictionDisplay()}</div>;
}

export default PredictionDisplay;
