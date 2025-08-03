from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import emoji
import re

# Correct MongoDB connection string
client = MongoClient(
    'mongodb+srv://notesuser:crodietwotwos@notes-cluster.ulgwmic.mongodb.net/?retryWrites=true&w=majority',
    tlsAllowInvalidCertificates=True
)

db = client.notesApp
notes_collection = db.notes

app = Flask(__name__)
CORS(app)

WORD_TO_EMOJI = {
    "joy": "😂",
    "heart": "❤️",
    "rofl": "🤣",
    "thumbsup": "👍",
    "cry": "😭",
    "pray": "🙏",
    "kiss": "😘",
    "hearts": "🥰",
    "loveeyes": "😍",
    "smileeyes": "😊",
    "party": "🎉",
    "grin": "😁",
    "twohearts": "💕",
    "plead": "🥺",
    "sweatgrin": "😅",
    "fire": "🔥",
    "smile": "☺️",
    "facepalm": "🤦",
    "heartsuit": "♥️",
    "shrug": "🤷",
    "eyeroll": "🙄",
    "squintgrin": "😆",
    "hug": "🤗",
    "wink": "😉",
    "cake": "🎂",
    "think": "🤔",
    "clap": "👏",
    "slightsmile": "🙂",
    "flushed": "😳",
    "partying": "🥳",
    "sunglasses": "😎",
    "ok": "👌",
    "purpleheart": "💜",
    "pensive": "😔",
    "muscle": "💪",
    "sparkles": "✨",
    "sparkheart": "💖",
    "eyes": "👀",
    "yum": "😋",
    "smirk": "😏",
    "crying": "😢",
    "pointright": "👉",
    "growheart": "💗",
    "weary": "😩",
    "100": "💯",
    "rose": "🌹",
    "revolvehearts": "💞",
    "balloon": "🎈",
    "blueheart": "💙",
    "biggrin": "😃",
    "angry": "😡",
    "bouquet": "💐",
    "winktongue": "😜",
    "seeevil": "🙈",
    "fingerscrossed": "🤞",
    "smileeyesgrin": "😄",
    "drool": "🤤",
    "raisedhands": "🙌",
    "zany": "🤪",
    "heartexclaim": "❣️",
    "grinning": "😀",
    "kissmark": "💋",
    "skull": "💀",
    "pointdown": "👇",
    "brokenheart": "💔",
    "relieved": "😌",
    "beatheart": "💓",
    "starstruck": "🤩",
    "upsidedown": "🙃",
    "grimace": "😬",
    "scream": "😱",
    "sleep": "😴",
    "handmouth": "🤭",
    "neutral": "😐",
    "sunsmile": "🌞",
    "unamused": "😒",
    "halo": "😇",
    "cherry": "🌸",
    "devil": "😈",
    "music": "🎶",
    "victory": "✌️",
    "confetti": "🎊",
    "hot": "🥵",
    "disappointed": "😞",
    "greenheart": "💚",
    "sun": "☀️",
    "blackheart": "🖤",
    "money": "💰",
    "kissclosed": "😚",
    "crown": "👑",
    "gift": "🎁",
    "boom": "💥",
    "raisehand": "🙋",
    "frown": "☹️",
    "expressionless": "😑",
    "woozy": "🥴",
    "pointleft": "👈",
    "poo": "💩",
    "check": "✅",
    "wave": "👋",
}

def replace_emoji_words(text):
    # Replace whole words only, case-insensitive
    def repl(match):
        word = match.group(0).lower()
        return WORD_TO_EMOJI.get(word, word)
    pattern = re.compile(r'\b(' + '|'.join(re.escape(k) for k in WORD_TO_EMOJI.keys()) + r')\b', re.IGNORECASE)
    return pattern.sub(repl, text)

@app.route('/notes', methods=['GET'])
def get_notes():
    notes = list(notes_collection.find({}, {"_id": 0})) 
    return jsonify(notes)

@app.route('/notes', methods=['POST'])
def add_note():
    data = request.get_json()
    content = data.get('content', '')
    content = replace_emoji_words(content)
    notes_collection.insert_one({"content": content})
    return jsonify({"msg": "Note added!"})

@app.route('/notes', methods=['DELETE'])
def delete_note():
    data = request.json
    notes_collection.delete_one({"content": data['content']})
    return jsonify({"msg": "Note deleted!"})

if __name__ == '__main__':
    app.run(debug=True)
