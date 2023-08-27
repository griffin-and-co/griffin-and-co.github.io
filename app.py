from flask import Flask, request, jsonify
from keras.models import load_model
import numpy as np
from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__)

@app.route('/<path:path>')
def send_static(path):
    return send_from_directory('.', path)


model = load_model('vae_better_players_all_years.keras')  # Load your Keras model here


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    inputs = [
        data['rave_yards'],
        data['rave_targets'],
        data['rave_deep_targets'],
        data['total_line'],
        data['favored_by'],
        data['rave_offense_pct'],
        data['rave_first_downs']
    ]

    # Preprocess the inputs if necessary
    inputs = np.array(inputs).reshape(1, -1)

    # Make prediction using the loaded model
    prediction = model.predict(inputs)

    response = {'output': float(prediction[0][0])}
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
