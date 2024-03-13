import torch
import torchvision.transforms as transforms
from torchvision.models import efficientnet_v2_s, EfficientNet_V2_S_Weights
import matplotlib.image as mpimg
import matplotlib.pyplot as plt
import torchvision.transforms.functional as F
import json

def predict(img_path):
    # Defining model with pretrained weights
    model = efficientnet_v2_s(weights=EfficientNet_V2_S_Weights.IMAGENET1K_V1)

    image = mpimg.imread(img_path)
    img_tensor = torch.tensor(image)
    if img_tensor.shape[-1] > 3:
        # Discard additional channels
        img_tensor = img_tensor[..., :3]
    img_correct_shape = img_tensor.permute(2, 0, 1) # correct shape

    # transform used in training of efficientnet
    efficientnet_transforms = transforms.Compose([
        transforms.ToPILImage(),
        transforms.Resize((384, 384), interpolation=F.InterpolationMode.BILINEAR),
        transforms.CenterCrop(384),
        transforms.ToTensor(),
        transforms.Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225)),
    ])
    # transform
    transformed = efficientnet_transforms(img_correct_shape)

    model.eval()
    pred = model(transformed.unsqueeze(dim=0)) # get prediction
    result = torch.sort(pred.softmax(dim=1), descending=True) # sorted predictions after softmax
    probabilities = torch.Tensor.tolist(result.values * 100)[0] # list of probabilities
    indices_list = torch.Tensor.tolist(result.indices)[0]

    # get class label dict 
    with open("imagenet_class_index.json", "r") as f:
        class_dict = json.load(f)
    classes = ([value[1].replace("_", " ").title() for value in class_dict.values()])

    return f"EfficientNetV2 predicted {classes[indices_list[0]]} with {round(probabilities[0], 2)}% confidence."


if __name__ == '__main__':
    img_path = input("Image Path: ")
    print(predict(img_path))