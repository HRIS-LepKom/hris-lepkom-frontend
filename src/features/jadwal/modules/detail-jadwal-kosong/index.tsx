import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';
import { useAuthStore } from '@/features/auth/shared/store';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import { path } from '@/utils/consts';
import { useGetDetailJadwalKosong } from './api/detailJadwalKosong.api';
import { PageHeader } from './components/PageHeader';
import { getListEntriColumns } from './variables/listEntriColumns';
import DefaultTable from '@/components/table/DefaultTable';
import PaginationPage from '@/components/pagination/PaginationPage';
import { useDetailJadwalKosongActions } from './hooks/useDetailJadwalKosongActions';
import useTableFiltersSortUrlSync from '@/hooks/shared/useTableFiltersSortUrlSync';
import { Card } from '@/components/ui/Card';

const DetailJadwalKosongModule = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get('id') || '';
  
  const { user } = useAuthStore();
  const { setBreadcrumbItems } = useBreadcrumbStore();
  const actions = useDetailJadwalKosongActions(id);

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Jadwal', path: path.lepkom.jadwal.default },
      { label: 'Jadwal Kosong', path: path.lepkom.jadwal.jadwalKosong.default },
      { label: 'Detail Entri', path: `${path.lepkom.jadwal.jadwalKosong.detail}?id=${id}` },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems, id]);

  const {
    columnFilters,
    setColumnFilters,
    sort,
    setState,
    pageSize,
    currentPage,
  } = useTableFiltersSortUrlSync({ listUrlBase: path.lepkom.jadwal.jadwalKosong.detail });

  const queryParams = new URLSearchParams();
  queryParams.set('page', String(currentPage));
  queryParams.set('limit', String(pageSize));
  
  if (sort) {
    const [sortBy, sortOrder] = sort.split(',');
    queryParams.set('sortBy', sortBy);
    queryParams.set('sortOrder', sortOrder);
  }

  columnFilters.forEach((filter) => {
    if (filter.id === 'global_search' || filter.id === 'search') {
      queryParams.set('search', filter.value);
    } else {
      queryParams.set(filter.id, filter.value);
    }
  });

  const searchGlobal = columnFilters.find(f => f.id === 'global_search' || f.id === 'search')?.value as string | undefined;
  const searchNama = columnFilters.find(f => f.id === 'asisten.nama')?.value as string | undefined;
  const searchNpm = columnFilters.find(f => f.id === 'asisten.npm')?.value as string | undefined;
  const searchIdAsisten = columnFilters.find(f => f.id === 'asisten.idAsisten')?.value as string | undefined;
  const searchKelas = columnFilters.find(f => f.id === 'asisten.kelasSaatIni')?.value as string | undefined;
  
  const [sortBy, sortOrder] = sort ? sort.split(',') : [undefined, undefined];

  const { data, isLoading, isError, error } = useGetDetailJadwalKosong({
    id,
    search: searchGlobal,
    nama: searchNama,
    npm: searchNpm,
    idAsisten: searchIdAsisten,
    kelasSaatIni: searchKelas,
    page: currentPage,
    limit: pageSize,
    sortBy,
    sortOrder: sortOrder as 'asc' | 'desc' | undefined,
  });

  const columns = useMemo(() => 
    getListEntriColumns(
      user?._id || '',
      (entri) => actions.handleOpenKursus(entri, entri.asisten._id === user?._id),
      (entri) => actions.handleOpenJadwal(entri, entri.asisten._id === user?._id),
      (entri) => actions.handleOpenJadwalMateri(entri, entri.asisten._id === user?._id)
    ), 
  [user?._id, actions]);

  const errorMsg = error ? (error as any)?.response?.data?.message || 'Gagal memuat data detail' : '';

  if (!id) {
    return (
      <ContentLayout>
        <div className="p-8 text-center text-red-500">Parameter ID tidak valid.</div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout>
      <div className="flex flex-col gap-6">
        {data?.data?.jadwal && (
          <PageHeader
            judul={data.data.jadwal.judul}
            dibuatOleh={data.data.jadwal.dibuatOleh}
            createdAt={data.data.jadwal.createdAt}
            onExport={actions.handleExport}
          />
        )}
        
        <Card className="flex flex-col gap-4">
          <DefaultTable
            title="Daftar Entri Asisten"
            data={data?.data?.entris || []}
            columnDefs={columns as any}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            sort={sort}
            setSort={setState}
            loading={isLoading}
            loadingCountRows={pageSize}
            isError={isError}
            errorMsg={errorMsg}
            emptyState={{
              title: 'Belum ada entri',
              subTitle: 'Tidak ada asisten yang mengisi jadwal kosong ini.',
            }}
          />
          <PaginationPage
            totalData={data?.totalData || 0}
            pageSize={pageSize}
            currentPage={currentPage}
            setPageSize={setState}
            loading={isLoading}
          />
        </Card>
      </div>
    </ContentLayout>
  );
};

export default DetailJadwalKosongModule;
