import { create } from 'zustand';

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

interface MeteredReading {
  id: string;
  date: string;
  petrolVolume: number;
  disealVolume: number;
  petrolPrice: number;
  disealPrice: number;
  petrolSales: number;
  disealSales: number;
}

type MeteredStore = {
  petrol: number;
  diseal: number;
  setPetrol: (value: number) => void;
  setDiseal: (value: number) => void;
  creditSales: CreditSale[];
  addCreditSale: (sale: CreditSale) => void;
  removeCreditSale: (id: string) => void;
  meteredReadings: MeteredReading[];
  addMeteredReading: (reading: MeteredReading) => void;
};

export const useMeteredStore = create<MeteredStore>((set) => ({
  petrol: 0,
  diseal: 0,
  creditSales: [],
  meteredReadings: [],
  setPetrol: (value) => set({ petrol: value }),
  setDiseal: (value) => set({ diseal: value }),
  addCreditSale: (sale) => set((state) => ({ creditSales: [...state.creditSales, sale] })),
  removeCreditSale: (id) => set((state) => ({ creditSales: state.creditSales.filter(s => s.id !== id) })),
  addMeteredReading: (reading) => set((state) => ({ meteredReadings: [...state.meteredReadings, reading] })),
}));