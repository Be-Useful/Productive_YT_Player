from flask import Flask, jsonify, request
from youtube_transcript_api import YouTubeTranscriptApi
from flask_cors import CORS

app = Flask(__name__)

# Configure CORS for production
CORS(app, resources={
    r"/transcript": {
        "origins": [
            "http://localhost:3000",  # Local development
            "https://your-frontend.vercel.app"  # Production frontend URL
        ]
    }
})

@app.route('/transcript', methods=['GET'])
def get_transcript():
    video_id = request.args.get('video_id')
    if not video_id:
        return jsonify({"error": "Video ID is required"}), 400
    
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        return jsonify(transcript)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)