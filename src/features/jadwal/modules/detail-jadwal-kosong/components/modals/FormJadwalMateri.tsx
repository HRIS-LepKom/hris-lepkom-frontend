import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import { useGetMateriNames } from '@/features/master-data/modules/materi/api/materi.api';
import { useUpdateJadwalMateri } from '../../api/detailJadwalKosong.api';
import { useDetailJadwalKosongStore } from '../../store/useDetailJadwalKosongStore';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import type { JadwalMateriLepkom } from '../../api/detailJadwalKosong.api';
import { toast } from 'react-hot-toast';

const HARI_OPTIONS = [
  { value: 'senin', label: 'Senin' },
  { value: 'selasa', label: 'Selasa' },
  { value: 'rabu', label: 'Rabu' },
  { value: 'kamis', label: 'Kamis' },
  { value: 'jumat', label: 'Jumat' },
  { value: 'sabtu', label: 'Sabtu' },
];

const SESI_OPTIONS = [
  { value: 0, label: 'Sesi 0' },
  { value: 1, label: 'Sesi 1' },
  { value: 2, label: 'Sesi 2' },
  { value: 3, label: 'Sesi 3' },
];

interface FormJadwalMateriProps {
  isOwner: boolean;
  id: string;
}

const FormJadwalMateri: React.FC<FormJadwalMateriProps> = ({ isOwner, id }) => {
  const { selectedEntri } = useDetailJadwalKosongStore();
  const { setOpenDialog } = useDialogStore();
  const updateJadwalMateri = useUpdateJadwalMateri();

  const [tempMateri, setTempMateri] = useState<JadwalMateriLepkom | null>(selectedEntri?.jadwalMateriLepkom || null);

  const { data: materiData, isLoading: loadingMateri } = useGetMateriNames('');

  const materiOptions = useMemo(() => {
    if (!materiData?.data) return [];
    return materiData.data.map(m => ({
      value: m._id,
      label: `${m.namaMateri} (Tingkat ${m.tingkat})`,
      tingkat: m.tingkat,
      namaMateri: m.namaMateri
    }));
  }, [materiData]);

  const handleSelectMateri = (selectedId: string | null) => {
    if (!selectedId) {
      setTempMateri(null);
      return;
    }
    const materi = materiOptions.find(o => o.value === selectedId);
    if (!materi) return;

    setTempMateri({
      materiRef: materi.value,
      namaMateri: materi.namaMateri,
      tingkat: materi.tingkat,
      hari: tempMateri?.hari || 'senin',
      sesi: tempMateri?.sesi ?? 0
    });
  };

  const handleChangeHari = (hari: string | null) => {
    if (tempMateri && hari) {
      setTempMateri({ ...tempMateri, hari });
    }
  };

  const handleChangeSesi = (sesi: number | null) => {
    if (tempMateri && sesi !== null) {
      setTempMateri({ ...tempMateri, sesi });
    }
  };

  const handleClear = () => {
    setTempMateri(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEntri) return;

    updateJadwalMateri.mutate({ 
      id, 
      asistenId: selectedEntri.asistenRef, 
      data: { jadwalMateriLepkom: tempMateri } 
    }, {
      onSuccess: () => {
        toast.success('Jadwal Materi LEPKOM berhasil diperbarui');
        setOpenDialog('defaultDialog', false);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || 'Gagal memperbarui Jadwal Materi');
      }
    });
  };

  const selectStyles = {
    menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
    control: (base: any) => ({
      ...base,
      borderColor: '#D1D5DB',
      '&:hover': { borderColor: '#10B981' },
      boxShadow: 'none',
      minHeight: '40px',
      borderRadius: '0.5rem',
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected ? '#10B981' : state.isFocused ? '#D1FAE5' : 'white',
      color: state.isSelected ? 'white' : '#111827',
      '&:active': { backgroundColor: '#10B981' }
    })
  };

  return (
    <form id="form-materi" onSubmit={handleFormSubmit} className="flex flex-col gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Materi <span className="text-red-500">*</span></label>
        {isOwner && !tempMateri ? (
          <Select
            options={materiOptions}
            isLoading={loadingMateri}
            isDisabled={updateJadwalMateri.isPending}
            placeholder="Cari materi..."
            noOptionsMessage={() => "Materi tidak ditemukan"}
            value={null}
            onChange={(opt) => handleSelectMateri(opt?.value || null)}
            styles={selectStyles}
            menuPosition="fixed"
            menuPortalTarget={document.body}
          />
        ) : tempMateri ? (
          <div className="p-4 bg-teal-50 border border-teal-100 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-semibold text-teal-800">{tempMateri.namaMateri}</p>
              <p className="text-sm text-teal-600">Tingkat {tempMateri.tingkat}</p>
            </div>
            {isOwner && (
              <button 
                type="button" 
                onClick={handleClear} 
                className="text-red-500 text-sm hover:underline font-medium"
                disabled={updateJadwalMateri.isPending}
              >
                Ganti Materi
              </button>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic p-4 text-center bg-gray-50 rounded-lg border border-dashed">Belum ada materi dipilih.</p>
        )}
      </div>

      {tempMateri && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Hari <span className="text-red-500">*</span></label>
            <Select
              options={HARI_OPTIONS}
              isDisabled={!isOwner || updateJadwalMateri.isPending}
              value={HARI_OPTIONS.find(h => h.value === tempMateri.hari)}
              onChange={(opt) => handleChangeHari(opt?.value || null)}
              styles={selectStyles}
              placeholder="Pilih Hari..."
              menuPosition="fixed"
              menuPortalTarget={document.body}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Sesi <span className="text-red-500">*</span></label>
            <Select
              options={SESI_OPTIONS}
              isDisabled={!isOwner || updateJadwalMateri.isPending}
              value={SESI_OPTIONS.find(s => s.value === tempMateri.sesi)}
              onChange={(opt) => handleChangeSesi(opt?.value ?? null)}
              styles={selectStyles}
              placeholder="Pilih Sesi..."
              menuPosition="fixed"
              menuPortalTarget={document.body}
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default FormJadwalMateri;
