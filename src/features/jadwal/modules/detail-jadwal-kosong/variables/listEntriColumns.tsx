import { Eye, Edit2 } from 'lucide-react';
import type { AsistenEntri } from '../api/detailJadwalKosong.api';

export const getListEntriColumns = (
  myId: string,
  onKursus: (entri: AsistenEntri) => void,
  onJadwal: (entri: AsistenEntri) => void,
  onJadwalMateri: (entri: AsistenEntri) => void,
): any[] => [
  {
    id: 'no',
    title: 'No.',
    renderCell: (info: any) => info.row.index + 1,
    size: 60,
  },
  {
    accessorKey: 'asisten.idAsisten',
    title: 'ID Asisten',
    sorting: true,
    isSearch: true,
  },
  {
    accessorKey: 'asisten.npm',
    title: 'NPM',
    sorting: true,
    isSearch: true,
  },
  {
    accessorKey: 'asisten.nama',
    title: 'Nama',
    sorting: true,
    isSearch: true,
  },
  {
    accessorKey: 'asisten.kelasSaatIni',
    title: 'Kelas',
    sorting: true,
    isSearch: true,
  },
  {
    accessorKey: 'statusPengisian',
    title: 'Status',
    sorting: true,
    renderCell: (info: any) => {
      const val = info.getValue() as string;
      const color = val === 'lengkap' ? 'bg-green-100 text-green-700' :
                    val === 'sebagian' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-600';
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
          {val ? val.replace('_', ' ').toUpperCase() : '-'}
        </span>
      );
    }
  },
  {
    id: 'kursus',
    title: 'Kursus LEPKOM',
    sorting: false,
    renderCell: (info: any) => {
      const entri = info.row.original;
      const isOwner = entri.asisten._id === myId;
      return (
        <button
          onClick={() => onKursus(entri)}
          className="p-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors"
        >
          {isOwner ? <Edit2 size={16} /> : <Eye size={16} />}
        </button>
      );
    }
  },
  {
    id: 'jadwal',
    title: 'Jadwal Kosong',
    sorting: false,
    renderCell: (info: any) => {
      const entri = info.row.original;
      const isOwner = entri.asisten._id === myId;
      return (
        <button
          onClick={() => onJadwal(entri)}
          className="p-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors"
        >
          {isOwner ? <Edit2 size={16} /> : <Eye size={16} />}
        </button>
      );
    }
  },
  {
    id: 'jadwalMateri',
    title: 'Jadwal & Materi LEPKOM',
    sorting: false,
    renderCell: (info: any) => {
      const entri = info.row.original;
      const isDisabled = entri.asisten.kelasSaatIni === 'NON CLASS';
      const isOwner = entri.asisten._id === myId;
      return (
        <button
          disabled={isDisabled}
          onClick={() => onJadwalMateri(entri)}
          className={`p-2 rounded-lg transition-colors ${isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-teal-50 text-teal-600 hover:bg-teal-100'}`}
        >
          {isOwner && !isDisabled ? <Edit2 size={16} /> : <Eye size={16} />}
        </button>
      );
    }
  }
];
