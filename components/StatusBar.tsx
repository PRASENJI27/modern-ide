
import React from 'react';

export const StatusBar: React.FC = () => {
    return (
        <footer className="h-6 flex-shrink-0 bg-gray-950 border-t border-gray-800 flex items-center justify-between px-4 text-xs text-gray-500">
            <div>main</div>
            <div className="flex items-center space-x-4">
                <span>UTF-8</span>
                <span>Spaces: 2</span>
                <span>Powered by Gemini</span>
            </div>
        </footer>
    );
};
