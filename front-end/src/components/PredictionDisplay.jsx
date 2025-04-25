import React, { useState } from "react";
import Loading from "./Loading";
import AnimatedExplanation from "./AnimatedExplanation";

function PredictionDisplay({ predictions, isLoading, explanation }) {
  const [normalised, setNormalised] = useState(false);

  const predictionDisplay = () => {
    if (Object.keys(predictions).length > 0) {
      return (
        <>
          <p className="text-2xl font-semibold">
            Top {Object.keys(predictions).length} Predictions:{" "}
          </p>
          <br />
          <div className="">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Label</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>{multiplePrediction()}</tbody>
            </table>
          </div>
          <br />
          {!normalised ? (
            <button
              className="btn btn-accent mt-4"
              onClick={() => {
                setNormalised(true);
              }}
            >
              Normalise Predictions
            </button>
          ) : (
            <button
              className="btn btn-secondary mt-4"
              onClick={() => {
                setNormalised(false);
              }}
            >
              Revert
            </button>
          )}
          <AnimatedExplanation explanation={explanation} />
        </>
      );
    } else {
      return "Waiting for image...";
    }
  };

  const multiplePrediction = () => {
    const normalisedPredictions = normalise(predictions);
    return Object.keys(normalisedPredictions).map((key, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{normalisedPredictions[key].prediction}</td>
          <td>{normalisedPredictions[key].confidence}%</td>
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

  return (
    <div className="flex flex-col justify-center items-center mb-8">
      {isLoading ? <Loading /> : predictionDisplay()}
    </div>
  );
}

export default PredictionDisplay;
