'use client'

import React from 'react';
import MeteredReadings from '../Sidepanel/MeteredReadings/MeteredReadings';
import CreditSales from '../Sidepanel/CreditSales/CreditSales';
import Report from '../Sidepanel/Report/Report';

interface ContentAreaProps {
  selectedSection: string;
}

const ContentArea: React.FC<ContentAreaProps> = ({ selectedSection }) => {
  // Map the selected section to its corresponding component
  const sectionComponents: { [key: string]: React.FC } = {
    'Metered Readings': MeteredReadings,
    'Credit Sales': CreditSales,
    'Report': Report,
  };

  // Get the component for the selected section
  const SectionComponent = sectionComponents[selectedSection] || (() => <p>Select a section to view content.</p>);

  return (
    <div className="flex-1 p-4 bg-gray-50 text-gray-900">
      <SectionComponent />
    </div>
  );
};

export default ContentArea;