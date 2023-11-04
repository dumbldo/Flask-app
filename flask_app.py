from flask import Flask, request, jsonify, render_template
from PIL import Image
import numpy as np
from transformers import pipeline
from io import BytesIO
from hsemotion_onnx.facial_emotions import HSEmotionRecognizer
import face_recognition
import base64

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
    # Use Face Recognition to detect faces in the image
    face_locations = face_recognition.face_locations(image_np)
    # If no faces are detected, return an error
    if len(face_locations) == 0:
        return jsonify({'error': 'No faces detected.'}), 400
    # Loop through the faces and predict the emotion for each one

    emotions = []
    for i, face_location in enumerate(face_locations):
        top, right, bottom, left = face_location

        face_image = image_np[top:bottom, left:right]

        emotion, score = emotionAnalyser.predict_emotions(face_image, logits=False)

        # Convert the numpy array to a regular list for JSON serialization
        score_list = score.tolist()

        # Inside your loop where you process each face
        output_buffer = BytesIO()
        face_image_pil = Image.fromarray(face_image)
        face_image_pil.save(output_buffer, format="JPEG")  # Or PNG
        byte_data = output_buffer.getvalue()
        base64_str = base64.b64encode(byte_data).decode('utf-8')  # Convert bytes to base64 string

        emotions.append({
            'index': i + 1,
            'emotion': emotion,
            'score': score_list,
            'image_base64': base64_str  # Base64 string of the cropped face
        })

    # Return the data as JSON
    return jsonify(emotions), 200