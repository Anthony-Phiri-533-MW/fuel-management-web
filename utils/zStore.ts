import { create } from 'zustand';

type MeteredStore = {
  petrol: number;
  diseal: number;
  setPetrol: (value: number) => void;
  setDiseal: (value: number) => void;
};

export const useMeteredStore = create<MeteredStore>((set) => ({
  petrol: 0,
  diseal: 0,
  setPetrol: (value) => set({ petrol: value }),
  setDiseal: (value) => set({ diseal: value }),
}));