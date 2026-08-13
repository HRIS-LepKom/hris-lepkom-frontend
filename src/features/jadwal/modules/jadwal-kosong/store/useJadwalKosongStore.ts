import { create } from 'zustand';
import type { JadwalKosong } from '../api/jadwalKosong.api';

interface JadwalKosongState {
  selectedJadwalKosong: JadwalKosong | null;
  setSelectedJadwalKosong: (jadwal: JadwalKosong | null) => void;
}

export const useJadwalKosongStore = create<JadwalKosongState>((set) => ({
  selectedJadwalKosong: null,
  setSelectedJadwalKosong: (jadwal) => set({ selectedJadwalKosong: jadwal }),
}));
