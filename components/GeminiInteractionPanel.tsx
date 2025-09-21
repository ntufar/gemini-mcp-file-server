
import React, { useState, useEffect } from 'react';
import type { File } from '../types';
import { analyzeFileContent } from '../services/geminiService';
import { GeminiIcon, LoadingSpinner, SparklesIcon } from './icons';

interface GeminiInteractionPanelProps {
  selectedFile: File | null;
}

const GeminiInteractionPanel: React.FC<GeminiInteractionPanelProps> = ({ selectedFile }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPrompt('');
    setResponse('');
    setError(null);
  }, [selectedFile]);

  const handleAskGemini = async () => {
    if (!selectedFile || !prompt) return;

    setIsLoading(true);
    setResponse('');
    setError(null);

    try {
      const result = await analyzeFileContent(selectedFile.content, prompt);
      setResponse(result);
    } catch (e) {
      setError('Failed to get response from Gemini. Please check your API key and try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedFile) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Select a file from the explorer to begin.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-6 bg-gray-900">
      <div className="flex-shrink-0 pb-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-gray-200">{selectedFile.name}</h2>
        <p className="text-sm text-gray-400 mt-1">File Content:</p>
        <div className="mt-2 p-4 bg-gray-800 rounded-lg max-h-48 overflow-y-auto border border-gray-700">
          <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">{selectedFile.content}</pre>
        </div>
      </div>
      
      <div className="flex-grow flex flex-col mt-4">
        <div className="flex-shrink-0">
            <h3 className="text-lg font-semibold text-gray-200 flex items-center">
                <GeminiIcon className="w-5 h-5 mr-2 text-purple-400" />
                Ask Gemini
            </h3>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`e.g., "Summarize this file" or "What is the goal of this project?"`}
                className="w-full mt-2 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-200 transition"
                rows={3}
            />
            <button
                onClick={handleAskGemini}
                disabled={isLoading || !prompt}
                className="mt-3 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
                {isLoading ? (
                    <>
                        <LoadingSpinner className="w-5 h-5 mr-2" />
                        Analyzing...
                    </>
                ) : 'Generate Analysis'}
            </button>
        </div>

        <div className="flex-grow mt-6 overflow-y-auto">
            {(isLoading || response || error) && (
                <div className="bg-gray-800/50 rounded-lg p-4 h-full">
                    <h4 className="text-md font-semibold text-gray-300 flex items-center mb-3">
                        <SparklesIcon className="w-5 h-5 mr-2 text-yellow-400"/>
                        Gemini's Response
                    </h4>
                    {error && <p className="text-red-400">{error}</p>}
                    {response && <div className="text-gray-300 whitespace-pre-wrap prose prose-invert max-w-none prose-p:my-2 prose-li:my-0">{response}</div>}
                    {isLoading && !response && <p className="text-gray-400 animate-pulse">Waiting for Gemini...</p>}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default GeminiInteractionPanel;
