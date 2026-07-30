import { lazy } from 'react';
import { ErrorPage } from '@/features/shared/error';
import LazyRoute from '@/components/layout/LazyRoute';
import { path } from '@/utils/consts';

const DashboardFSD = lazy(() => import('@/features/dashboard'));
const DashboardPengumuman = lazy(() => import('@/pages/lepkom/dashboard/pengumuman'));

export const dashboardRoute = [
  {
    path: path.lepkom.dashboard.default,
    element: <LazyRoute component={DashboardFSD} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.dashboard.pengumuman.default,
    element: <LazyRoute component={DashboardPengumuman} />,
    elementError: <ErrorPage />
  }
];
