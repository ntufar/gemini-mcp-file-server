
export interface File {
  type: 'file';
  name: string;
  content: string;
}

export interface Directory {
  type: 'directory';
  name: string;
  children: (File | Directory)[];
}

export type FileSystemNode = File | Directory;
