import { create } from 'zustand'

type MeteredStore = {
  petrol: number;
  diseal: number;
}

export const useMeteredStore = create<MeteredStore>(() => ({
  petrol:0,
  diseal: 0
}))