import { useEffect, useState } from "react";
import Header from "../src/components/Header";
import ImageDisplay from "../src/components/ImageDisplay";
import PredictionDisplay from "../src/components/PredictionDisplay";
import ImageUpload from "../src/components/ImageUpload";
import NumPredictions from "../src/components/NumPredictions";
import ModelSelection from "../src/components/ModelSelection";

function Home() {
  const [predictions, setPredictions] = useState({});
  const [image, setImage] = useState();
  const [imageUploaded, setImageUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [numPreds, setNumPreds] = useState(3);
  const [selectedModel, setSelectedModel] = useState("");

  const handleFileChange = (event) => {
    setIsLoading(true);
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
    setImageUploaded(true);

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
        setPredictions(data);
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
          <ImageDisplay image={image} imageUploaded={imageUploaded} />
        </div>
        <div>
          <PredictionDisplay predictions={predictions} isLoading={isLoading} />
        </div>
      </div>
      <div>
        <ImageUpload handleFileChange={handleFileChange} />
        <NumPredictions
          value={numPreds}
          handleNumPredsChange={handleNumPredsChange}
        />
        <ModelSelection
          handleModelSelect={handleModelSelect}
          selectedModel={selectedModel}
        />
      </div>
    </div>
  );
}

export default Home;
