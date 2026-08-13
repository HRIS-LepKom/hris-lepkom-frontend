import type { JadwalKosong } from '../api/jadwalKosong.api';
import { Button } from '@/components/ui/Button';
import { FiEdit2, FiEye } from 'react-icons/fi';
import { EmptyCellText } from '@/components/shared/EmptyCellText';

export const getJadwalKosongColumns = (
  actions: {
    handleEdit: (row: JadwalKosong) => void;
    handleDetail: (row: JadwalKosong) => void;
  },
  page: number = 1,
  limit: number = 10,
  isAuthorized: boolean = false
) => {
  const columns: any[] = [
    {
      accessorKey: 'no',
      title: 'No',
      renderCell: (info: any) => {
        const rowIndex = info.rowIndex;
        return ((page - 1) * limit) + rowIndex + 1;
      }
    },
    {
      accessorKey: 'judul',
      title: 'Judul Jadwal Kosong',
      sorting: true,
      isSearch: true,
      renderCell: (info: any) => (
        <span className="font-medium text-gray-800">{info.getValue() || <EmptyCellText />}</span>
      ),
    },
    {
      accessorKey: 'dibuatOleh.nama',
      title: 'Dibuat Oleh',
      renderCell: (info: any) => {
        const row = info.row.original as JadwalKosong;
        return row.dibuatOleh ? (
          <span>
            {row.dibuatOleh.nama}{' '}
            <span className="text-gray-400">({row.dibuatOleh.idAsisten})</span>
          </span>
        ) : (
          <EmptyCellText />
        );
      },
    },
    {
      accessorKey: 'createdAt',
      title: 'Tanggal Dibuat',
      sorting: true,
      renderCell: (info: any) => {
        const dateStr = info.getValue();
        return dateStr ? (
          <span>
            {new Date(dateStr).toLocaleDateString('id-ID', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        ) : <EmptyCellText />;
      },
    },
    {
      accessorKey: 'action',
      title: 'Aksi',
      align: 'center',
      renderCell: (info: any) => {
        const row = info.row.original as JadwalKosong;
        return (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              title="Lihat Detail"
              className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
              onClick={() => actions.handleDetail(row)}
            >
              <FiEye className="w-4 h-4" />
            </Button>
            {isAuthorized && (
              <Button
                variant="outline"
                size="icon"
                title="Edit Judul"
                className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                onClick={() => actions.handleEdit(row)}
              >
                <FiEdit2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        );
      },
    }
  ];

  return columns;
};
