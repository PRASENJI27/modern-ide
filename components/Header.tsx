
import React from 'react';
import { CodeIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center p-4 bg-gray-900 border-b border-gray-700/50 shadow-md z-10">
      <div className="flex items-center text-cyan-400">
        <CodeIcon className="w-8 h-8 mr-3" />
        <h1 className="text-2xl font-bold tracking-wider text-gray-100">Gemini<span className="text-cyan-400">IDE</span></h1>
      </div>
      <div className="ml-auto text-sm text-gray-500">
        AI-Powered Code Builder
      </div>
    </header>
  );
};
