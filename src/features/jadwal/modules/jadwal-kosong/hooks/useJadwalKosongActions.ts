import React from 'react';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { useJadwalKosongStore } from '../store/useJadwalKosongStore';
import type { JadwalKosong } from '../api/jadwalKosong.api';
import FormCreateJadwalKosong from '../components/FormCreateJadwalKosong';
import FormEditJadwalKosong from '../components/FormEditJadwalKosong';

export const useJadwalKosongActions = () => {
  const { setDialogContent, setOpenDialog } = useDialogStore();
  const { setSelectedJadwalKosong } = useJadwalKosongStore();

  const openCreateModal = () => {
    setDialogContent({
      title: 'Tambah Jadwal Kosong',
      body: React.createElement(FormCreateJadwalKosong),
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { text: 'Simpan', btnProps: { type: 'submit', form: 'form-create-jadwal-kosong' } }
      }
    });
  };

  const openEditModal = (data: JadwalKosong) => {
    setSelectedJadwalKosong(data);
    setDialogContent({
      title: 'Edit Judul Jadwal Kosong',
      body: React.createElement(FormEditJadwalKosong),
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { text: 'Simpan Perubahan', btnProps: { type: 'submit', form: 'form-edit-jadwal-kosong' } }
      }
    });
  };

  return {
    openCreateModal,
    openEditModal,
  };
};
