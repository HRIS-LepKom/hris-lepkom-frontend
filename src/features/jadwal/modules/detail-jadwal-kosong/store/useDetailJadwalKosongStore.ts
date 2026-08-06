import { create } from 'zustand';
import type { AsistenEntri } from '../api/detailJadwalKosong.api';

interface DetailJadwalKosongState {
  selectedEntri: AsistenEntri | null;
  setSelectedEntri: (entri: AsistenEntri | null) => void;
}

export const useDetailJadwalKosongStore = create<DetailJadwalKosongState>((set) => ({
  selectedEntri: null,
  setSelectedEntri: (entri) => set({ selectedEntri: entri }),
}));
