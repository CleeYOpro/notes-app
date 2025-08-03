from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

# Correct MongoDB connection string
client = MongoClient(
    'mongodb+srv://notesuser:crodietwotwos@notes-cluster.ulgwmic.mongodb.net/?retryWrites=true&w=majority',
    tlsAllowInvalidCertificates=True
)

db = client.notesApp
notes_collection = db.notes

app = Flask(__name__)
CORS(app)

@app.route('/notes', methods=['GET'])
def get_notes():
    notes = list(notes_collection.find({}, {"_id": 0})) 
    return jsonify(notes)

@app.route('/notes', methods=['POST'])
def add_note():
    data = request.json
    notes_collection.insert_one({"content": data['content']})
    return jsonify({"msg": "Note added!"})

@app.route('/notes', methods=['DELETE'])
def delete_note():
    data = request.json
    notes_collection.delete_one({"content": data['content']})
    return jsonify({"msg": "Note deleted!"})

if __name__ == '__main__':
    app.run(debug=True)
