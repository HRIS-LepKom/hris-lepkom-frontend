import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  FiEdit2, 
  FiKey, 
  FiMail, 
  FiArrowRightCircle, 
  FiTrash2, 
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiChevronDown
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { path } from '@/utils/consts';
import type { Calas } from '../api/calas.api';

const formatStageName = (stage: string) => {
  return stage.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const TahapSaatIniCell = ({
  row,
  actions,
  isSuperAdmin
}: {
  row: Calas;
  actions: any;
  isSuperAdmin: boolean;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const tahap = row.statusRekrutmen?.tahapSaatIni || 'registrasi';
  const isBanned = row.isBanned;
  const isKeputusanAkhir = tahap === 'keputusan_akhir';
  const displayLabel = formatStageName(tahap);
  
  let variant: any = 'secondary';
  if (tahap === 'selesai') variant = 'success';
  else if (tahap === 'keputusan_akhir') variant = 'warning';
  else variant = 'info';

  return (
    <div className="flex items-center gap-2">
      <Badge variant={variant}>{displayLabel}</Badge>
      
      {!isBanned && tahap !== 'selesai' && isSuperAdmin && (
        <div className="flex items-center gap-1 relative">
          {isKeputusanAkhir ? (
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="h-6 px-2 text-[10px] font-medium border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-1"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Keputusan <FiChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>

              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute left-0 top-full mt-1 w-36 bg-white border border-gray-100 shadow-lg rounded-md z-20 py-1">
                    <button 
                      onClick={() => { setIsDropdownOpen(false); actions.handleAccept(row); }}
                      className="flex items-center gap-2 px-3 py-1.5 text-xs text-green-700 hover:bg-green-50 w-full text-left font-medium"
                    >
                      <FiCheckCircle className="w-3 h-3 text-green-600" /> Terima Calas
                    </button>
                    <button 
                      onClick={() => { setIsDropdownOpen(false); actions.handleReject(row); }}
                      className="flex items-center gap-2 px-3 py-1.5 text-xs text-red-700 hover:bg-red-50 w-full text-left font-medium"
                    >
                      <FiXCircle className="w-3 h-3 text-red-600" /> Tolak Calas
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                size="icon"
                title="Update Progres"
                className="h-6 w-6 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-full border-indigo-200"
                onClick={() => actions.handleUpdateProgress(row)}
              >
                <FiArrowRightCircle className="w-3 h-3" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                title="Tolak Calas"
                className="h-6 w-6 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full border-red-200"
                onClick={() => actions.handleReject(row)}
              >
                <FiXCircle className="w-3 h-3" />
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const ActionCell = ({ 
  row, 
  actions
}: { 
  row: Calas; 
  actions: any; 
}) => {
  const showSendEmail = row.isBiodataEmailSending;

  return (
    <div className="flex flex-wrap items-center justify-center gap-1 relative">
      <Button
        variant="outline"
        size="icon"
        title="Edit Data Profil (Hard Update)"
        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        onClick={() => actions.handleEditData(row)}
      >
        <FiEdit2 className="w-4 h-4" />
      </Button>

      {showSendEmail && (
        <Button
          variant="outline"
          size="icon"
          title="Kirim Email Registrasi"
          className="h-8 w-8 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
          onClick={() => actions.handleSendBiodataEmail(row)}
        >
          <FiMail className="w-4 h-4" />
        </Button>
      )}

      <Button
        variant="outline"
        size="icon"
        title="Reset Password Default"
        className="h-8 w-8 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
        onClick={() => actions.handleResetPassword(row)}
      >
        <FiKey className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        title="Hapus Permanen"
        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={() => actions.handleDelete(row)}
      >
        <FiTrash2 className="w-4 h-4" />
      </Button>

      <Link to={`${path.lepkom.masterData.calas?.detailCalas || '/master-data/calas'}/${row._id}`}>
        <Button
          variant="outline"
          size="icon"
          title="Lihat Detail (Routing)"
          className="h-8 w-8 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
        >
          <FiEye className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
};

export const getListCalasColumns = (actions: {
  handleEditData: (row: Calas) => void;
  handleUpdateProgress: (row: Calas) => void;
  handleReject: (row: Calas) => void;
  handleAccept: (row: Calas) => void;
  handleDelete: (row: Calas) => void;
  handleResetPassword: (row: Calas) => void;
  handleSendBiodataEmail: (row: Calas) => void;
}, page: number = 1, limit: number = 10, isSuperAdmin: boolean = false, filtersData: any) => {
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
      accessorKey: 'npm',
      title: 'NPM',
      sorting: true,
      isSearch: true,
    },
    {
      accessorKey: 'namaCalas',
      title: 'Nama',
      sorting: true,
      isSearch: true,
    },
    {
      accessorKey: 'kelas',
      title: 'Kelas',
      sorting: true,
      isSearch: true,
      renderCell: (info: any) => info.getValue() || '-'
    },
    {
      accessorKey: 'jurusan',
      title: 'Jurusan',
      sorting: true,
      isSearch: true,
      filterOptions: filtersData?.data?.jurusan?.length ? 
        filtersData.data.jurusan.filter(Boolean).map((j: string) => ({ label: String(j), value: String(j) })) 
        : undefined,
      renderCell: (info: any) => info.getValue() || '-'
    },
    {
      accessorKey: 'statusRekrutmen.tahapSaatIni',
      title: 'Tahap Saat Ini',
      sorting: true,
      isSearch: true,
      filterOptions: [
        { label: 'Registrasi', value: 'registrasi' },
        { label: 'Screening', value: 'screening' },
        { label: 'Biodata Dokumen', value: 'biodata_dokumen' },
        { label: 'Ujian Praktek', value: 'ujian_praktek' },
        { label: 'Ujian Project', value: 'ujian_project' },
        { label: 'Keputusan Akhir', value: 'keputusan_akhir' },
        { label: 'Selesai', value: 'selesai' },
      ],
      renderCell: (info: any) => (
        <TahapSaatIniCell row={info.row.original} actions={actions} isSuperAdmin={isSuperAdmin} />
      )
    },
    {
      accessorKey: 'statusRekrutmen.hasil',
      title: 'Hasil',
      sorting: true,
      isSearch: true,
      filterOptions: [
        { label: 'Proses', value: 'proses' },
        { label: 'Lolos', value: 'lolos' },
        { label: 'Tidak Lolos', value: 'tidak_lolos' },
      ],
      renderCell: (info: any) => {
        const hasil = info.row.original.statusRekrutmen?.hasil || 'proses';
        let variant: any = 'secondary';
        if (hasil === 'lolos') variant = 'success';
        else if (hasil === 'tidak_lolos') variant = 'destructive';
        else variant = 'warning';

        return <Badge variant={variant}>{hasil.toUpperCase()}</Badge>;
      }
    },
    {
      accessorKey: 'skorAkhirNilai',
      title: 'Skor Akhir',
      sorting: true,
      isSearch: false,
      renderCell: (info: any) => {
        const skor = info.getValue();
        if (skor === null || skor === undefined) {
          return <span className="text-gray-400 italic">not-set</span>;
        }
        return <span className="font-semibold">{Number(skor).toFixed(2)}</span>;
      }
    }
  ];

  if (isSuperAdmin) {
    columns.push({
      accessorKey: 'action',
      title: 'Aksi',
      align: 'center',
      minSize: 220,
      renderCell: (info: any) => {
        return <ActionCell row={info.row.original} actions={actions} />;
      }
    });
  } else {
    columns.push({
      accessorKey: 'action',
      title: 'Aksi',
      align: 'center',
      renderCell: (info: any) => {
        const row = info.row.original as Calas;
        return (
          <div className="flex items-center justify-center">
            <Link to={`${path.lepkom.masterData.calas?.detailCalas || '/master-data/calas'}/${row._id}`}>
              <Button
                variant="outline"
                size="icon"
                title="Lihat Detail (Routing)"
                className="h-8 w-8 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
              >
                <FiEye className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        );
      }
    });
  }

  return columns;
};
