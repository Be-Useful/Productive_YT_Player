import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ChatGPTSummaryButton from './ChatGPTSummaryButton';
import { searchTranscript } from './utils/searchUtils';

const getVideoId = (url) => {
  const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regex);
  return (match && match[2].length === 11) ? match[2] : null;
};

const formatTime = (seconds) => {
  const total = Number(seconds).toFixed(2);
  const mins = Math.floor(total / 60);
  const secs = (total % 60).toFixed(2);
  return `${mins}:${String(secs).padStart(5, '0')}`;
};

function TranscriptFetcher() {
  const [videoUrl, setVideoUrl] = useState('');
  const [transcript, setTranscript] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(false);
  const [lastVideoId, setLastVideoId] = useState('');
  const playerRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoId = getVideoId(videoUrl);

  useEffect(() => {
    if (videoId && videoContainerRef.current) {
      videoContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [videoId]);

  const processTranscript = (rawTranscript) => {
    if (!rawTranscript || !Array.isArray(rawTranscript)) return [];
    
    const consolidated = [];
    let currentBatch = [];
    let currentLength = 0;
    const MAX_BATCH_SIZE = 5;
    const TARGET_LENGTH = 500;

    rawTranscript.forEach((entry) => {
      currentBatch.push(entry);
      currentLength += entry.text?.length || 0;

      if (currentBatch.length >= MAX_BATCH_SIZE || currentLength >= TARGET_LENGTH) {
        consolidated.push({
          start: parseFloat(currentBatch[0]?.start || 0).toFixed(2),
          text: currentBatch.map(e => e.text).join(' ')
        });
        currentBatch = [];
        currentLength = 0;
      }
    });

    if (currentBatch.length > 0) {
      consolidated.push({
        start: parseFloat(currentBatch[0]?.start || 0).toFixed(2),
        text: currentBatch.map(e => e.text).join(' ')
      });
    }

    return consolidated;
  };

  const fetchTranscript = async () => {
    const videoId = getVideoId(videoUrl);
    if (!videoId) {
      setError('Invalid YouTube URL');
      return;
    }

    if (videoId === lastVideoId) {
      setIsTranscriptVisible(true);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/transcript?video_id=${videoId}`);
      const processed = processTranscript(response.data);
      setTranscript(processed);
      setError('');
      setIsTranscriptVisible(true);
      setLastVideoId(videoId);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch transcript. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const getFilteredTranscript = () => {
    return searchTranscript(transcript, searchQuery);
  };

  const handleTimestampClick = (startTime) => {
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      const time = parseFloat(startTime);
      playerRef.current.seekTo(time, true);
      playerRef.current.playVideo();
    }
  };

  useEffect(() => {
    if (!videoId) return;

    const loadPlayer = () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: videoId,
        events: {
          'onReady': () => console.log('Player ready'),
          'onError': (error) => console.error('Player error:', error)
        }
      });
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = loadPlayer;
      document.body.appendChild(tag);
    } else {
      loadPlayer();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  const isValidUrl = !!videoId;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="text-center py-12 px-4 bg-gradient-to-br from-gray-900 to-gray-800 border-b border-gray-700">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-6">
          Transform YouTube Videos
            <br />
            <span className="text-gray-300">Into Searchable Knowledge</span>
          </h1>

          <div className="mb-8 flex flex-wrap justify-center gap-3 text-gray-300">
            <div className="flex items-center gap-2 bg-gray-700/30 px-4 py-2 rounded-full">
              <span className="text-blue-400">🔍</span>
              <span className="text-sm">Smart Search</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-700/30 px-4 py-2 rounded-full">
              <span className="text-green-400">⏯️</span>
              <span className="text-sm">Interactive Transcript</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-700/30 px-4 py-2 rounded-full">
              <span className="text-purple-400">✨</span>
              <span className="text-sm">AI Summaries</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <input
                type="text"
                className={`w-full bg-gray-800 text-white py-3 pl-6 pr-24 rounded-full 
                          focus:outline-none focus:ring-2 placeholder-gray-400 text-base border
                          transition-all duration-200 ${
                            videoUrl ? 
                            (isValidUrl ? 'border-green-500 hover:border-green-400' : 'border-red-500 hover:border-red-400') 
                            : 'border-gray-700 hover:border-blue-500'
                          }`}
                placeholder="Paste YouTube link here"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {videoUrl && (
                  isValidUrl ? (
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  )
                )}
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-400">
              Try example: {' '}
              <button 
                onClick={() => setVideoUrl('https://www.youtube.com/watch?v=CDZ9REOh2xA')}
                className="text-blue-400 hover:text-blue-300 cursor-pointer"
              >
                https://www.youtube.com/watch?v=CDZ9REOh2xA
              </button>
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {videoId && (
          <div ref={videoContainerRef} className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            <div className={`w-full ${isTranscriptVisible ? 'lg:w-2/3' : 'lg:w-full'} 
                          bg-gray-800 rounded-xl p-4 shadow-xl transition-all duration-300`}>
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <div id="youtube-player" className="w-full h-full" />
              </div>
            </div>

            {isTranscriptVisible ? (
              <div className="w-full lg:w-1/3 bg-gray-800 rounded-xl p-4 shadow-xl">
                <div className="space-y-4">
                <div className="flex justify-between items-center gap-4 py-2">
  {/* Back Button */}
  <button
    onClick={() => setIsTranscriptVisible(false)}
    className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700"
  >
    ← Back
  </button>

  {/* Summary Button */}
  <ChatGPTSummaryButton
    videoUrl={videoUrl}
    className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all duration-200"
  />
</div>

                  <input
                    type="text"
                    className="w-full bg-gray-700 text-white p-2 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 
                             placeholder-gray-400 text-sm"
                    placeholder="Search transcript..."
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  
                  <div className="h-96 overflow-y-auto bg-gray-700/30 rounded-lg p-3
                               scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                    {getFilteredTranscript().map((entry, index) => (
                      <div key={index} className="group py-2 px-3 hover:bg-gray-700/50 
                                                rounded-md transition-colors cursor-pointer">
                        <div className="flex items-start gap-2">
                          <span 
                            className="text-blue-400 font-mono text-xs shrink-0 pt-1 
                                     cursor-pointer hover:underline"
                            onClick={() => handleTimestampClick(entry.start)}
                          >
                            {formatTime(entry.start)}
                          </span>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {entry.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full lg:w-1/3 bg-gray-800 rounded-xl p-4 shadow-xl">
                <div className="flex flex-col gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-900/20 rounded-lg">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold">Video Insights</h3>
                    </div>
                    
                    <button
                      onClick={fetchTranscript}
                      disabled={loading}
                      className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg
                                ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-500 cursor-pointer'}
                                text-white font-medium transition-all`}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                          </svg>
                          Generate & Search Transcript
                        </>
                      )}
                    </button>
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <ChatGPTSummaryButton videoUrl={videoUrl} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-6 text-center animate-fade-in">
            <div className="inline-flex items-center bg-red-900/30 px-4 py-2 rounded-full 
                          border border-red-700/50 text-red-400 text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              {error}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default TranscriptFetcher;