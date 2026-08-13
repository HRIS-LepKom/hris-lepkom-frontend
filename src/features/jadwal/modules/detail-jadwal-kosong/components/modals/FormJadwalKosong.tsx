import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useUpdateJadwal } from '../../api/detailJadwalKosong.api';
import { useDetailJadwalKosongStore } from '../../store/useDetailJadwalKosongStore';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import type { SlotJadwal } from '../../api/detailJadwalKosong.api';
import { toast } from 'react-hot-toast';

const HARI_LIST = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
const SESI_LIST = [0, 1, 2, 3];

interface FormJadwalKosongProps {
  isOwner: boolean;
  id: string;
}

const FormJadwalKosong: React.FC<FormJadwalKosongProps> = ({ isOwner, id }) => {
  const { selectedEntri } = useDetailJadwalKosongStore();
  const { setOpenDialog } = useDialogStore();
  const updateJadwal = useUpdateJadwal();

  const [tempJadwal, setTempJadwal] = useState<SlotJadwal[]>(selectedEntri?.jadwalKosong || []);

  const toggleSesi = (hari: string, sesi: number) => {
    if (!isOwner) return;
    const current = [...tempJadwal];
    const hariIdx = current.findIndex(h => h.hari === hari);
    
    if (hariIdx > -1) {
      const sesiList = current[hariIdx].sesi;
      if (sesiList.includes(sesi)) {
        current[hariIdx].sesi = sesiList.filter(s => s !== sesi);
        if (current[hariIdx].sesi.length === 0) current.splice(hariIdx, 1);
      } else {
        current[hariIdx].sesi.push(sesi);
      }
    } else {
      current.push({ hari, sesi: [sesi] });
    }
    setTempJadwal(current);
  };

  const setFullHari = (hari: string) => {
    if (!isOwner) return;
    const current = [...tempJadwal];
    const hariIdx = current.findIndex(h => h.hari === hari);
    if (hariIdx > -1) {
      if (current[hariIdx].sesi.length === 4) {
        current.splice(hariIdx, 1); 
      } else {
        current[hariIdx].sesi = [...SESI_LIST];
      }
    } else {
      current.push({ hari, sesi: [...SESI_LIST] });
    }
    setTempJadwal(current);
  };

  const setFullKosong = () => {
    if (!isOwner) return;
    setTempJadwal(HARI_LIST.map(hari => ({ hari, sesi: [...SESI_LIST] })));
  };

  const isSesiSelected = (hari: string, sesi: number) => {
    const h = tempJadwal.find(j => j.hari === hari);
    return h ? h.sesi.includes(sesi) : false;
  };

  const isHariFull = (hari: string) => {
    const h = tempJadwal.find(j => j.hari === hari);
    return h ? h.sesi.length === 4 : false;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEntri) return;

    updateJadwal.mutate({ 
      id, 
      asistenId: selectedEntri.asistenRef, 
      data: { jadwalKosong: tempJadwal } 
    }, {
      onSuccess: () => {
        toast.success('Jadwal Kosong berhasil diperbarui');
        setOpenDialog('defaultDialog', false);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || 'Gagal memperbarui Jadwal Kosong');
      }
    });
  };

  return (
    <form id="form-jadwal" onSubmit={handleFormSubmit} className="flex flex-col gap-4">
      {isOwner && (
        <div className="flex justify-end mb-2">
          <button 
            type="button" 
            onClick={setFullKosong} 
            className="px-3 py-1 bg-teal-100 text-teal-700 rounded-md text-sm font-medium hover:bg-teal-200"
            disabled={updateJadwal.isPending}
          >
            Full Kosong Semua
          </button>
        </div>
      )}
      <div className="grid grid-cols-7 gap-4">
        <div className="font-semibold text-gray-600 text-center">Sesi</div>
        {HARI_LIST.map(hari => (
          <div key={hari} className="font-semibold text-gray-800 text-center capitalize flex flex-col items-center gap-2">
            {hari}
            {isOwner && (
              <button 
                type="button" 
                onClick={() => setFullHari(hari)} 
                className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
                disabled={updateJadwal.isPending}
              >
                {isHariFull(hari) ? 'Clear' : 'Full'}
              </button>
            )}
          </div>
        ))}

        {SESI_LIST.map(sesi => (
          <React.Fragment key={`row-${sesi}`}>
            <div className="flex items-center justify-center font-medium text-gray-700 bg-gray-50 rounded-lg p-2">
              Sesi {sesi}
            </div>
            {HARI_LIST.map(hari => {
              const selected = isSesiSelected(hari, sesi);
              return (
                <button
                  key={`${hari}-${sesi}`}
                  type="button"
                  disabled={!isOwner || updateJadwal.isPending}
                  onClick={() => toggleSesi(hari, sesi)}
                  className={`h-16 rounded-lg border-2 flex items-center justify-center transition-colors ${
                    selected ? 'bg-teal-50 border-teal-500 text-teal-600' : 'bg-white border-gray-200 text-transparent hover:border-teal-200'
                  } ${!isOwner && 'cursor-default'}`}
                >
                  {selected && <Check size={24} />}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </form>
  );
};

export default FormJadwalKosong;
