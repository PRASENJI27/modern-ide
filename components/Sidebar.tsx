
import React from 'react';

interface SidebarProps {
  title: string;
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ title, children }) => {
  return (
    <aside className="w-64 md:w-80 flex-shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="flex-shrink-0 p-3 text-gray-200 text-sm border-b border-gray-800 flex items-center h-12">
        <h2 className="font-semibold uppercase tracking-wider">{title}</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </aside>
  );
};
