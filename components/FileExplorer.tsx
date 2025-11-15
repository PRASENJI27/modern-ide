
import React, { useState } from 'react';
import { ChevronDownIcon, FolderIcon, JSIcon } from './Icons';

interface FileNode {
  name: string;
  type: 'folder' | 'file';
  children?: FileNode[];
}

const fileSystem: FileNode[] = [
    {
        name: 'src',
        type: 'folder',
        children: [
          {
            name: 'components',
            type: 'folder',
            children: [
              { name: 'ActivityBar.tsx', type: 'file' },
              { name: 'AIAgentPanel.tsx', type: 'file' },
              { name: 'EditorPanel.tsx', type: 'file' },
              { name: 'FileExplorer.tsx', type: 'file' },
              { name: 'Icons.tsx', type: 'file' },
              { name: 'Sidebar.tsx', type: 'file' },
              { name: 'StatusBar.tsx', type: 'file' },
            ],
          },
          {
            name: 'services',
            type: 'folder',
            children: [{ name: 'geminiService.ts', type: 'file' }],
          },
          { name: 'App.tsx', type: 'file' },
          { name: 'index.tsx', type: 'file' },
        ],
      },
      { name: 'package.json', type: 'file' },
      { name: 'index.html', type: 'file' },
      { name: 'metadata.json', type: 'file' },
];

const FileTree: React.FC<{ node: FileNode; level: number }> = ({ node, level }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = node.type === 'folder';

  const FileIconComponent = () => {
      if (node.name.endsWith('.js') || node.name.endsWith('.ts') || node.name.endsWith('.tsx')) {
          return <JSIcon className="w-4 h-4 mr-2 flex-shrink-0" />;
      }
      // A generic file icon could go here for other file types
      return <div className="w-4 h-4 mr-2 flex-shrink-0" />
  };

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center p-1.5 rounded-md cursor-pointer text-sm
        ${isFolder ? 'hover:bg-gray-700/50' : 'hover:bg-gray-700/50 text-gray-400'}`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {isFolder ? (
          <>
            <ChevronDownIcon className={`w-4 h-4 mr-1.5 transition-transform ${isOpen ? 'rotate-0' : '-rotate-90'}`} />
            <FolderIcon className="w-4 h-4 mr-2 text-cyan-400/80" />
          </>
        ) : (
          <FileIconComponent />
        )}
        <span className="truncate">{node.name}</span>
      </div>
      {isFolder && isOpen && node.children && (
        <div>
          {node.children.map((childNode, index) => (
            <FileTree key={index} node={childNode} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileExplorer: React.FC = () => {
  return (
    <div className="p-2 text-gray-300">
      {fileSystem.map((node, index) => (
        <FileTree key={index} node={node} level={0} />
      ))}
    </div>
  );
};
