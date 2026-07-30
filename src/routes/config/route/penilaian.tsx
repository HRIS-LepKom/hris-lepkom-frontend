import { lazy } from 'react';
import { ErrorPage } from '@/features/shared/error';
import LazyRoute from '@/components/layout/LazyRoute';
import { path } from '@/utils/consts';

const PenilaianPage = lazy(() => import('@/pages/lepkom/penilaian'));
const NilaiPraktek = lazy(() => import('@/pages/lepkom/penilaian/praktek'));
const NilaiProject = lazy(() => import('@/pages/lepkom/penilaian/project'));

export const penilaianRoute = [
  {
    path: path.lepkom.penilaian.default,
    element: <LazyRoute component={PenilaianPage} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.penilaian.praktek.default,
    element: <LazyRoute component={NilaiPraktek} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.penilaian.project.default,
    element: <LazyRoute component={NilaiProject} />,
    elementError: <ErrorPage />
  }
];
