import { useEffect, useState } from "react";
import Header from "./components/Header";
import "./App.css";
import Loading from "./components/Loading";

function App() {
  const [prediction, setPrediction] = useState("Waiting on image...");
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
        setPrediction(data.prediction);
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        {imageUploaded ? (
          <img
            src={image}
            alt="Image"
            className="w-[50%] h-[50%] object-cover"
            style={{ objectFit: "contain" }}
          />
        ) : null}
      </div>

      <div className="pb-20">
        <div className="text-xl">{isLoading ? <Loading /> : prediction}</div>
        <label className="form-control w-full max-w-xs cent">
          <div className="label">
            <span className="label-text text-lg">Upload or drop an image</span>
          </div>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={handleFileChange}
          />
          <div className="label"></div>
        </label>
      </div>
    </div>
  );
}

export default App;
