import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TranscriptFetcher from './TranscriptFetcher';

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
            </Routes>
          </div>
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="border-t border-gray-700 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} VideoMind. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;