from flask import Flask, jsonify, request
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import TranscriptsDisabled, NoTranscriptFound
from flask_cors import CORS
import os
import logging

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)

@app.route('/transcript', methods=['GET'])
def get_transcript():
    video_id = request.args.get('video_id')
    if not video_id:
        return jsonify({"error": "Video ID is required"}), 400
    
    try:
        app.logger.info(f"Fetching transcript for video: {video_id}")
        transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=['en'])
        return jsonify(transcript)
    except TranscriptsDisabled:
        app.logger.error("Subtitles disabled for this video")
        return jsonify({"error": "Subtitles are disabled for this video"}), 400
    except NoTranscriptFound:
        app.logger.error("No English transcript found")
        return jsonify({"error": "No English transcript found"}), 400
    except Exception as e:
        app.logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)