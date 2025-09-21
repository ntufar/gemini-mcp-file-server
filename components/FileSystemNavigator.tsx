
import React, { useState } from 'react';
import type { Directory, File, FileSystemNode } from '../types';
import { FolderIcon, FileIcon, ChevronRightIcon, FolderOpenIcon } from './icons';

interface FileSystemNavigatorProps {
  root: Directory;
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

const FileSystemNavigator: React.FC<FileSystemNavigatorProps> = ({ root, onFileSelect, selectedFile }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-300 flex items-center">
        <FolderOpenIcon className="w-6 h-6 mr-2 text-blue-400" />
        File Explorer
      </h2>
      <DirectoryView 
        directory={root} 
        onFileSelect={onFileSelect} 
        selectedFile={selectedFile}
        depth={0}
      />
    </div>
  );
};

interface DirectoryViewProps {
  directory: Directory;
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  depth: number;
}

const DirectoryView: React.FC<DirectoryViewProps> = ({ directory, onFileSelect, selectedFile, depth }) => {
  const [isOpen, setIsOpen] = useState(depth === 0);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ paddingLeft: depth > 0 ? '1rem' : '0' }}>
      <div 
        onClick={handleToggle}
        className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-700 transition-colors"
      >
        <ChevronRightIcon className={`w-4 h-4 mr-2 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        <FolderIcon className="w-5 h-5 mr-2 text-yellow-500" />
        <span className="font-medium text-gray-300">{directory.name}</span>
      </div>
      {isOpen && (
        <div className="border-l border-gray-600 ml-3">
          {directory.children.map(node => (
            <div key={node.name} className="ml-2">
              {node.type === 'directory' ? (
                <DirectoryView 
                  directory={node} 
                  onFileSelect={onFileSelect} 
                  selectedFile={selectedFile}
                  depth={depth + 1}
                />
              ) : (
                <FileView 
                  file={node} 
                  onFileSelect={onFileSelect}
                  isSelected={selectedFile?.name === node.name && selectedFile?.content === node.content}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface FileViewProps {
    file: File;
    onFileSelect: (file: File) => void;
    isSelected: boolean;
}

const FileView: React.FC<FileViewProps> = ({ file, onFileSelect, isSelected }) => {
  return (
    <div
      onClick={() => onFileSelect(file)}
      className={`flex items-center cursor-pointer p-2 my-1 rounded-md transition-colors ${isSelected ? 'bg-blue-600/30' : 'hover:bg-gray-700'}`}
    >
      <FileIcon className="w-5 h-5 mr-2 text-gray-400" />
      <span className={`text-sm ${isSelected ? 'text-blue-300 font-semibold' : 'text-gray-300'}`}>{file.name}</span>
    </div>
  );
};

export default FileSystemNavigator;
