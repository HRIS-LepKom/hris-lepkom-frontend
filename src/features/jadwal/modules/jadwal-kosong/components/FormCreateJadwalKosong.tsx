import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { useCreateJadwalKosong } from '../api/jadwalKosong.api';
import { Input } from '@/components/ui/Input';

const FormCreateJadwalKosong = () => {
  const { setOpenDialog } = useDialogStore();
  const createMutation = useCreateJadwalKosong();
  const [judul, setJudul] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul.trim()) {
      setError('Judul tidak boleh kosong');
      return;
    }
    setError('');
    
    try {
      await createMutation.mutateAsync({ judul });
      toast.success('Jadwal Kosong berhasil dibuat');
      setOpenDialog('defaultDialog', false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Gagal membuat Jadwal Kosong');
    }
  };

  return (
    <form id="form-create-jadwal-kosong" onSubmit={onSubmit} className="flex flex-col gap-2">
      <label className="block text-sm font-medium text-foreground">
        Judul Jadwal Kosong <span className="text-red-500">*</span>
      </label>
      <Input
        value={judul}
        onChange={(e) => {
          setJudul(e.target.value);
          if (error) setError('');
        }}
        placeholder="Masukkan judul (Contoh: Jadwal Kosong PTA 2024/2025)"
        disabled={createMutation.isPending}
        required
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </form>
  );
};

export default FormCreateJadwalKosong;
