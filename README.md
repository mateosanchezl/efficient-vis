# EfficientVis: Explore EfficientNet Models with Ease

EfficientVis, is a simple website for exploring the capabilities of EfficientNet models pre-trained on ImageNet-1k. Designed with simplicity in mind, EfficientVis offers a user-friendly platform where anyone can effortlessly test all of the available EfficientNet architectures on their own images.

![Example Prediction](/Users/mateo/efficient-vis-1 "Example Prediction")


### Key Features
- Broad Model Coverage: Experiment with the entire range of pre-trained EfficientNet and EfficientNetv2 models. From EfficientNet-B0 to EfficientNet-B7, as well as all three versions of EfficientNetV2 explore the spectrum of capabilities and differences between the models.

- Custom Prediction Counts: Specify the number of class predictions you would like to be displayed, find all ImageNet classes [here](https://deeplearning.cms.waikato.ac.nz/user-guide/class-maps/IMAGENET/).

- Image Transformation Insights: Understand exactly what the model sees by observing the modifications your images undergo before prediction.

- Normalised Predictions: EfficientVis offers a normalisation option of only the predictions shown to help you derive more indicative results.

- Local, Fast, and Secure: EfficientVis is designed to run locally, ensuring that your efficient and secure interactions.

## Getting Started

### API Setup:

1. **Install all required Python packages** by running the following command:

    ```bash
    pip install -r /flask-api/requirements.txt
    ```

2. **Then start the API** within the `flask-api` folder by executing:

    ```bash
    python app.py
    ```

### Website Setup:

1. **Ensure Node.js and `npm` are installed** on your system.

2. **While in the `front-end` folder**, run the following commands to install dependencies and start the development server:

    ```bash
    npm install
    npm run dev
    ```

### Quick Setup

For Unix systems, the `setup_project.sh` script can be used for quick setup:

**In the root project directory:**

1. **Ensure the shell script is executable** by running:

    ```bash
    chmod +x setup_project.sh
    ```

2. **Execute the script** to set up the project:

    ```bash
    ./setup_project.sh
    ```

### Note:
- When predicting wiith a model for the first time, models will be downloaded to **/Users/user/.cache/torch/hub/checkpoints/model_name.pth** from **https://download.pytorch.org/models/model_name.pth**.
- Models vary in size, with the largest being 454.6 MB. You can check each for each one [here](https://pytorch.org/vision/stable/models/efficientnet.html) and [here](https://pytorch.org/vision/stable/models/efficientnetv2.html).

## What's Next
In my desire to learn the intricacies of deep learning and visualise the magic behind neural nets, my vision is to gradually make a scalable platform where people can test and explore the capabilities of different deep learning models remotely, in computer vision and beyond.

## Acknowledgments

This project utilizes the **EfficientNet** model through its PyTorch implementation by [Luke Melas-Kyriazi](https://github.com/lukemelas/EfficientNet-PyTorch), based on the original EfficientNet models developed by Mingxing Tan and Quoc V. Le. A big thanks to the authors for their significant contributions to the field of deep learning.

### Model and Implementation
For detailed information on the model and its PyTorch implementation, visit the [EfficientNet-PyTorch GitHub repository](https://github.com/lukemelas/EfficientNet-PyTorch).

### License
This project is built upon work licensed under the Apache License 2.0. The original license can be found [here](https://github.com/lukemelas/EfficientNet-PyTorch/blob/master/LICENSE).

Your support and contributions to this project are greatly appreciated. If you find any bugs or have suggestions for improvement I would love to hear from you!


