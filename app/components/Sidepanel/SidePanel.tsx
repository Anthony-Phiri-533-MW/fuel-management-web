'use client'

import React, { useState } from 'react';
import { logout } from '@/app/logout/actions';

interface SidePanelProps {
  onSelect: (section: string) => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ onSelect }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const sections = [
    'Metered Readings',
    'Credit Sales',
    'Report',
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="w-64 bg-gray-800 text-white p-4 flex flex-col h-screen">
      <div className="flex-1">
        <h2 className="text-lg font-bold mb-4">Dashboard</h2>
        <ul>
          {sections.map((section) => (
            <li
              key={section}
              className="p-2 hover:bg-gray-700 cursor-pointer rounded transition-colors"
              onClick={() => onSelect(section)}
            >
              {section}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full p-2 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded transition-colors flex items-center justify-center gap-2"
        >
          {isLoggingOut ? (
            <>
              <svg 
                className="animate-spin w-4 h-4" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Logging out...
            </>
          ) : (
            <>
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
              Logout
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SidePanel;