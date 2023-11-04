
from flask import Flask, render_template, request, jsonify
from PIL import Image
from transformers import pipeline
from io import BytesIO

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/whodrinks.html')
def surprise():
    return render_template('whodrinks.html')


model_name = "openai/clip-vit-large-patch14"
classifier = pipeline("zero-shot-image-classification", model=model_name)

@app.route('/classify', methods=['POST'])
def classify_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided.'}), 400

    file = request.files['image']
    image = Image.open(BytesIO(file.read())).convert("RGB")
    labels_for_classification = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    result = classifier(images=image, candidate_labels=labels_for_classification)

    return jsonify(result)