import React, { useState } from 'react';
import axios from 'axios';

const ChatGPTSummaryButton = ({ videoUrl }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [transcript, setTranscript] = useState([]);
  const [lastVideoId, setLastVideoId] = useState('');

  // Helper function to extract video ID from URL
  const getVideoId = (url) => {
    const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regex);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Fetch transcript independently
  const fetchTranscript = async (videoId) => {
    try {
      setIsLoading(true);
      setError('');
      const response = await axios.get(`http://localhost:5000/transcript?video_id=${videoId}`);
      setTranscript(response.data);
      setLastVideoId(videoId); // Store the last fetched video ID
    } catch (err) {
      setError('Failed to fetch transcript. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle button click
  const handleChatGPTSummary = async () => {
    const currentVideoId = getVideoId(videoUrl);

    if (!currentVideoId) {
      setError('Invalid YouTube URL');
      return;
    }

    try {
        setError('');
        
        if (currentVideoId !== lastVideoId || transcript.length === 0) {
          setIsLoading(true);
          const response = await axios.get(`http://localhost:5000/transcript?video_id=${currentVideoId}`);
          setTranscript(response.data);
          setLastVideoId(currentVideoId);
        }
        
        // Always show popup after successful fetch or existing transcript
        setShowPopup(true);
      } catch (err) {
        setError('Failed to generate transcript. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
  

  // Handle proceed action
  const handleProceed = async () => {
    try {
      const approxDuration = transcript[transcript.length - 1].start + 10;
      const totalMinutes = Math.ceil(approxDuration / 60);

      const transcriptText = transcript
        .map((entry) => `[${new Date(entry.start * 1000).toISOString().substr(11, 8)}] ${entry.text}`)
        .join('\n');

      const bulletPoints = Math.max(3, Math.ceil(totalMinutes / 5));
      const summaryPrompt = `Please analyze this ${totalMinutes}-minute video transcript and provide:
- ${bulletPoints} key bullet points summarizing main topics
- Chapter markers with timestamps for major sections
- Key quotes/statistics mentioned
- Overall theme/conclusion

Transcript:
${transcriptText}`;

      await navigator.clipboard.writeText(summaryPrompt);
      window.open('https://chat.openai.com', '_blank');
    } catch (err) {
      alert('Error copying prompt. Please try again.');
    } finally {
      setShowPopup(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleChatGPTSummary}
        disabled={isLoading}
        className={`w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-semibold shadow-lg transition-all cursor-pointer
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-500 hover:to-blue-400 hover:scale-[1.02]'}`}
      >
        {isLoading ? '⏳ Generating Transcript...' : '📑 Generate Smart Summary'}
      </button>

      {error && (
        <p className="text-red-400 text-sm mt-2">⚠️ {error}</p>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-11/12 max-w-lg text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Caption Copied & Prompt Added 🎉
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              <span className="font-semibold">Paste</span> this in ChatGPT to get the summary.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleProceed}
                className="py-2 px-6 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-semibold hover:from-purple-500 hover:to-blue-400 transition-all cursor-pointer"
              >
                Proceed
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="py-2 px-6 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatGPTSummaryButton;