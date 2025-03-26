'use client';

import React, { useState } from 'react';
import { useMeteredStore } from '@/utils/zStore';

interface PumpData {
  meterDifference: number;
}

interface FormData {
  petrol: PumpData[];
  diseal: PumpData[];
}

interface StockData {
  petrolClosing: number;
  disealClosing: number;
  petrolReceipts: number;
  disealReceipts: number;
}

const PumpForm = () => {
  // const { petrol, diseal, setPetrol, setDiseal } = useMeteredStore();
  const { setPetrol, setDiseal } = useMeteredStore();
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [prices, setPrices] = useState({
    petrol: 0,
    diseal: 0,
  });
  const [stocks, setStocks] = useState<StockData>({
    petrolClosing: 0,
    disealClosing: 0,
    petrolReceipts: 0,
    disealReceipts: 0
  });
  
  const [formData, setFormData] = useState<FormData>({
    petrol: Array(4).fill({ meterDifference: 0 }),
    diseal: Array(4).fill({ meterDifference: 0 }),
  });

  const handlePumpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fuelType: keyof FormData,
    pumpIndex: number
  ) => {
    const value = parseFloat(e.target.value) || 0;
    setFormData(prev => ({
      ...prev,
      [fuelType]: prev[fuelType].map((pump, idx) => 
        idx === pumpIndex ? { ...pump, meterDifference: value } : pump
      ),
    }));
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof StockData) => {
    setStocks(prev => ({
      ...prev,
      [field]: parseFloat(e.target.value) || 0
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, fuelType: keyof typeof prices) => {
    setPrices(prev => ({
      ...prev,
      [fuelType]: parseFloat(e.target.value) || 0
    }));
  };

  const calculateSales = (fuelType: keyof FormData) => {
    return formData[fuelType].reduce((total, pump) => {
      return total + (pump.meterDifference * prices[fuelType]);
    }, 0);
  };

  const calculateTotalVolume = (fuelType: keyof FormData) => {
    return formData[fuelType].reduce((total, pump) => {
      return total + pump.meterDifference;
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalPetrol = calculateTotalVolume('petrol');
    const totalDiseal = calculateTotalVolume('diseal');
    setPetrol(totalPetrol);
    setDiseal(totalDiseal);
  };

  const totalPetrolSales = calculateSales('petrol');
  const totalDisealSales = calculateSales('diseal');

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Metered Readings</h2>
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Petrol Price</label>
            <input
              type="number"
              value={prices.petrol}
              onChange={(e) => handlePriceChange(e, 'petrol')}
              className="p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Diseal Price</label>
            <input
              type="number"
              value={prices.diseal}
              onChange={(e) => handlePriceChange(e, 'diseal')}
              className="p-2 border rounded"
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Petrol Section */}
        <div className="flex gap-6">
          <div className="flex-1 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Petrol Pumps</h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
              {formData.petrol.map((pump, index) => (
                <div key={`petrol-pump-${index}`}>
                  <label className="block text-sm font-medium">Pump {index + 1} Diff</label>
                  <input
                    type="number"
                    value={pump.meterDifference}
                    onChange={(e) => handlePumpChange(e, 'petrol', index)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-64 bg-gray-100 p-4 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium">Petrol Closing Stock</label>
              <input
                type="number"
                value={stocks.petrolClosing}
                onChange={(e) => handleStockChange(e, 'petrolClosing')}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Petrol Receipts</label>
              <input
                type="number"
                value={stocks.petrolReceipts}
                onChange={(e) => handleStockChange(e, 'petrolReceipts')}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
          </div>
        </div>

        {/* Diseal Section */}
        <div className="flex gap-6">
          <div className="flex-1 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Diseal Pumps</h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
              {formData.diseal.map((pump, index) => (
                <div key={`diseal-pump-${index}`}>
                  <label className="block text-sm font-medium">Pump {index + 1} Diff</label>
                  <input
                    type="number"
                    value={pump.meterDifference}
                    onChange={(e) => handlePumpChange(e, 'diseal', index)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-64 bg-gray-100 p-4 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium">Diseal Closing Stock</label>
              <input
                type="number"
                value={stocks.disealClosing}
                onChange={(e) => handleStockChange(e, 'disealClosing')}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Diseal Receipts</label>
              <input
                type="number"
                value={stocks.disealReceipts}
                onChange={(e) => handleStockChange(e, 'disealReceipts')}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
          </div>
        </div>

        {/* Sales Summary */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Sales Summary</h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xl">Petrol Sales: {totalPetrolSales.toFixed(2)}</p>
              <p>Total Volume: {calculateTotalVolume('petrol')}</p>
            </div>
            <div>
              <p className="text-xl">Diseal Sales: {totalDisealSales.toFixed(2)}</p>
              <p>Total Volume: {calculateTotalVolume('diseal')}</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Readings
        </button>
      </form>
    </div>
  );
};

export default PumpForm;