from flask import Flask, request, send_from_directory, jsonify
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
import model
from typing import Dict, Any
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# init app
app = Flask(__name__)
CORS(app)

# Configuration
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
images_folder = './images'

def allowed_file(filename: str) -> bool:
    """Check if the file extension is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_model(model_name: str) -> bool:
    """Validate if the requested model is available."""
    return model_name in model.models_config

@app.route('/')
def home():
    return "Home"

@app.route('/upload', methods=['POST'])
def upload_image():
    """
    Upload and process an image for prediction.
    
    Expected form data:
    - file: Image file (required)
    - numPreds: Number of predictions (optional, default=3)
    - model: Model name (optional, default='efficientnet_b0')
    
    Returns:
    - JSON response with predictions and transformed image file
    """
    try:
        # Validate file presence
        if 'file' not in request.files:
            return jsonify({'error': 'No image submitted'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'Empty image file submitted'}), 400
            
        # Validate file type
        if not allowed_file(file.filename):
            return jsonify({
                'error': f'Invalid file type. Allowed types: {", ".join(ALLOWED_EXTENSIONS)}'
            }), 400
            
        # Process file
        filename = secure_filename(file.filename)
        image_path = os.path.join(images_folder, filename)
        
        # Save file if it doesn't exist
        if filename not in os.listdir(images_folder):   
            file.save(image_path)
            logger.info(f"Saved new image: {filename}")
        
        # Get and validate parameters
        n_preds = request.form.get('numPreds', default=3, type=int)
        if n_preds < 1 or n_preds > 10:
            return jsonify({'error': 'numPreds must be between 1 and 10'}), 400
            
        chosen_model = request.form.get('model', default='efficientnet_b0', type=str)
        if not validate_model(chosen_model):
            return jsonify({
                'error': f'Invalid model. Available models: {", ".join(model.models_config.keys())}'
            }), 400
        
        # Get predictions
        result = model.predict(image_path, n_preds, chosen_model)
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/images/<filename>')
def serve_image(filename):
    """Serve an image file."""
    try:
        return send_from_directory(images_folder, filename)
    except Exception as e:
        logger.error(f"Error serving image {filename}: {str(e)}")
        return jsonify({'error': 'Image not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)