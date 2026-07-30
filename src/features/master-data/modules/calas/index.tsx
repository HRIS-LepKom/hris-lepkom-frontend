import { useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import { useCalasTableStore } from '../../store/useCalasTableStore';
import { useGetCalasList, useUpdateTimeline, useBanCalas } from '../../api/calas.api';
import { FiSearch, FiShieldOff, FiArrowRight } from 'react-icons/fi';
import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';
import type { Calas } from '@/types';
import toast from 'react-hot-toast';

const CalasModule = () => {
  const { setBreadcrumbItems } = useBreadcrumbStore();
  const { search, page, limit, setSearch } = useCalasTableStore();

  const { data, isLoading } = useGetCalasList({ search, page, limit });
  const timelineMutation = useUpdateTimeline();
  const banMutation = useBanCalas();

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Master Data' },
      { label: 'Data Calas' }
    ]);
    return () => setBreadcrumbItems([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBan = (id: string) => {
    if (confirm('GUGURKAN: Apakah Anda yakin ingin memblokir calas ini secara mutlak?')) {
      banMutation.mutate(id, {
        onSuccess: () => toast.success('Calas berhasil digugurkan')
      });
    }
  };

  const handleUpdateTimeline = (id: string, tahap: string) => {
    timelineMutation.mutate({ id, tahapSaatIni: tahap }, {
      onSuccess: () => toast.success('Tahapan berhasil di-update')
    });
  };

  const columns = [
    { key: 'npm', label: 'NPM' },
    { key: 'namaCalas', label: 'Nama Lengkap' },
    { key: 'kelas', label: 'Kelas' },
    { 
      key: 'statusRekrutmen', 
      label: 'Tahapan Saat Ini',
      render: (row: Calas) => (
        <select 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-lepkom-green focus:border-lepkom-green block w-full p-2"
          value={row.statusRekrutmen?.tahapSaatIni || 'registrasi'}
          onChange={(e) => handleUpdateTimeline(row._id, e.target.value)}
          disabled={row.isBanned}
        >
          <option value="registrasi">Registrasi</option>
          <option value="screening">Screening</option>
          <option value="ujian_praktek">Ujian Praktek</option>
          <option value="ujian_project">Ujian Project</option>
          <option value="wawancara">Wawancara</option>
          <option value="lulus">LULUS</option>
          <option value="tidak_lulus">TIDAK LULUS</option>
        </select>
      )
    },
    { 
      key: 'status', 
      label: 'Status Akses',
      render: (row: Calas) => (
        <Badge variant={row.isBanned ? 'status-red' : 'status-green'}>
          {row.isBanned ? 'Banned' : 'Aktif'}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Aksi',
      render: (row: Calas) => (
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="p-2 h-auto text-blue-600 hover:bg-blue-50"
            title="Lihat Detail Profil"
          >
            <FiArrowRight className="w-4 h-4" />
          </Button>
          {!row.isBanned && (
            <Button 
              variant="outline" 
              className="p-2 h-auto text-red-600 hover:bg-red-50" 
              onClick={() => handleBan(row._id)}
              title="Blokir/Gugurkan Mutlak"
            >
              <FiShieldOff className="w-4 h-4" />
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <ContentLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Calon Asisten</h1>
          <p className="text-gray-500 mt-1">Pantau dan kelola tahapan rekrutmen seluruh pendaftar.</p>
        </div>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-72">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              placeholder="Cari nama, NPM, kelas..." 
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-100 rounded"></div>
            <div className="h-20 bg-gray-100 rounded"></div>
          </div>
        ) : (
          <DataTable 
            columns={columns} 
            data={data?.data?.data || []} 
            emptyMessage="Tidak ada data calas ditemukan"
          />
        )}
      </Card>
      </div>
    </ContentLayout>
  );
};

export default CalasModule;
