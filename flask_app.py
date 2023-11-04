from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from PIL import Image
import numpy as np
from transformers import pipeline
from io import BytesIO
from hsemotion_onnx.facial_emotions import HSEmotionRecognizer

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/whodrinks.html')
def surprise():
    return render_template('whodrinks.html')


model_name = 'enet_b0_8_best_afew'
emotionAnalyser = HSEmotionRecognizer(model_name=model_name)

@app.route('/classify', methods=['POST'])
def classify_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided.'}), 400

    file = request.files['image']
    image = Image.open(BytesIO(file.read())).convert("RGB")
    image_np = np.array(image)
    emotion, score = emotionAnalyser.predict_emotions(image_np , logits=False)
    # Convert the numpy array to a regular list for JSON serialization
    score_list = score.tolist()

    # Create a dictionary to hold your response data
    response_data = {
        'emotion': emotion,
        'score': score_list
    }

    # Return the data as JSON
    return jsonify(response_data), 200