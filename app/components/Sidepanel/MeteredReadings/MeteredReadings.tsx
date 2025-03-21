import { useMeteredStore } from '@/utils/zStore';
import React from 'react';
import PumpForm from '../../Forms/PumpForm';

const MeteredReadings: React.FC = () => {
    const diseal = useMeteredStore((state) => state.diseal)
    const petrol  = useMeteredStore((state) => state.petrol)
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Metered Readings</h2>
      <p>This is the Metered Readings page.</p>
      <PumpForm />
      <h1 className='text-xl'>Petrol: {petrol}</h1>
      <h1 className='text-xl'>diseal: {diseal}</h1>
    </div>
  );
};

export default MeteredReadings;