
import React from 'react';
import { FileIcon, SparklesIcon, SettingsIcon } from './Icons';
import { ActiveView } from '../App';

interface ActivityBarProps {
    activeView: ActiveView;
    setActiveView: (view: ActiveView) => void;
}

const ActivityBarIcon: React.FC<{
    onClick: () => void;
    isActive: boolean;
    children: React.ReactNode;
    title: string;
}> = ({ onClick, isActive, children, title }) => (
    <button
        onClick={onClick}
        title={title}
        className={`relative flex items-center justify-center w-12 h-12 transition-colors duration-200 ease-in-out focus:outline-none 
        ${isActive ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'}`}
    >
        {children}
        {isActive && <div className="absolute left-0 w-1 h-6 bg-cyan-400 rounded-r-full"></div>}
    </button>
);

export const ActivityBar: React.FC<ActivityBarProps> = ({ activeView, setActiveView }) => {
    return (
        <nav className="flex flex-col items-center py-4 bg-gray-950 border-r border-gray-800">
            <div className="flex-shrink-0 w-12 h-12 mb-4">
                 {/* Placeholder for Logo if needed */}
            </div>
            <ActivityBarIcon
                onClick={() => setActiveView('files')}
                isActive={activeView === 'files'}
                title="File Explorer"
            >
                <FileIcon className="w-6 h-6" />
            </ActivityBarIcon>
            <ActivityBarIcon
                onClick={() => setActiveView('ai')}
                isActive={activeView === 'ai'}
                title="AI Agent"
            >
                <SparklesIcon className="w-6 h-6" />
            </ActivityBarIcon>
            <div className="mt-auto">
                <ActivityBarIcon
                    onClick={() => setActiveView('settings')}
                    isActive={activeView === 'settings'}
                    title="Settings"
                >
                    <SettingsIcon className="w-6 h-6" />
                </ActivityBarIcon>
            </div>
        </nav>
    );
};
