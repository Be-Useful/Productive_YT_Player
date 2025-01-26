import React from 'react';
import { FaFileAlt, FaSearch, FaRegClock } from 'react-icons/fa';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
                        Revolutionize Your YouTube Experience
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Cut through video fluff and get straight to what matters
                    </p>
                </div>

                {/* Problem Statement */}
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 mb-12 transition-all hover:border-blue-400">
                    <h2 className="text-2xl font-semibold text-blue-400 mb-4">
                        The Problem We Solve
                    </h2>
                    <p className="text-gray-300">
                        Ever wasted <span className="text-green-400 font-medium">15+ minutes</span> scrubbing through a 
                        45-minute video just to find one specific point? That ends now.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* Transcript Card */}
                    <div className="bg-gray-800/50 p-6 rounded-xl border-l-4 border-blue-400 hover:border-green-400 transition-all">
                        <div className="flex items-center gap-4 mb-4">
                            <FaFileAlt className="text-3xl text-green-400" />
                            <h3 className="text-xl font-semibold text-gray-100">Smart Transcripts</h3>
                        </div>
                        <p className="text-gray-300">
                            Click any timestamp to jump straight to that moment in the video
                        </p>
                    </div>

                    {/* Search Card */}
                    <div className="bg-gray-800/50 p-6 rounded-xl border-l-4 border-blue-400 hover:border-green-400 transition-all">
                        <div className="flex items-center gap-4 mb-4">
                            <FaSearch className="text-3xl text-green-400" />
                            <h3 className="text-xl font-semibold text-gray-100">Smart Fuzzy Search</h3>
                        </div>
                        <p className="text-gray-300">
                            Find content even if you don't remember exact words
                        </p>
                    </div>

                    {/* Summary Card */}
                    <div className="bg-gray-800/50 p-6 rounded-xl border-l-4 border-blue-400 hover:border-green-400 transition-all">
                        <div className="flex items-center gap-4 mb-4">
                            <FaRegClock className="text-3xl text-green-400" />
                            <h3 className="text-xl font-semibold text-gray-100">Instant Summaries</h3>
                        </div>
                        <p className="text-gray-300">
                            Get key points in seconds with AI-generated video summaries
                        </p>
                    </div>
                </div>

                {/* Value Proposition */}
                <div className="text-center bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
                    <h2 className="text-2xl font-semibold text-blue-400 mb-4">
                        Why Choose ProdYT-Player?
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-6 text-gray-300 mb-6">
                        <span className="py-2 px-4 bg-gray-700/50 rounded-full">⏱️ Save Time</span>
                        <span className="py-2 px-4 bg-gray-700/50 rounded-full">🎯 Stay Focused</span>
                        <span className="py-2 px-4 bg-gray-700/50 rounded-full">🚀 Boost Productivity</span>
                    </div>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Used by students, professionals, and curious learners to make YouTube work smarter for them
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;