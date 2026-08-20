import React from 'react';
import toast from 'react-hot-toast';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { useJadwalKosongStore } from '../store/useJadwalKosongStore';
import { useDeleteJadwalKosong, type JadwalKosong } from '../api/jadwalKosong.api';
import FormCreateJadwalKosong from '../components/FormCreateJadwalKosong';
import FormEditJadwalKosong from '../components/FormEditJadwalKosong';

export const useJadwalKosongActions = () => {
  const { setDialogContent, setOpenDialog, setAlert, resetAlert } = useDialogStore();
  const { setSelectedJadwalKosong } = useJadwalKosongStore();
  const deleteMutation = useDeleteJadwalKosong();

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

  const openDeleteModal = (data: JadwalKosong) => {
    setAlert({
      type: 'confirm',
      text: {
        heading: 'Hapus Jadwal Kosong',
        body: `Apakah Anda yakin ingin menghapus jadwal kosong "${data.judul}" beserta seluruh entrinya? Tindakan ini tidak dapat dibatalkan.`,
      },
      btnTrue: { text: 'Ya, Hapus' },
      btnFalse: { text: 'Batal' },
      onTrueCallback: async () => {
        resetAlert();
        try {
          await deleteMutation.mutateAsync(data._id);
          toast.success('Jadwal kosong berhasil dihapus');
        } catch (error: any) {
          toast.error(error?.response?.data?.message || 'Gagal menghapus jadwal kosong');
        }
      },
      onFalseCallback: () => resetAlert(),
    });
  };

  return {
    openCreateModal,
    openEditModal,
    openDeleteModal,
  };
};
