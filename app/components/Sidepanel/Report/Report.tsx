'use client'

import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { useMeteredStore } from '@/utils/zStore';

interface ReportData {
  date: string;
  petrolSales: number;
  disealSales: number;
  petrolVolume: number;
  disealVolume: number;
  creditSales: number;
  totalSales: number;
}

const Report: React.FC = () => {
  const { meteredReadings, creditSales } = useMeteredStore();
  const [reportType, setReportType] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const generateReportData = (): ReportData => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    // Filter readings by date range
    const filteredReadings = meteredReadings.filter(reading => {
      const readingDate = new Date(reading.date);
      return readingDate >= start && readingDate <= end;
    });

    // Filter credit sales by date range
    const filteredCreditSales = creditSales.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate >= start && saleDate <= end;
    });

    // Calculate totals
    const petrolSales = filteredReadings.reduce((sum, r) => sum + r.petrolSales, 0);
    const disealSales = filteredReadings.reduce((sum, r) => sum + r.disealSales, 0);
    const petrolVolume = filteredReadings.reduce((sum, r) => sum + r.petrolVolume, 0);
    const disealVolume = filteredReadings.reduce((sum, r) => sum + r.disealVolume, 0);
    const creditSalesTotal = filteredCreditSales.reduce((sum, s) => sum + s.total, 0);
    const totalSales = petrolSales + disealSales + creditSalesTotal;

    return {
      date: startDate,
      petrolSales,
      disealSales,
      petrolVolume,
      disealVolume,
      creditSales: creditSalesTotal,
      totalSales,
    };
  };

  const handleGenerateReport = () => {
    const data = generateReportData();
    setReportData(data);
  };

  const handleExportImage = async () => {
    if (!reportRef.current) return;

    try {
      // Create a clone of the report with simplified styles for html2canvas compatibility
      const reportClone = reportRef.current.cloneNode(true) as HTMLElement;
      reportClone.style.fontFamily = 'monospace';
      reportClone.style.backgroundColor = '#ffffff';
      reportClone.style.color = '#000000';
      
      // Remove any Tailwind classes that might contain oklch colors
      const allElements = reportClone.querySelectorAll('*');
      allElements.forEach(el => {
        const element = el as HTMLElement;
        // Set explicit colors to avoid oklch issues
        if (!element.style.color || element.style.color.includes('oklch')) {
          element.style.color = '#000000';
        }
        if (!element.style.backgroundColor || element.style.backgroundColor.includes('oklch')) {
          element.style.backgroundColor = '#ffffff';
        }
        if (!element.style.borderColor || element.style.borderColor.includes('oklch')) {
          element.style.borderColor = '#000000';
        }
      });

      // Add the clone to the document temporarily
      document.body.appendChild(reportClone);
      reportClone.style.position = 'absolute';
      reportClone.style.left = '-9999px';
      reportClone.style.top = '-9999px';

      const canvas = await html2canvas(reportClone, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      // Remove the clone
      document.body.removeChild(reportClone);

      const link = document.createElement('a');
      link.download = `fuel-report-${reportType}-${startDate}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error exporting image:', error);
      alert('Failed to export image. Please try again.');
    }
  };

  const getDateRangeLabel = () => {
    switch (reportType) {
      case 'daily':
        return `Daily Report - ${new Date(startDate).toLocaleDateString()}`;
      case 'weekly':
        return `Weekly Report - ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}`;
      case 'monthly':
        return `Monthly Report - ${new Date(startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
      case 'yearly':
        return `Yearly Report - ${new Date(startDate).getFullYear()}`;
      default:
        return 'Report';
    }
  };

  const updateDateRange = (type: 'daily' | 'weekly' | 'monthly' | 'yearly') => {
    const today = new Date();
    let start: Date;
    // let end: Date = today;
    const end: Date = today;

    switch (type) {
      case 'daily':
        start = today;
        break;
      case 'weekly':
        start = new Date(today);
        start.setDate(today.getDate() - 7);
        break;
      case 'monthly':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'yearly':
        start = new Date(today.getFullYear(), 0, 1);
        break;
    }

    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  };

  return (
    <div className="text-gray-900">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Reports</h2>

      {/* Report Controls */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setReportType(type);
                    updateDateRange(type);
                  }}
                  className={`px-4 py-2 rounded transition-colors capitalize ${
                    reportType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
              />
            </div>

            {reportType !== 'daily' && reportType !== 'monthly' && reportType !== 'yearly' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                />
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleGenerateReport}
              className="flex-1 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Generate Report
            </button>
            {reportData && (
              <button
                onClick={handleExportImage}
                className="flex-1 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
              >
                Export as Image
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Report Display */}
      {reportData && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div ref={reportRef} className="bg-white p-8 max-w-2xl mx-auto" style={{ fontFamily: 'monospace' }}>
            {/* Receipt Header */}
            <div className="text-center border-b-2 border-gray-800 pb-4 mb-4">
              <div className="mb-2">
                <div className="text-2xl font-bold text-gray-900 tracking-wider">═══════════════════</div>
                <h1 className="text-2xl font-bold text-gray-900 mt-2 mb-1 tracking-wider">FUEL MANAGEMENT SYSTEM</h1>
                <div className="text-2xl font-bold text-gray-900 tracking-wider">═══════════════════</div>
              </div>
              <p className="text-sm font-semibold text-gray-700 mt-3">{getDateRangeLabel()}</p>
              <p className="text-xs text-gray-600 mt-1">
                Generated: {new Date().toLocaleString()}
              </p>
            </div>

            {/* Report Details */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between py-2 border-b border-dashed border-gray-300">
                <span className="text-gray-700 font-medium">Petrol Sales:</span>
                <span className="font-bold text-gray-900">{reportData.petrolSales.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-dashed border-gray-300">
                <span className="text-gray-700 font-medium">Petrol Volume:</span>
                <span className="font-bold text-gray-900">{reportData.petrolVolume.toFixed(2)} L</span>
              </div>
              <div className="flex justify-between py-2 border-b border-dashed border-gray-300">
                <span className="text-gray-700 font-medium">Diesel Sales:</span>
                <span className="font-bold text-gray-900">{reportData.disealSales.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-dashed border-gray-300">
                <span className="text-gray-700 font-medium">Diesel Volume:</span>
                <span className="font-bold text-gray-900">{reportData.disealVolume.toFixed(2)} L</span>
              </div>
              <div className="flex justify-between py-2 border-b border-dashed border-gray-300">
                <span className="text-gray-700 font-medium">Credit Sales:</span>
                <span className="font-bold text-gray-900">{reportData.creditSales.toFixed(2)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t-2 border-gray-800 pt-4 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900 tracking-wider">TOTAL SALES:</span>
                <span className="text-3xl font-bold text-gray-900">{reportData.totalSales.toFixed(2)}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 pt-4 border-t border-dashed border-gray-300">
              <p className="text-xs text-gray-500 mb-1">
                ─────────────────────────────
              </p>
              <p className="text-xs text-gray-500">
                Computer Generated Report
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Thank you for using Fuel Management System
              </p>
            </div>
          </div>
        </div>
      )}

      {!reportData && (
        <div className="bg-white p-12 rounded-lg shadow-md border border-gray-200 text-center">
          <p className="text-gray-500">Click &qout;Generate Report&qout; to view your report</p>
        </div>
      )}
    </div>
  );
};

export default Report;
