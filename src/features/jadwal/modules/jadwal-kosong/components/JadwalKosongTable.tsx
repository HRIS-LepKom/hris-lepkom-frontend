import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import DefaultTable from '@/components/table/DefaultTable';
import PaginationPage from '@/components/pagination/PaginationPage';
import useTableFiltersSortUrlSync from '@/hooks/shared/useTableFiltersSortUrlSync';
import { path } from '@/utils/consts';
import { useAuthStore } from '@/features/auth/shared/store';
import { useGetJadwalKosong } from '../api/jadwalKosong.api';
import { getJadwalKosongColumns } from '../variables/listJadwalKosongColumns';
import { useJadwalKosongActions } from '../hooks/useJadwalKosongActions';

const DETAIL_PATH = path.lepkom.jadwal.jadwalKosong.detail || '/lepkom/jadwal/jadwal-kosong/detail';

export const JadwalKosongTable = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isAllowedToManage = user?.role === 'super_admin' || user?.role === 'pj_jadwal';
  const isSuperAdmin = user?.role === 'super_admin';

  const {
    columnFilters,
    setColumnFilters,
    sort,
    setState,
    pageSize,
    currentPage,
  } = useTableFiltersSortUrlSync({ listUrlBase: path.lepkom.jadwal.jadwalKosong.default });

  const actions = useJadwalKosongActions();

  const columns = useMemo(
    () => getJadwalKosongColumns({
      handleEdit: actions.openEditModal,
      handleDelete: actions.openDeleteModal,
      handleDetail: (row) => navigate(`${DETAIL_PATH}?id=${row._id}`),
    }, currentPage, pageSize, isAllowedToManage, isSuperAdmin),
    [actions, currentPage, pageSize, isAllowedToManage, isSuperAdmin, navigate]
  );

  const queryParams = new URLSearchParams();
  queryParams.set('page', String(currentPage));
  queryParams.set('limit', String(pageSize));
  
  if (sort) {
    const [sortBy, sortOrder] = sort.split(',');
    queryParams.set('sortBy', sortBy);
    queryParams.set('sortOrder', sortOrder);
  }

  columnFilters.forEach((filter) => {
    if (filter.id === 'global_search' || filter.id === 'judul') {
      queryParams.set('search', filter.value);
    } else {
      queryParams.set(filter.id, filter.value);
    }
  });

  const queryString = `?${queryParams.toString()}`;

  const { data, isLoading, isError, error } = useGetJadwalKosong(queryString);

  const errorMsg = error ? (error as any)?.response?.data?.message || 'Gagal memuat data jadwal kosong' : '';

  return (
    <Card className="flex flex-col gap-4">
      <DefaultTable
        title="Daftar Jadwal Kosong"
        data={data?.data || []}
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
          title: 'Data tidak ditemukan',
          subTitle: 'Belum ada jadwal kosong yang ditambahkan.'
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
  );
};
