
import React, { useState, useCallback } from 'react';
import { EditorPanel } from './components/EditorPanel';
import { AIAgentPanel } from './components/AIAgentPanel';
import { generateCode } from './services/geminiService';
import { ActivityBar } from './components/ActivityBar';
import { Sidebar } from './components/Sidebar';
import { FileExplorer } from './components/FileExplorer';
import { StatusBar } from './components/StatusBar';

export type ActiveView = 'files' | 'ai' | 'settings';

const App: React.FC = () => {
  const [editorCode, setEditorCode] = useState<string>(`function greet(name) {\n  console.log('Hello, ' + name + '!');\n}`);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('files');

  const handleGenerate = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    setAiResponse('');
    setActiveView('ai'); // Switch to AI view when a prompt is submitted
    try {
      const response = await generateCode(prompt, editorCode);
      setAiResponse(response);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      setAiResponse('');
    } finally {
      setIsLoading(false);
    }
  };

  const insertCode = useCallback((codeToInsert: string) => {
    setEditorCode(prevCode => `${prevCode}\n\n${codeToInsert}`);
  }, []);

  const renderSidebarContent = () => {
    switch (activeView) {
      case 'files':
        return <FileExplorer />;
      case 'ai':
        return (
          <AIAgentPanel
            onGenerate={handleGenerate}
            aiResponse={aiResponse}
            isLoading={isLoading}
            error={error}
            insertCode={insertCode}
          />
        );
      case 'settings':
          return <div className="p-4 text-gray-400">Settings placeholder</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-300 font-sans">
      <div className="flex flex-1 overflow-hidden">
        <ActivityBar activeView={activeView} setActiveView={setActiveView} />
        <Sidebar title={activeView}>
          {renderSidebarContent()}
        </Sidebar>
        <main className="flex-1 flex flex-col bg-gray-800">
          <EditorPanel code={editorCode} setCode={setEditorCode} />
        </main>
      </div>
      <StatusBar />
    </div>
  );
};

export default App;
