
import React from 'react';
import TranscriptFetcher from './TranscriptFetcher';

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      {/* Wrapper for content to center and add padding */}
      <div className="max-w-4xl w-full p-8">
        <TranscriptFetcher />
      </div>
    </div>
  );
};

export default App;
