import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TranscriptFetcher from './TranscriptFetcher';
import About from './components/About';
import HowToUse from './components/HowtoUse';
import image1 from './assets/profilepic.png';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="rounded-3xl bg-gray-800/50 shadow-2xl border border-gray-700 overflow-hidden">
            <Routes>
              <Route 
                path="/" 
                element={
                  <div className="space-y-8 p-6">
                    <TranscriptFetcher />
                  </div>
                } 
              />
              <Route path="/about" element={<About />} />
              <Route path="/how-to-use" element={<HowToUse />} />
            </Routes>
          </div>
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="border-t border-gray-700 mt-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Creator Section */}
            <a
              href="https://www.linkedin.com/in/tarunkumariiit/" // Replace with your LinkedIn profile URL
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-green-400 p-0.5">
                <div className="w-full h-full rounded-full bg-gray-800">
                  <img
                    src={image1} // Replace with the path to your uploaded image in assets
                    alt="Creator"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="text-left">
                <p className="text-gray-300 font-medium">Created by</p>
                <p className="text-gray-400 text-sm">Tarun Kumar</p>
              </div>
            </a>

            {/* Feedback Button */}
            <a
              href="mailto:tarunkumar0011235@gmail.com" // Replace with your feedback email
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-all duration-200 group"
            >
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <span className="text-gray-300 group-hover:text-blue-400 transition-colors">
                Give Feedback
              </span>
            </a>
          </div>

          {/* Copyright Section */}
          <div className="mt-6 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} ProdYT-Player. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;