import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { useJadwalKosongStore } from '../store/useJadwalKosongStore';
import { useUpdateJadwalKosong } from '../api/jadwalKosong.api';
import { Input } from '@/components/ui/Input';

const FormEditJadwalKosong = () => {
  const { setOpenDialog } = useDialogStore();
  const { selectedJadwalKosong } = useJadwalKosongStore();
  const updateMutation = useUpdateJadwalKosong();
  
  const [judul, setJudul] = useState(selectedJadwalKosong?.judul || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedJadwalKosong) {
      setJudul(selectedJadwalKosong.judul);
    }
  }, [selectedJadwalKosong]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJadwalKosong) return;

    if (!judul.trim()) {
      setError('Judul tidak boleh kosong');
      return;
    }
    setError('');
    
    try {
      await updateMutation.mutateAsync({ id: selectedJadwalKosong._id, payload: { judul } });
      toast.success('Judul Jadwal Kosong berhasil diubah');
      setOpenDialog('defaultDialog', false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Gagal mengubah Jadwal Kosong');
    }
  };

  return (
    <form id="form-edit-jadwal-kosong" onSubmit={onSubmit} className="flex flex-col gap-2">
      <label className="block text-sm font-medium text-foreground">
        Judul Jadwal Kosong <span className="text-red-500">*</span>
      </label>
      <Input
        value={judul}
        onChange={(e) => {
          setJudul(e.target.value);
          if (error) setError('');
        }}
        placeholder="Masukkan judul baru"
        disabled={updateMutation.isPending}
        required
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </form>
  );
};

export default FormEditJadwalKosong;
