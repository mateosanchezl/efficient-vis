import React, { useState } from "react";
import Loading from "./Loading";

function PredictionDisplay({ predictions, isLoading }) {
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
      return Object.entries(predictions).map(([key, value], index) => {
        return (
          <tr>
            <th>{index + 1}</th>
            <td className="font-bold">{value.prediction}</td>
            <td>{value.confidence}%</td>
          </tr>
        );
      });
    } else {
      // console.log(normalise(predictions));
      return Object.entries(normalisedPredictions).map(
        ([key, value], index) => {
          return (
            <tr>
              <th>{index + 1}</th>
              <td className="font-bold">{value.prediction}</td>
              <td
                className={`${
                  value.confidence > 50 ? "text-green-300" : "text-orange-300"
                } font-semibold`}
              >
                {value.confidence}%
              </td>
            </tr>
          );
        }
      );
    }
  };

  return (
    <div className="text-xl mb-8">
      {isLoading ? <Loading /> : predictionDisplay()}
    </div>
  );
}

export default PredictionDisplay;
