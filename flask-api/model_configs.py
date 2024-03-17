from torchvision import models
import torchvision.transforms.functional as F

models_config = {
    "efficientnet_b0": {"model_func": models.efficientnet_b0, 
                        "weights": models.EfficientNet_B0_Weights.DEFAULT, 
                        "transform_info": {
                            "resize_size": 256,
                            "interpolation": F.InterpolationMode.BICUBIC,
                            "central_crop": 224,
                            "normalise_params": [(0.485, 0.456, 0.406), (0.229, 0.224, 0.225)]
                        }},
    "efficientnet_b1": {"model_func": models.efficientnet_b1, 
                        "weights": models.EfficientNet_B1_Weights.DEFAULT, 
                        "transform_info": {
                            "resize_size": 256,
                            "interpolation": F.InterpolationMode.BICUBIC,
                            "central_crop": 240,
                            "normalise_params": [(0.485, 0.456, 0.406), (0.229, 0.224, 0.225)]
                        }},
    "efficientnet_b2": {"model_func": models.efficientnet_b2, 
                        "weights": models.EfficientNet_B2_Weights.DEFAULT, 
                        "transform_info": {
                            "resize_size": 288,
                            "interpolation": F.InterpolationMode.BICUBIC,
                            "central_crop": 288,
                            "normalise_params": [(0.485, 0.456, 0.406), (0.229, 0.224, 0.225)]
                        }},
    "efficientnet_b3": {"model_func": models.efficientnet_b3, 
                        "weights": models.EfficientNet_B3_Weights.DEFAULT, 
                        "transform_info": {
                            "resize_size": 320,
                            "interpolation": F.InterpolationMode.BICUBIC,
                            "central_crop": 300,
                            "normalise_params": [(0.485, 0.456, 0.406), (0.229, 0.224, 0.225)]
                        }},
    "efficientnet_b4": {"model_func": models.efficientnet_b4, 
                        "weights": models.EfficientNet_B4_Weights.DEFAULT, 
                        "transform_info": {
                            "resize_size": 384,
                            "interpolation": F.InterpolationMode.BICUBIC,
                            "central_crop": 380,
                            "normalise_params": [(0.485, 0.456, 0.406), (0.229, 0.224, 0.225)]
                        }},
    "efficientnet_b5": {"model_func": models.efficientnet_b5, 
                        "weights": models.EfficientNet_B5_Weights.DEFAULT, 
                        "transform_info": {
                            "resize_size": 456,
                            "interpolation": F.InterpolationMode.BICUBIC,
                            "central_crop": 456,
                            "normalise_params": [(0.485, 0.456, 0.406), (0.229, 0.224, 0.225)]
                        }},
    "efficientnet_b6": {"model_func": models.efficientnet_b6, 
                        "weights": models.EfficientNet_B6_Weights.DEFAULT, 
                        "transform_info": {
                            "resize_size": 528,
                            "interpolation": F.InterpolationMode.BICUBIC,
                            "central_crop": 528,
                            "normalise_params": [(0.485, 0.456, 0.406), (0.229, 0.224, 0.225)]
                        }},
    "efficientnet_b7": {"model_func": models.efficientnet_b7, 
                        "weights": models.EfficientNet_B7_Weights.DEFAULT, 
                        "transform_info": {
                            "resize_size": 600,
                            "interpolation": F.InterpolationMode.BICUBIC,
                            "central_crop": 600,
                            "normalise_params": [(0.485, 0.456, 0.406), (0.229, 0.224, 0.225)]
                        }},
    "efficientnet_v2_s": {"model_func": models.efficientnet_v2_s, 
                        "weights": models.EfficientNet_V2_S_Weights.DEFAULT, 
                        "transform_info": {
                            "resize_size": 384,
                            "interpolation": F.InterpolationMode.BILINEAR,
                            "central_crop": 384,
                            "normalise_params": [(0.485, 0.456, 0.406), (0.229, 0.224, 0.225)]
                        }},
    "efficientnet_v2_m": {"model_func": models.efficientnet_v2_m, 
                        "weights": models.EfficientNet_V2_M_Weights.DEFAULT, 
                        "transform_info": {
                            "resize_size": 480,
                            "interpolation": F.InterpolationMode.BILINEAR,
                            "central_crop": 480,
                            "normalise_params": [(0.485, 0.456, 0.406), (0.229, 0.224, 0.225)]
                        }},
    "efficientnet_v2_l": {"model_func": models.efficientnet_v2_l, 
                        "weights": models.EfficientNet_V2_L_Weights.DEFAULT, 
                        "transform_info": {
                            "resize_size": 480,
                            "interpolation": F.InterpolationMode.BICUBIC,
                            "central_crop": 480,
                            "normalise_params": [(0.5, 0.5, 0.5), (0.5, 0.5, 0.5)]
                        }},
    
}