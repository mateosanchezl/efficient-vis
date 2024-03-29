from flask import Flask, request, send_from_directory
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
import model

# init app
app = Flask(__name__)
CORS(app)

images_folder = './images'

@app.route('/')
def home():
    return "Home"


@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return {'Error': 'No image submitted'}
    file = request.files['file']
    if file.filename == '':
        return {'Error': 'Empty image file submitted'}
    filename = secure_filename(file.filename)
    image_path = os.path.join(images_folder, filename)
    if filename not in os.listdir(images_folder):   
        file.save(image_path)
    
    n_preds = request.form.get('numPreds', default=3, type=int)
    chosen_model = request.form.get('model', type=str)

    return model.predict(image_path, n_preds, chosen_model)

@app.route('/images/<filename>')
def serve_image(filename):
    return send_from_directory(images_folder, filename)


if __name__ == '__main__':
    app.run(debug=True)