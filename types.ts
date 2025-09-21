export interface File {
  type: 'file';
  name: string;
  content: string;
}

// Fix: Add and export the Directory interface to resolve import error.
export interface Directory {
  type: 'directory';
  name: string;
  children: (Directory | File)[];
}

// Fix: Augment the Window interface to include showDirectoryPicker for the File System Access API.
declare global {
  interface Window {
    showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
  }
}
