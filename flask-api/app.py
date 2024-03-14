from flask import Flask, request
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
import model

# init app
app = Flask(__name__)
CORS(app)
    
# image upload
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
    if filename not in os.listdir('./images'):   
        file.save(image_path)
    
    return model.predict(image_path, 5)

if __name__ == '__main__':
    app.run(debug=True)