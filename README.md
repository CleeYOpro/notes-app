# Notes App

A simple full-stack notes app with a modern glassmorphism UI and emoji word replacement.

## Features
- Add and delete notes
- Notes are saved in MongoDB
- Type words like `joy`, `party`, or `cake` and they turn into emojis automatically
- Dark, glassy interface

## Getting Started

### Backend
1. Install dependencies:
    ```
    pip install flask flask-cors pymongo
    ```
2. Set your MongoDB URI as an environment variable:
    ```
    export MONGO_URI="your-mongodb-uri"
    ```
3. Run the backend:
    ```
    python app.py
    ```

### Frontend
1. Install dependencies:
    ```
    npm install
    ```
2. Start the frontend:
    ```
    npm start
    ```

## Usage
- Open the app in your browser.
- Type a note and press Enter or click Add.
- Words like `party` or `cake` will be replaced with emojis.
