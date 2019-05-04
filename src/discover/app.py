# Create API of ML model using flask

'''
This code takes the JSON data while POST request an performs the prediction using loaded model and returns
the results in JSON format.
'''

# Import libraries
import os
import numpy as np
from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load the model
#model = pickle.load(open('model.pkl','rb'))

@app.route('/api/model',methods=['POST'])
def predict():
    # Get the data from the POST request.
    data = request.get_json(force=True)
    count = data.get('count', 10)
    favorites = data.get('favorites', [])

    # Make prediction using model loaded from disk as per the data.
    #prediction = model.predict([[np.array(data['exp'])]])

    # Take the first value of prediction
    #output = prediction[0]
    version = os.environ.get("VERSION", "1.0")
    prediction = __import__("model" + version.replace(".", "_").replace("-", "_"))
    output = {
        "version": version,
        "data": prediction.predict(count, favorites)
    }

    return jsonify(output)

if __name__ == '__main__':
    app.run(port=5001, debug=False, host="0.0.0.0")
