'use client';

import React, { useState } from 'react';
import { useMeteredStore } from '@/utils/zStore';

interface TankData {
  open: number;
  close: number;
}

interface FormData {
  petrol: TankData[];
  diseal: TankData[];
}

const PumpForm = () => {
  const { petrol, diseal, setPetrol, setDiseal } = useMeteredStore();
  const [formData, setFormData] = useState<FormData>({
    petrol: Array(4).fill({ open: 0, close: 0 }), // 4 tanks for petrol
    diseal: Array(4).fill({ open: 0, close: 0 }), // 4 tanks for diseal
  });

  // Handle input changes for petrol and diseal tanks
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fuelType: keyof FormData, // 'petrol' or 'diseal'
    tankIndex: number, // Index of the tank (0 to 3)
    field: keyof TankData // 'open' or 'close'
  ) => {
    const value = parseFloat(e.target.value);
    setFormData((prev) => ({
      ...prev,
      [fuelType]: prev[fuelType].map((tank, index) =>
        index === tankIndex ? { ...tank, [field]: value } : tank
      ),
    }));
  };

  // Calculate the total for a given fuel type
  const calculateTotal = (fuelType: keyof FormData) => {
    return formData[fuelType].reduce((total, tank) => total + (tank.open - tank.close), 0);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalPetrol = calculateTotal('petrol');
    const totalDiseal = calculateTotal('diseal');
    setPetrol(totalPetrol);
    setDiseal(totalDiseal);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Metered Readings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Petrol Tanks */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Petrol Tanks</h3>
          {formData.petrol.map((tank, index) => (
            <div key={`petrol-tank-${index}`} className="grid grid-cols-3 gap-4 mb-2">
              <label className="col-span-1">Tank {index + 1}</label>
              <input
                type="number"
                placeholder="Open"
                value={tank.open}
                onChange={(e) => handleInputChange(e, 'petrol', index, 'open')}
                className="col-span-1 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Close"
                value={tank.close}
                onChange={(e) => handleInputChange(e, 'petrol', index, 'close')}
                className="col-span-1 p-2 border rounded"
              />
            </div>
          ))}
        </div>

        {/* Diseal Tanks */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Diseal Tanks</h3>
          {formData.diseal.map((tank, index) => (
            <div key={`diseal-tank-${index}`} className="grid grid-cols-3 gap-4 mb-2">
              <label className="col-span-1">Tank {index + 1}</label>
              <input
                type="number"
                placeholder="Open"
                value={tank.open}
                onChange={(e) => handleInputChange(e, 'diseal', index, 'open')}
                className="col-span-1 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Close"
                value={tank.close}
                onChange={(e) => handleInputChange(e, 'diseal', index, 'close')}
                className="col-span-1 p-2 border rounded"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Values
        </button>
      </form>

      {/* Display Totals */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Current Values</h3>
        <p className="text-xl">Petrol: {petrol}</p>
        <p className="text-xl">Diseal: {diseal}</p>
      </div>
    </div>
  );
};

export default PumpForm;