import React, { useState, useMemo } from 'react';
import { useGetMateriNames } from '@/features/master-data/modules/materi/api/materi.api';
import { useUpdateKursus } from '../../api/detailJadwalKosong.api';
import { useDetailJadwalKosongStore } from '../../store/useDetailJadwalKosongStore';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { Trash2 } from 'lucide-react';
import type { KursusLepkom } from '../../api/detailJadwalKosong.api';
import { toast } from 'react-hot-toast';
import Select from 'react-select';

interface FormKursusProps {
  isOwner: boolean;
  id: string;
}

const FormKursus: React.FC<FormKursusProps> = ({ isOwner, id }) => {
  const { selectedEntri } = useDetailJadwalKosongStore();
  const { setOpenDialog } = useDialogStore();
  const updateKursus = useUpdateKursus();

  const [tempKursus, setTempKursus] = useState<KursusLepkom[]>(selectedEntri?.kursusLepkom || []);
  const [selectedMateri, setSelectedMateri] = useState<string | null>(null);

  const { data: materiData, isLoading: loadingMateri } = useGetMateriNames('');

  const materiOptions = useMemo(() => {
    if (!materiData?.data) return [];
    // Filter out materials that are already in tempKursus
    return materiData.data
      .filter(m => !tempKursus.find(k => k.materiRef === m._id))
      .map(m => ({
        value: m._id,
        label: `${m.namaMateri} (Tingkat ${m.tingkat})`,
        tingkat: m.tingkat,
        namaMateri: m.namaMateri
      }));
  }, [materiData, tempKursus]);

  const handleAdd = () => {
    if (!selectedMateri) return;
    const materi = materiOptions.find(o => o.value === selectedMateri);
    if (!materi) return;

    setTempKursus([...tempKursus, {
      materiRef: materi.value,
      namaMateri: materi.namaMateri,
      tingkat: materi.tingkat
    }]);
    setSelectedMateri(null);
  };

  const handleRemove = (materiRef: string) => {
    setTempKursus(tempKursus.filter(k => k.materiRef !== materiRef));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEntri) return;
    
    updateKursus.mutate({ 
      id, 
      asistenId: selectedEntri.asistenRef, 
      data: { kursusLepkom: tempKursus } 
    }, {
      onSuccess: () => {
        toast.success('Kursus LEPKOM berhasil diperbarui');
        setOpenDialog('defaultDialog', false);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || 'Gagal memperbarui Kursus LEPKOM');
      }
    });
  };

  return (
    <form id="form-kursus" onSubmit={handleSubmit} className="flex flex-col gap-6">
      {isOwner && (
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Cari & Pilih Materi</label>
            <Select
              options={materiOptions}
              isLoading={loadingMateri}
              isDisabled={updateKursus.isPending}
              placeholder="Cari materi..."
              noOptionsMessage={() => "Semua materi sudah dipilih atau tidak ditemukan"}
              value={materiOptions.find(o => o.value === selectedMateri) || null}
              onChange={(opt) => setSelectedMateri(opt?.value || null)}
              isClearable
              menuPosition="fixed"
              menuPortalTarget={document.body}
              styles={{
                menuPortal: base => ({ ...base, zIndex: 9999 }),
                control: (base) => ({
                  ...base,
                  borderColor: '#D1D5DB',
                  '&:hover': { borderColor: '#10B981' },
                  boxShadow: 'none',
                  minHeight: '40px',
                  borderRadius: '0.5rem',
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? '#10B981' : state.isFocused ? '#D1FAE5' : 'white',
                  color: state.isSelected ? 'white' : '#111827',
                  '&:active': { backgroundColor: '#10B981' }
                })
              }}
            />
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!selectedMateri || updateKursus.isPending}
            className={`px-4 py-2 h-10 rounded-lg text-white font-medium transition-colors ${!selectedMateri ? 'bg-gray-300 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'}`}
          >
            Tambah
          </button>
        </div>
      )}

      <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
        <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Materi Terpilih:</h3>
        {tempKursus.length === 0 ? (
          <p className="text-sm text-gray-500 italic p-4 text-center bg-gray-50 rounded-lg border border-dashed">Belum ada kursus yang dipilih.</p>
        ) : (
          tempKursus.map((kursus) => (
            <div key={kursus.materiRef} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow transition-shadow">
              <div>
                <p className="font-semibold text-gray-800">{kursus.namaMateri}</p>
                <p className="text-xs text-teal-600 font-medium mt-1">Tingkat {kursus.tingkat}</p>
              </div>
              {isOwner && (
                <button 
                  type="button" 
                  onClick={() => handleRemove(kursus.materiRef)} 
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  disabled={updateKursus.isPending}
                  title="Hapus"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </form>
  );
};

export default FormKursus;
