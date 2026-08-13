import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { useAuthStore } from '@/features/auth/shared/store';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import FormCreateJadwalKosong from './FormCreateJadwalKosong';

export const HeaderContent = () => {
  const { setOpenDialog, setDialogContent } = useDialogStore();
  const { user } = useAuthStore();

  const handleOpenCreateModal = () => {
    setDialogContent({
      title: 'Tambah Jadwal Kosong',
      body: <FormCreateJadwalKosong />,
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: {
          text: 'Tambah',
          btnProps: {
            type: 'submit',
            form: 'form-create-jadwal-kosong',
          },
        }
      }
    });
  };

  const isAllowedToManage = user?.role === 'super_admin';

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Jadwal Kosong</h1>
        <p className="text-sm text-gray-500 mt-1">
          Kelola daftar jadwal kosong asisten laboratorium.
        </p>
      </div>
      
      {isAllowedToManage && (
        <Button 
          onClick={handleOpenCreateModal} 
          className="bg-green-600 hover:bg-green-700 text-white shadow-sm flex items-center gap-2 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Jadwal Kosong</span>
        </Button>
      )}
    </div>
  );
};
