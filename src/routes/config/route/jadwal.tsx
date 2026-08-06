import { lazy } from 'react';
import { ErrorPage } from '@/features/shared/error';
import LazyRoute from '@/components/layout/LazyRoute';
import { path } from '@/utils/consts';

const jadwalDashboard = lazy(() => import('@/features/jadwal'));

const JadwalKosongDashboard = lazy(() => import('@/features/jadwal/modules/jadwal-kosong'));
const DetailJadwalKosong = lazy(() => import('@/features/jadwal/modules/detail-jadwal-kosong'));

export const jadwalRoute = [
  {
    path: path.lepkom.jadwal.default,
    element: <LazyRoute component={jadwalDashboard} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.jadwal.jadwalKosong.default,
    element: <LazyRoute component={JadwalKosongDashboard} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.jadwal.jadwalKosong.detail,
    element: <LazyRoute component={DetailJadwalKosong} />,
    elementError: <ErrorPage />
  }
];
