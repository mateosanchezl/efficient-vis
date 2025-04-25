import { useState } from "react";
import Header from "../src/components/Header";
import ImageDisplay from "../src/components/ImageDisplay";
import PredictionDisplay from "../src/components/PredictionDisplay";
import ImageUpload from "../src/components/ImageUpload";
import NumPredictions from "../src/components/NumPredictions";
import ModelSelection from "../src/components/ModelSelection";
import ResetImageButton from "../src/components/ResetImageButton";

function Home() {
  const [predictions, setPredictions] = useState({});
  const [transformedImageFilename, setransformedImageFilename] = useState();
  const [image, setImage] = useState();
  const [imageUploaded, setImageUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [numPreds, setNumPreds] = useState(3);
  const [selectedModel, setSelectedModel] = useState("efficientnet_b0");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
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

  const handleNumPredsChange = (increment) => {
    if (increment && numPreds < 10) {
      setNumPreds(numPreds + 1);
    } else if (!increment) {
      setNumPreds(numPreds - 1);
    }
  };

  const handleModelSelect = (event) => {
    setSelectedModel(event.target.value);
  };

  return (
    <div className="relative">
      <Header selectedModel={selectedModel} />
      <div>
        <div>
          <ImageDisplay
            image={image}
            imageUploaded={imageUploaded}
            transformedImageFile={transformedImageFilename}
          />
        </div>
        <div>
          <ResetImageButton
            imageUploaded={imageUploaded}
            handleRefresh={handleRefresh}
            isLoading={isLoading}
          />
          <PredictionDisplay predictions={predictions} isLoading={isLoading} />
        </div>
      </div>
      <div>
        <ImageUpload handleFileChange={handleFileChange} imageUploaded={imageUploaded} />
        <NumPredictions value={numPreds} handleNumPredsChange={handleNumPredsChange} />
        <ModelSelection handleModelSelect={handleModelSelect} selectedModel={selectedModel} />
      </div>
    </div>
  );
}

export default Home;
