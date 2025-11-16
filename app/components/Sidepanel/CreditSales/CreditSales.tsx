'use client'

import React, { useState } from 'react';
import { useMeteredStore } from '@/utils/zStore';

interface CreditSale {
  id: string;
  customerName: string;
  fuelType: 'petrol' | 'diseal';
  quantity: number;
  price: number;
  total: number;
  date: string;
  notes?: string;
}

const CreditSales: React.FC = () => {
  const { creditSales, addCreditSale, removeCreditSale } = useMeteredStore();
  const [formData, setFormData] = useState({
    customerName: '',
    fuelType: 'petrol' as 'petrol' | 'diseal',
    quantity: 0,
    price: 0,
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = formData.quantity * formData.price;
    const newSale: CreditSale = {
      id: Date.now().toString(),
      ...formData,
      total,
    };
    addCreditSale(newSale);
    // Reset form
    setFormData({
      customerName: '',
      fuelType: 'petrol',
      quantity: 0,
      price: 0,
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });
  };

  const handleDelete = (id: string) => {
    removeCreditSale(id);
  };

  const totalSales = creditSales.reduce((sum, sale) => sum + sale.total, 0);

  return (
    <div className="text-gray-900">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Credit Sales</h2>
      
      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Add Credit Sale</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name
              </label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                required
                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                placeholder="Enter customer name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fuel Type
              </label>
              <select
                value={formData.fuelType}
                onChange={(e) => setFormData({ ...formData, fuelType: e.target.value as 'petrol' | 'diseal' })}
                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
              >
                <option value="petrol">Petrol</option>
                <option value="diseal">Diesel</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity (Liters)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) || 0 })}
                required
                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price per Liter
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                required
                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                placeholder="Additional notes"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-600">
              Total: <span className="font-semibold text-gray-900">{(formData.quantity * formData.price).toFixed(2)}</span>
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Add Credit Sale
          </button>
        </form>
      </div>

      {/* Sales List */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Credit Sales List</h3>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Sales</p>
            <p className="text-2xl font-bold text-gray-900">{totalSales.toFixed(2)}</p>
          </div>
        </div>

        {creditSales.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No credit sales recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-2 text-gray-700">Date</th>
                  <th className="text-left p-2 text-gray-700">Customer</th>
                  <th className="text-left p-2 text-gray-700">Fuel Type</th>
                  <th className="text-right p-2 text-gray-700">Quantity</th>
                  <th className="text-right p-2 text-gray-700">Price</th>
                  <th className="text-right p-2 text-gray-700">Total</th>
                  <th className="text-center p-2 text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {creditSales.map((sale) => (
                  <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-2 text-gray-900">{new Date(sale.date).toLocaleDateString()}</td>
                    <td className="p-2 text-gray-900">{sale.customerName}</td>
                    <td className="p-2 text-gray-900 capitalize">{sale.fuelType}</td>
                    <td className="p-2 text-right text-gray-900">{sale.quantity.toFixed(2)} L</td>
                    <td className="p-2 text-right text-gray-900">{sale.price.toFixed(2)}</td>
                    <td className="p-2 text-right font-semibold text-gray-900">{sale.total.toFixed(2)}</td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => handleDelete(sale.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditSales;
