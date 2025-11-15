
import React, { useState, useMemo } from 'react';
import { SendIcon, CopyIcon, PlusIcon } from './Icons';

interface AIAgentPanelProps {
  onGenerate: (prompt: string) => void;
  aiResponse: string;
  isLoading: boolean;
  error: string | null;
  insertCode: (code: string) => void;
}

interface CodeBlock {
  id: number;
  code: string;
  lang: string;
}

const ResponseDisplay: React.FC<{ response: string; insertCode: (code: string) => void }> = ({ response, insertCode }) => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const codeBlocks: CodeBlock[] = useMemo(() => {
    const blocks: CodeBlock[] = [];
    const regex = /```(\w*)\n([\s\S]*?)```/g;
    let match;
    let id = 0;
    while ((match = regex.exec(response)) !== null) {
      blocks.push({ id: id++, code: match[2].trim(), lang: match[1] || 'code' });
    }
    return blocks;
  }, [response]);

  const handleCopy = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderContent = () => {
    if (!response) return null;
    
    let lastIndex = 0;
    const content = [];
    const regex = /```(\w*)\n([\s\S]*?)```/g;
    let match;
    let key = 0;
    
    while ((match = regex.exec(response)) !== null) {
      // Text before code block
      if (match.index > lastIndex) {
        content.push(
          <p key={key++} className="whitespace-pre-wrap text-gray-300">
            {response.substring(lastIndex, match.index)}
          </p>
        );
      }
      
      const code = match[2].trim();
      const lang = match[1] || 'code';
      const block = codeBlocks.find(b => b.code === code);

      if (block) {
          content.push(
            <div key={key++} className="my-4 bg-gray-900/50 rounded-lg overflow-hidden border border-gray-700/50">
              <div className="flex justify-between items-center px-4 py-2 bg-gray-800/60">
                <span className="text-xs font-semibold text-cyan-400 uppercase">{lang}</span>
                <div className="flex items-center space-x-2">
                  <button onClick={() => insertCode(code)} className="text-gray-400 hover:text-white transition-colors p-1" title="Insert into editor">
                    <PlusIcon className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleCopy(code, block.id)} className="text-gray-400 hover:text-white transition-colors p-1" title="Copy code">
                    {copiedId === block.id ? <span className="text-xs text-cyan-400">Copied!</span> : <CopyIcon className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <pre className="p-4 text-sm overflow-x-auto"><code className="font-mono">{code}</code></pre>
            </div>
          );
      }
      
      lastIndex = match.index + match[0].length;
    }
    
    // Text after the last code block
    if (lastIndex < response.length) {
      content.push(
        <p key={key++} className="whitespace-pre-wrap text-gray-300">
          {response.substring(lastIndex)}
        </p>
      );
    }
    
    return content;
  };

  return <div className="prose prose-invert max-w-none">{renderContent()}</div>;
};

export const AIAgentPanel: React.FC<AIAgentPanelProps> = ({ onGenerate, aiResponse, isLoading, error, insertCode }) => {
  const [prompt, setPrompt] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt);
    }
  };
  
  return (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading && (
           <div className="flex items-center justify-center h-full">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
           </div>
        )}
        {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-md">{error}</div>}
        {!isLoading && aiResponse && <ResponseDisplay response={aiResponse} insertCode={insertCode} />}
        {!isLoading && !aiResponse && !error && (
            <div className="text-center text-gray-500 pt-16">
                <p>Ask for code, explain a concept, or fix a bug.</p>
                <p className="text-sm mt-2">e.g., "Create a React component for a login form"</p>
            </div>
        )}
      </div>
      <div className="p-4 border-t border-gray-800 bg-gray-900">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            rows={1}
            className="flex-1 bg-gray-800 text-gray-200 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-shadow"
            placeholder="Help me with..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !prompt.trim()} className="p-3 bg-cyan-500 text-white rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-cyan-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50">
            <SendIcon className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};
