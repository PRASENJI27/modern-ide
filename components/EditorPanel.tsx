
import React from 'react';
import { JSIcon } from './Icons';

interface EditorPanelProps {
  code: string;
  setCode: (code: string) => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({ code, setCode }) => {
  return (
    <div className="w-full h-full flex flex-col bg-gray-800">
      {/* File Tabs */}
      <div className="flex-shrink-0 bg-gray-900">
          <div className="inline-flex items-center p-2 px-4 border-r border-t-2 border-t-cyan-400 border-r-gray-800 bg-gray-800">
            <JSIcon className="w-4 h-4 mr-2" />
            <span className="text-sm text-gray-200">main.js</span>
          </div>
      </div>
      
      {/* Editor Textarea */}
      <div className="relative flex-1">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full p-4 bg-transparent text-gray-200 font-mono text-base resize-none focus:outline-none"
          placeholder="Write your code here..."
          spellCheck="false"
        />
      </div>
    </div>
  );
};
