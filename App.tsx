
import React, { useState } from 'react';
import type { File } from './types';
import FileSystemNavigator from './components/FileSystemNavigator';
import MockFileSystemNavigator from './components/MockFileSystemNavigator';
import GeminiInteractionPanel from './components/GeminiInteractionPanel';
import { FolderOpenIcon } from './components/icons';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [directoryHandle, setDirectoryHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [useMockData, setUseMockData] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectDirectory = async () => {
    if (!window.showDirectoryPicker) {
      setError("Your browser does not support the File System Access API. Please use a browser like Chrome or Edge, or use the demo file system.");
      return;
    }

    try {
      const handle = await window.showDirectoryPicker();
      setDirectoryHandle(handle);
      setUseMockData(false);
      setSelectedFile(null);
      setError(null);
    } catch (err) {
      if (err instanceof DOMException && (err.name === 'AbortError' || err.name === 'SecurityError')) {
        console.info('User cancelled directory selection or API is blocked.');
        setError('Could not access the file system. This can happen if the API is blocked (e.g., in an iframe). You can use the demo file system instead.');
      } else {
        setError('An error occurred while selecting the directory.');
        console.error(err);
      }
    }
  };

  const handleUseMockData = () => {
    setUseMockData(true);
    setDirectoryHandle(null);
    setSelectedFile(null);
    setError(null);
  };

  const handleFileSelect = async (fileHandle: FileSystemFileHandle) => {
    try {
      if ((selectedFile?.name === fileHandle.name)) {
        return;
      }
      setSelectedFile(null); // Clear previous file view while loading new one
      const file = await fileHandle.getFile();
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error("File is too large to display (max 5MB).");
      }
      
      const content = await file.text();
      setSelectedFile({ type: 'file', name: fileHandle.name, content });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      setSelectedFile({ 
        type: 'file', 
        name: fileHandle.name, 
        content: `Error reading file: ${errorMessage}\n\nThis might be a binary file or you may lack permissions.` 
      });
      console.error(e);
    }
  };
  
  const currentMode = directoryHandle ? 'real' : useMockData ? 'mock' : 'welcome';
  const directoryName = directoryHandle?.name || (useMockData ? "Demo Directory" : "");


  return (
    <div className="flex flex-col h-screen font-sans bg-gray-900 text-gray-200">
      <header className="bg-gray-800 border-b border-gray-700 p-4 shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Gemini MCP File Server
          </h1>
          <p className="text-sm text-gray-400 mt-1">
             {currentMode === 'welcome' 
              ? "Select a local directory to analyze its file content with Gemini"
              : `Analyzing files in: ${directoryName}`
            }
          </p>
        </div>
        {currentMode !== 'welcome' && (
           <div className="flex items-center gap-4">
             <button
              onClick={handleUseMockData}
              className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors flex items-center"
            >
              <FolderOpenIcon className="w-5 h-5 mr-2" />
              Load Demo
            </button>
            <button
              onClick={handleSelectDirectory}
              className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors flex items-center"
            >
              <FolderOpenIcon className="w-5 h-5 mr-2" />
              Change Directory
            </button>
          </div>
        )}
      </header>
      <main className="flex flex-1 overflow-hidden">
        {currentMode === 'welcome' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="max-w-md">
              <FolderOpenIcon className="w-16 h-16 mx-auto text-gray-600" />
              <h2 className="mt-4 text-2xl font-bold text-gray-200">Welcome</h2>
              <p className="mt-2 text-gray-400">
                To get started, select a directory from your local file system, or load a demo file system to explore the app's features.
              </p>
              {error && <p className="mt-4 text-red-400 bg-red-900/50 p-3 rounded-md">{error}</p>}
              <div className="flex justify-center gap-4 mt-6">
                 <button
                  onClick={handleSelectDirectory}
                  className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Select Directory
                </button>
                <button
                  onClick={handleUseMockData}
                  className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Load Demo
                </button>
              </div>
               <p className="mt-4 text-xs text-gray-500">
                Note: The "Select Directory" feature requires the File System Access API, best supported in modern browsers like Chrome and Edge.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="w-1/3 min-w-[300px] max-w-[500px] border-r border-gray-700 overflow-y-auto bg-gray-800/50">
              {directoryHandle ? (
                  <FileSystemNavigator 
                    directoryHandle={directoryHandle} 
                    onFileSelect={handleFileSelect} 
                    selectedFile={selectedFile} 
                  />
                ) : (
                  <MockFileSystemNavigator
                    onFileSelect={setSelectedFile}
                    selectedFile={selectedFile}
                  />
              )}
            </div>
            <div className="flex-1 overflow-y-auto">
              <GeminiInteractionPanel selectedFile={selectedFile} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
