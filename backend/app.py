from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os
import re
from datetime import datetime

client = MongoClient(os.getenv("MONGODB_URI"), tlsAllowInvalidCertificates=True)

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
    content = replace_emoji_words(data.get('content', ''))
    note = {
        "content": content,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }
    notes_collection.insert_one(note)
    return jsonify({"message": "Note added"}), 201

@app.route('/notes', methods=['DELETE'])
def delete_note():
    data = request.json
    notes_collection.delete_one({"timestamp": data['timestamp']})
    return jsonify({"msg": "Note deleted!"})

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)

