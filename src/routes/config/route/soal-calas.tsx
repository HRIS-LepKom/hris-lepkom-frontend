import { lazy } from 'react';
import { ErrorPage } from '@/features/shared/error';
import LazyRoute from '@/components/layout/LazyRoute';
import { path } from '@/utils/consts';

const DashboardPengumuman = lazy(() => import('@/pages/lepkom/dashboard/pengumuman'));
const CalasSoalDashboard = lazy(() => import('@/features/soal-calas'))
const DaftarSoalPage = lazy(() => import('@/features/soal-calas/modules/daftar-soal'));

export const calasSoalRoute = [
  {
    path: path.lepkom.calasSoal.default, // untuk pergi ke halaman management soal calas & upload jawaban
    element: <LazyRoute component={CalasSoalDashboard} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.calasSoal.daftarSoal.default, // untuk halaman daftar soal
    element: <LazyRoute component={DaftarSoalPage} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.calasSoal.uploadJawaban.default, // untuk halaman upload soal
    element: <LazyRoute component={DashboardPengumuman} />,
    elementError: <ErrorPage />
  },
];
