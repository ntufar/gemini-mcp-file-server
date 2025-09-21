
import React, { useState } from 'react';
import type { File } from './types';
import { root } from './constants/fileSystemData';
import FileSystemNavigator from './components/FileSystemNavigator';
import GeminiInteractionPanel from './components/GeminiInteractionPanel';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-900 text-gray-200">
      <header className="bg-gray-800 border-b border-gray-700 p-4 shadow-md">
        <h1 className="text-xl font-bold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          Gemini MCP File Server
        </h1>
        <p className="text-sm text-gray-400 mt-1">Select a file to analyze its content with Gemini</p>
      </header>
      <main className="flex flex-1 overflow-hidden">
        <div className="w-1/3 min-w-[300px] max-w-[500px] border-r border-gray-700 overflow-y-auto bg-gray-800/50">
          <FileSystemNavigator root={root} onFileSelect={handleFileSelect} selectedFile={selectedFile} />
        </div>
        <div className="flex-1 overflow-y-auto">
          <GeminiInteractionPanel selectedFile={selectedFile} />
        </div>
      </main>
    </div>
  );
};

export default App;
