import React from 'react';
import { FaLink, FaFileAlt, FaSearch, FaChartLine } from 'react-icons/fa';

const HowToUse = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
                        Master ProdYT-Player in 4 Steps
                    </h1>
                    <p className="text-lg text-gray-400">
                        Transform how you consume YouTube content - faster, smarter, better
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
                    {/* Step 1 */}
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-400 transition-all group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-400/10 rounded-full">
                                <FaLink className="text-2xl text-blue-400" />
                            </div>
                            <span className="text-sm font-semibold text-gray-400">Step 1</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-100 mb-2">Paste Video Link</h3>
                        <p className="text-gray-400">
                            Copy any YouTube URL into the input field
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-400 transition-all group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-green-400/10 rounded-full">
                                <FaFileAlt className="text-2xl text-green-400" />
                            </div>
                            <span className="text-sm font-semibold text-gray-400">Step 2</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-100 mb-2">Get Transcript</h3>
                        <p className="text-gray-400">
                            Generate interactive transcript with timestamps
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-400 transition-all group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-400/10 rounded-full">
                                <FaSearch className="text-2xl text-blue-400" />
                            </div>
                            <span className="text-sm font-semibold text-gray-400">Step 3</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-100 mb-2">Find & Navigate</h3>
                        <p className="text-gray-400">
                            Search keywords and click timestamps to jump
                        </p>
                    </div>

                    {/* Step 4 */}
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-400 transition-all group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-green-400/10 rounded-full">
                                <FaChartLine className="text-2xl text-green-400" />
                            </div>
                            <span className="text-sm font-semibold text-gray-400">Step 4</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-100 mb-2">Get Summary</h3>
                        <p className="text-gray-400">
                            Generate AI summary for quick understanding
                        </p>
                    </div>
                </div>

                {/* Value Reinforcement */}
                <div className="text-center border-t border-gray-700 pt-12">
                    <h2 className="text-xl font-semibold text-gray-300 mb-4">
                        Ready to save <span className="text-green-400">Your valuable time</span> per video?
                    </h2>
                    <a 
                        href="/" 
                        className="inline-block bg-gradient-to-r from-blue-400 to-green-300 text-gray-900 px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
                    >
                        Start Now →
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HowToUse;