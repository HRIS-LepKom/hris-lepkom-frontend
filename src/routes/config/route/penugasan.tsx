import { lazy } from 'react';
import { ErrorPage } from '@/features/shared/error';
import LazyRoute from '@/components/layout/LazyRoute';
import { path } from '@/utils/consts';

const DashboardPengumuman = lazy(() => import('@/pages/lepkom/dashboard/pengumuman'));
const PenugasanDasboard = lazy(() => import('@/features/penugasan'))

export const penugasanRoute = [
  {
    path: path.lepkom.penugasan.default, // untuk ke halaman menu penugasan
    element: <LazyRoute component={PenugasanDasboard} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.penugasan.praktek.default, // untuk ke menu dashboard penugasan ujian praktek
    element: <LazyRoute component={DashboardPengumuman} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.penugasan.praktek.form, // untuk ke formulir penugasan
    element: <LazyRoute component={DashboardPengumuman} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.penugasan.project.default, // untuk ke formulir penugasan
    element: <LazyRoute component={DashboardPengumuman} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.penugasan.project.form, // untuk ke formulir penugasan
    element: <LazyRoute component={DashboardPengumuman} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.penugasan.checkUploadJawaban.default, // untuk ke dashboard pengecekan upload jawaban
    element: <LazyRoute component={DashboardPengumuman} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.penugasan.penempatanRuanganAsisten.default, // untuk ke dashboard penempatan ruangan asisten
    element: <LazyRoute component={DashboardPengumuman} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.penugasan.penempatanRuanganCalas.default, // untuk ke dashboard penempatan ruangan asisten
    element: <LazyRoute component={DashboardPengumuman} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.penugasan.historyPenilaian.default, // untuk ke dashboard penempatan ruangan asisten
    element: <LazyRoute component={DashboardPengumuman} />,
    elementError: <ErrorPage />
  },
];
