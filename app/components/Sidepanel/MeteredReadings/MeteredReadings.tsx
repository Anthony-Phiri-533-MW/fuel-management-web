'use client'

import React from 'react';
import PumpForm from '../../Forms/PumpForm';

const MeteredReadings: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Metered Readings</h2>
      <p>This is the Metered Readings page.</p>
      <PumpForm />
    </div>
  );
};

export default MeteredReadings;