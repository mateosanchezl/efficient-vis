import torch
import torchvision.transforms as transforms
from torchvision.models import efficientnet_v2_s, EfficientNet_V2_S_Weights
import matplotlib.image as mpimg
import matplotlib.pyplot as plt
import torchvision.transforms.functional as F
import json
from model_configs import models_config
import os 
import numpy as np

def save_transform(transformed_permute: torch.Tensor, img_path: str):   
    base, extension = os.path.splitext(img_path)
    new_path = f"{base}_t{extension}"
    min = transformed_permute.min()
    max = transformed_permute.max()
    transformed_permute_normed = (transformed_permute - min) / (max - min)
    mpimg.imsave(new_path, np.array(transformed_permute_normed))
    return os.path.basename(new_path)

def predict(img_path: str, top_n: int, model: str):
    # Defining model with pretrained weights
    model_func = models_config[model]['model_func']
    weights = models_config[model]['weights']
    resize = models_config[model]['transform_info']['resize_size']
    interpolation = models_config[model]['transform_info']['interpolation']
    central_crop = models_config[model]['transform_info']['central_crop']
    mean, std = models_config[model]['transform_info']['normalise_params']
    
    model = model_func(weights=weights)

    image = mpimg.imread(img_path)
    img_tensor = torch.tensor(image)
    if img_tensor.shape[-1] > 3:
        # Discard additional channels
        img_tensor = img_tensor[..., :3]
    img_correct_shape = img_tensor.permute(2, 0, 1) # correct shape

   # transform used in training of efficientnet
    efficientnet_transforms = transforms.Compose([
        transforms.ToPILImage(),
        transforms.Resize((resize, resize), interpolation=interpolation),
        transforms.CenterCrop(central_crop),
        transforms.ToTensor(),
        transforms.Normalize((mean), (std)),
    ])
    # transform
    transformed = efficientnet_transforms(img_correct_shape)

    # save transformed image
    transformed_image_file = save_transform(transformed.permute(1, 2, 0), img_path)
    
    model.eval()
    pred = model(transformed.unsqueeze(dim=0)) # get prediction
    result = torch.sort(pred.softmax(dim=1), descending=True) # sorted predictions after softmax
    probabilities = torch.Tensor.tolist(result.values * 100)[0] # list of probabilities
    indices_list = torch.Tensor.tolist(result.indices)[0]

    # get class label dict 
    with open("imagenet_class_index.json", "r") as f:
        class_dict = json.load(f)
    classes = ([value[1].replace("_", " ").title() for value in class_dict.values()])
    
    if top_n > 10:
        top_n = 10
        
    top_preds = [classes[indices_list[i]] for i in range(top_n)]
    top_preds_confidence = [round(probabilities[i], 2) for i in range(top_n)]
    
    json_keys = [f'prediction{i}' for i in range(top_n)]
    
    output = {key: {"prediction": pred, "confidence": conf} for key, pred, conf in zip(json_keys, top_preds, top_preds_confidence)}

    return  {"predictions": output, "transformedImageFile": transformed_image_file}


if __name__ == '__main__':
    img_path = input("Image Path: ")
    n_preds = input("Number of predictions: ")
    chosen_model = input("Model: ")
    print(predict(img_path, n_preds, chosen_model))