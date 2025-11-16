'use client'

import React from 'react';
import PumpForm from '../../Forms/PumpForm';

const MeteredReadings: React.FC = () => {
  return (
    <div className="text-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Metered Readings</h2>
      <PumpForm />
    </div>
  );
};

export default MeteredReadings;