import React, { useState } from 'react';
import axios from 'axios';

function TranscriptFetcher() {
    const [videoId, setVideoId] = useState('');
    const [transcript, setTranscript] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isTranscriptVisible, setIsTranscriptVisible] = useState(false);

    const fetchTranscript = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/transcript?video_id=${videoId}`);
            setTranscript(response.data);
            setError('');
            setIsTranscriptVisible(true);
        } catch (err) {
            setError(err.response ? err.response.data.error : 'An error occurred');
        }
        setLoading(false);
    };

    const generateSummary = () => {
        alert("Summary generation functionality is under development!");
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredTranscript = transcript.filter(entry =>
        entry.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-900 flex justify-center items-center text-white p-4">
            <div className="w-full max-w-3xl bg-gray-800 rounded-xl shadow-lg p-8">
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-white">YouTube Transcript Generator</h1>
                    <p className="text-gray-400 mt-2">Fetch and summarize YouTube video transcripts with ease</p>
                </header>

                <div className="space-y-6">
                    {/* Input Section */}
                    <div className="flex flex-col items-center space-y-4">
                        <input
                            type="text"
                            className="w-full bg-gray-700 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                            placeholder="Enter YouTube Video ID"
                            value={videoId}
                            onChange={(e) => setVideoId(e.target.value)}
                        />
                        <div className="flex space-x-4">
                            <button
                                onClick={fetchTranscript}
                                disabled={loading}
                                className={`py-3 px-6 rounded-lg bg-blue-600 text-white text-lg font-medium shadow-md transition-transform transform ${
                                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                                }`}
                            >
                                {loading ? 'Fetching...' : 'Generate Transcript'}
                            </button>
                            <button
                                onClick={generateSummary}
                                className="py-3 px-6 rounded-lg bg-green-600 text-white text-lg font-medium shadow-md hover:scale-105 transition-transform"
                            >
                                Generate Summary
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-center font-semibold">{error}</p>
                    )}

                    {/* Video Preview */}
                    {videoId && (
                        <div className="mt-6">
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}`}
                                className="w-full h-64 rounded-lg shadow-md"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="YouTube Video Player"
                            ></iframe>
                        </div>
                    )}

                    {/* Transcript Section */}
                    {isTranscriptVisible && (
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-white mb-4">Transcript</h2>
                            <input
                                type="text"
                                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                                placeholder="Search in transcript..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            <div className="mt-4 space-y-2 max-h-64 overflow-y-auto bg-gray-700 p-4 rounded-lg shadow-inner">
                                {filteredTranscript.length > 0 ? (
                                    filteredTranscript.map((entry, index) => (
                                        <p key={index} className="text-gray-300">
                                            <span className="text-blue-400 font-mono">{entry.start}</span>: {entry.text}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-400 text-center">No transcript found.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TranscriptFetcher;
