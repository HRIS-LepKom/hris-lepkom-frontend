import React, { useMemo } from 'react';
import DefaultTable from '@/components/table/DefaultTable';
import PaginationPage from '@/components/pagination/PaginationPage';
import { Card } from '@/components/ui/Card';
import { useDetailAsistenStore } from '../store/useDetailAsistenStore';
import { useGetHistoryPenilaian } from '../api/detailAsisten.api';
import { Badge } from '@/components/ui/Badge';

interface Props {
  asistenId: string;
}

const DetailAsistenPenilaianTable: React.FC<Props> = ({ asistenId }) => {
  const { penilaianPage, penilaianLimit, setPenilaianPage, setPenilaianLimit } = useDetailAsistenStore();

  const queryString = `?page=${penilaianPage}&limit=${penilaianLimit}`;
  const { data, isLoading } = useGetHistoryPenilaian(asistenId, queryString);

  const columns = useMemo(() => [
    {
      header: 'Calas',
      accessorKey: 'calasRef',
      cell: (info: any) => (
        <div>
          <p className="font-medium text-gray-900">{info.getValue()?.namaCalas}</p>
          <p className="text-sm text-gray-500">{info.getValue()?.npm}</p>
        </div>
      ),
    },
    {
      header: 'Nilai Akhir',
      accessorKey: 'nilaiAkhir',
      cell: (info: any) => <span className="font-bold">{info.getValue() ?? '-'}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info: any) => {
        const val = info.getValue();
        return (
          <Badge variant={val === 'Lulus' ? 'success' : val === 'Gagal' ? 'destructive' : 'default'}>
            {val || 'Menunggu'}
          </Badge>
        );
      },
    },
    {
      header: 'Tanggal Nilai',
      accessorKey: 'createdAt',
      cell: (info: any) => new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(info.getValue())),
    },
  ], []);

  const totalData = data?.meta?.totalData ?? 0;
  const listData = data?.data ?? [];

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden border border-gray-200 shadow-sm rounded-xl" bodyClassName="p-0">
        <DefaultTable 
          columnDefs={columns} 
          data={listData} 
          loading={isLoading} 
        />
      </Card>
      
      {totalData > 0 && (
        <PaginationPage
          page={penilaianPage}
          limit={penilaianLimit}
          totalData={totalData}
          onPageChange={setPenilaianPage}
          onLimitChange={setPenilaianLimit}
        />
      )}
    </div>
  );
};

export default DetailAsistenPenilaianTable;
