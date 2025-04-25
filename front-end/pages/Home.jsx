"use client";

import { useState } from "react";
import Header from "../src/components/Header";
import ImageDisplay from "../src/components/ImageDisplay";
import PredictionDisplay from "../src/components/PredictionDisplay";
import ImageUpload from "../src/components/ImageUpload";
import NumPredictions from "../src/components/NumPredictions";
import ModelSelection from "../src/components/ModelSelection";
import ResetImageButton from "../src/components/ResetImageButton";
import EnhancedAnalysisButton from "../src/components/EnhancedAnalysisButton";

function Home() {
  const [predictions, setPredictions] = useState({});
  const [transformedImageFilename, setransformedImageFilename] = useState();
  const [image, setImage] = useState();
  const [imageUploaded, setImageUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [numPreds, setNumPreds] = useState(3);
  const [selectedModel, setSelectedModel] = useState("efficientnet_b0");
  const [file, setFile] = useState(null);
  const [explanation, setExplanation] = useState("");

  const handleFileChange = (event) => {
    setExplanation("");
    setIsLoading(true);
    const uploadedFile = event.target.files[0];

    if (!uploadedFile) {
      setIsLoading(false);
      return;
    }

    setFile(uploadedFile);
    console.log(uploadedFile);
    setImage(URL.createObjectURL(uploadedFile));
    setImageUploaded(true);
    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("numPreds", numPreds);
    formData.append("model", selectedModel);
    fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setPredictions(data.predictions);
        setransformedImageFilename(data.transformedImageFile);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const handleRefresh = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("numPreds", numPreds);
    formData.append("model", selectedModel);
    console.log(formData);
    fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setPredictions(data.predictions);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const handleEnhancedAnalysis = () => {
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("numPreds", numPreds);
    formData.append("model", selectedModel);

    fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setPredictions(data.predictions);
        setransformedImageFilename(data.transformedImageFile);
        setExplanation(data.explanation);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleNumPredsChange = (increment) => {
    if (increment && numPreds < 10) {
      setNumPreds(numPreds + 1);
    } else if (!increment && numPreds > 1) {
      setNumPreds(numPreds - 1);
    }
  };

  const handleModelSelect = (event) => {
    setSelectedModel(event.target.value);
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Header selectedModel={selectedModel} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card bg-base-200 shadow-xl p-6">
            <ImageDisplay
              image={image}
              imageUploaded={imageUploaded}
              transformedImageFile={transformedImageFilename}
            />
            <div className="mt-4">
              <ImageUpload handleFileChange={handleFileChange} imageUploaded={imageUploaded} />
            </div>
          </div>
          <div className="flex items-end mt-4 w-full">
            {imageUploaded && (
              <EnhancedAnalysisButton
                handleEnhancedAnalysis={handleEnhancedAnalysis}
                isLoading={isLoading}
              />
            )}
          </div>

          <div className="card bg-base-200 shadow-xl p-6 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Results</h2>
              <ResetImageButton
                imageUploaded={imageUploaded}
                handleRefresh={handleRefresh}
                isLoading={isLoading}
              />
            </div>
            <PredictionDisplay
              predictions={predictions}
              isLoading={isLoading}
              explanation={explanation}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <NumPredictions value={numPreds} handleNumPredsChange={handleNumPredsChange} />
          <div className="mt-4">
            <ModelSelection handleModelSelect={handleModelSelect} selectedModel={selectedModel} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
