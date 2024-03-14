import { useEffect, useState } from "react";
import Header from "../src/components/Header";
import ImageDisplay from "../src/components/ImageDisplay";
import Hero from "../src/components/Hero";
import PredictionDisplay from "../src/components/PredictionDisplay";
import ImageUpload from "../src/components/ImageUpload";

function Home() {
  const [predictions, setPredictions] = useState({});
  const [image, setImage] = useState();
  const [imageUploaded, setImageUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setIsLoading(true);
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));

    setImageUploaded(true);

    const formData = new FormData();
    formData.append("file", file);
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

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <ImageDisplay image={image} imageUploaded={imageUploaded} />
      <div className="pb-20">
        <PredictionDisplay predictions={predictions} isLoading={isLoading} />
        <ImageUpload handleFileChange={handleFileChange} />
      </div>
    </div>
  );
}

export default Home;
