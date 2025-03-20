'use client'

import React, { useState } from 'react';
import SidePanel from '../components/Sidepanel/SidePanel'
import ContentArea from '../components/ContentArea/ContentArea';

const Dashboard: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>('Metered Readings');

  return (
    <div className="flex min-h-screen">
      <SidePanel onSelect={setSelectedSection} />
      <ContentArea selectedSection={selectedSection} />
    </div>
  );
};

export default Dashboard;