import React from 'react';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import type { AsistenEntri } from '../api/detailJadwalKosong.api';
import api from '@/utils/interceptors';
import FormKursus from '../components/modals/FormKursus';
import FormJadwalKosong from '../components/modals/FormJadwalKosong';
import FormJadwalMateri from '../components/modals/FormJadwalMateri';
import { useDetailJadwalKosongStore } from '../store/useDetailJadwalKosongStore';

export const useDetailJadwalKosongActions = (id: string) => {
  const { setDialogContent, setOpenDialog } = useDialogStore();
  const { setSelectedEntri } = useDetailJadwalKosongStore();

  const handleOpenKursus = (entri: AsistenEntri, isOwner: boolean) => {
    setSelectedEntri(entri);
    setDialogContent({
      title: 'Edit Kursus LEPKOM',
      body: React.createElement(FormKursus, { key: entri.asistenRef, isOwner, id }),
      size: 'lg',
      action: isOwner ? {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { text: 'Simpan', btnProps: { type: 'submit', form: 'form-kursus' } }
      } : undefined
    });
  };

  const handleOpenJadwal = (entri: AsistenEntri, isOwner: boolean) => {
    setSelectedEntri(entri);
    setDialogContent({
      title: 'Edit Jadwal Kosong',
      body: React.createElement(FormJadwalKosong, { key: entri.asistenRef, isOwner, id }),
      size: 'lg',
      action: isOwner ? {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { text: 'Simpan', btnProps: { type: 'submit', form: 'form-jadwal' } }
      } : undefined
    });
  };

  const handleOpenJadwalMateri = (entri: AsistenEntri, isOwner: boolean) => {
    setSelectedEntri(entri);
    setDialogContent({
      title: 'Edit Jadwal & Materi LEPKOM',
      body: React.createElement(FormJadwalMateri, { key: entri.asistenRef, isOwner, id }),
      size: 'lg',
      action: isOwner ? {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { text: 'Simpan', btnProps: { type: 'submit', form: 'form-materi' } }
      } : undefined
    });
  };

  const handleExport = async () => {
    try {
      const res = await api.get(`/api/jadwal/kosong/${id}/export`, { responseType: 'blob' });
      const url = URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `jadwal-kosong-${id}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleOpenKursus,
    handleOpenJadwal,
    handleOpenJadwalMateri,
    handleExport,
  };
};
