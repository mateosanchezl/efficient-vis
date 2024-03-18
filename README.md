# EfficientVis: Explore EfficientNet Models with Ease

## EfficientVis, is a simple website for exploring the capabilities of EfficientNet models pre-trained on ImageNet-1k. Designed with simplicity in mind, EfficientVis offers a user-friendly platform where anyone can effortlessly test all of the available EfficientNet architectures on their own images.

### Key Features
- Broad Model Coverage: Experiment with the entire range of pre-trained EfficientNet and EfficientNetv2 models. From EfficientNet-B0 to EfficientNet-B7, as well as all three versions of EfficientNetV2 explore the spectrum of capabilities and differences between the models.

- Custom Prediction Counts: Specify the number of class predictions you would like to be displayed, find all ImageNet classes [here](https://deeplearning.cms.waikato.ac.nz/user-guide/class-maps/IMAGENET/).

- Image Transformation Insights: Understand exactly what the model sees by observing the modifications your images undergo before prediction.

- Normalised Predictions: EfficientVis offers a normalisation option of only the predictions shown to help you derive more indicative results.

- Local, Fast, and Secure: EfficientVis is designed to run locally, ensuring that your efficient and secure interactions.

### Getting Started

API: 

Install all required Python packages:
`pip install Flask werkzeug flask-cors torch torchvision matplotlib numpy`

Then start the API with inside the `flask-api` folder:
`python app.py`

Website:

Ensure Node.js and `npm` are installed.

While in the `front-end` folder, run:

`npm install`

`npm run dev`
