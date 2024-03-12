from flask import Flask, render_template, request
import model

app = Flask(__name__)

@app.route('/', methods=['GET'])

def index():
    return render_template("index.html")

@app.route('/', methods=['POST'])
def predict():
    imagefile = request.files['imagefile']
    image_path = "./images/" + imagefile.filename
    imagefile.save(image_path)
    
    pred = model.predict(image_path)
    
    return render_template("index.html", prediction=pred)
if __name__ == "__main__":
    app.run(debug=True, port=3000)