import React, { useState, useEffect } from 'react';
import type { File } from '../types';
import { FolderIcon, FileIcon, ChevronRightIcon, FolderOpenIcon, LoadingSpinner } from './icons';

interface FileSystemNavigatorProps {
  directoryHandle: FileSystemDirectoryHandle;
  onFileSelect: (fileHandle: FileSystemFileHandle) => void;
  selectedFile: File | null;
}

const FileSystemNavigator: React.FC<FileSystemNavigatorProps> = ({ directoryHandle, onFileSelect, selectedFile }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-300 flex items-center">
        <FolderOpenIcon className="w-6 h-6 mr-2 text-blue-400" />
        File Explorer
      </h2>
      <DirectoryView 
        directoryHandle={directoryHandle} 
        onFileSelect={onFileSelect} 
        selectedFile={selectedFile}
        depth={0}
      />
    </div>
  );
};

interface DirectoryViewProps {
  directoryHandle: FileSystemDirectoryHandle;
  onFileSelect: (fileHandle: FileSystemFileHandle) => void;
  selectedFile: File | null;
  depth: number;
}

const DirectoryView: React.FC<DirectoryViewProps> = ({ directoryHandle, onFileSelect, selectedFile, depth }) => {
  const [isOpen, setIsOpen] = useState(depth === 0);
  const [children, setChildren] = useState<(FileSystemDirectoryHandle | FileSystemFileHandle)[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
        setChildren([]);
        return;
    };

    let isMounted = true;
    const loadChildren = async () => {
      setIsLoading(true);
      try {
        const childEntries: (FileSystemDirectoryHandle | FileSystemFileHandle)[] = [];
        for await (const entry of directoryHandle.values()) {
          // Fix: The `entry` from `directoryHandle.values()` is of the base type `FileSystemHandle`,
          // which cannot be directly assigned to the `childEntries` array expecting the more specific
          // `FileSystemFileHandle` or `FileSystemDirectoryHandle` types. A type guard on `entry.kind`
          // is used to narrow the type and resolve the assignment error.
          if (entry.kind === 'file' || entry.kind === 'directory') {
            childEntries.push(entry);
          }
        }
        
        childEntries.sort((a, b) => {
            if (a.kind === b.kind) {
                return a.name.localeCompare(b.name);
            }
            return a.kind === 'directory' ? -1 : 1;
        });

        if (isMounted) {
            setChildren(childEntries);
        }
      } catch (e) {
        console.error('Failed to read directory contents:', e);
      } finally {
        if (isMounted) {
            setIsLoading(false);
        }
      }
    };

    loadChildren();
    
    return () => {
        isMounted = false;
    }
  }, [isOpen, directoryHandle]);

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
        <span className="font-medium text-gray-300">{directoryHandle.name}</span>
      </div>
      {isOpen && (
        <div className="border-l border-gray-600 ml-3">
          {isLoading && <div className="flex items-center p-2 text-gray-400"><LoadingSpinner className="w-4 h-4 mr-2" />Loading...</div>}
          {children.map(node => (
            <div key={node.name} className="ml-2">
              {node.kind === 'directory' ? (
                <DirectoryView 
                  directoryHandle={node} 
                  onFileSelect={onFileSelect} 
                  selectedFile={selectedFile}
                  depth={depth + 1}
                />
              ) : (
                <FileView 
                  fileHandle={node} 
                  onFileSelect={onFileSelect}
                  isSelected={selectedFile?.name === node.name}
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
    fileHandle: FileSystemFileHandle;
    onFileSelect: (fileHandle: FileSystemFileHandle) => void;
    isSelected: boolean;
}

const FileView: React.FC<FileViewProps> = ({ fileHandle, onFileSelect, isSelected }) => {
  return (
    <div
      onClick={() => onFileSelect(fileHandle)}
      className={`flex items-center cursor-pointer p-2 my-1 rounded-md transition-colors ${isSelected ? 'bg-blue-600/30' : 'hover:bg-gray-700'}`}
    >
      <FileIcon className="w-5 h-5 mr-2 text-gray-400" />
      <span className={`text-sm ${isSelected ? 'text-blue-300 font-semibold' : 'text-gray-300'}`}>{fileHandle.name}</span>
    </div>
  );
};

export default FileSystemNavigator;