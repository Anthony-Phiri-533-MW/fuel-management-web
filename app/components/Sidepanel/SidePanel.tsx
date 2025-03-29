'use client'

import React from 'react';

interface SidePanelProps {
  onSelect: (section: string) => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ onSelect }) => {
  const sections = [
    'Metered Readings',
    'Credit Sales',
    'Report',
  ];

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-lg font-bold mb-4">Dashboard</h2>
      <ul>
        {sections.map((section) => (
          <li
            key={section}
            className="p-2 hover:bg-gray-700 cursor-pointer"
            onClick={() => onSelect(section)}
          >
            {section}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidePanel;