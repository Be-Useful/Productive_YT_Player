from flask import Flask, jsonify, request
from youtube_transcript_api import YouTubeTranscriptApi
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Updated cookies (replace with your fresh cookies from YouTube)
YOUTUBE_COOKIES = [
    {
        "domain": ".youtube.com",
        "name": "CONSENT",
        "value": "YES+cb.20240201-17-p0.en+FX+700",
        "path": "/",
        "secure": True,
        "httpOnly": False
    },
    {
        "domain": ".youtube.com",
        "name": "SOCS",
        "value": "CAISNQgDEitib3ciLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYW5vbnltb3VzIiwicmVnaW9uIjoiVVMifQ.7k3Z4q",  # Replace with full value
        "path": "/",
        "secure": True,
        "httpOnly": False
    }
]

@app.route('/transcript', methods=['GET'])
def get_transcript():
    video_id = request.args.get('video_id')
    if not video_id:
        return jsonify({"error": "Video ID is required"}), 400

    logger.info(f"Request for video ID: {video_id}")

    try:
        # First try with cookies
        transcript = YouTubeTranscriptApi.get_transcript(
            video_id,
            cookies=YOUTUBE_COOKIES,
            languages=['en', 'en-US']
        )
        return jsonify(transcript)
    
    except Exception as e:
        logger.error(f"Error with cookies: {str(e)}")
        try:
            # Fallback without cookies
            transcript = YouTubeTranscriptApi.get_transcript(video_id)
            return jsonify(transcript)
        
        except Exception as fallback_error:
            logger.error(f"Fallback failed: {str(fallback_error)}")
            return jsonify({
                "error": "Could not retrieve transcript",
                "details": str(fallback_error),
                "troubleshooting": [
                    "Check if captions are enabled: https://www.youtube.com/watch?v=" + video_id,
                    "Try a different video ID (e.g., 8jPQjjsBbIc)"
                ]
            }), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)