import { lazy } from 'react';
import { ErrorPage } from '@/features/shared/error';
import LazyRoute from '@/components/layout/LazyRoute';
import { path } from '@/utils/consts';

const UjianPage = lazy(() => import('@/pages/lepkom/ujian'));
const UjianPraktek = lazy(() => import('@/pages/lepkom/ujian/praktek'));
const UjianProject = lazy(() => import('@/pages/lepkom/ujian/project'));

export const ujianRoute = [
  {
    path: path.lepkom.ujian.default,
    element: <LazyRoute component={UjianPage} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.ujian.praktek.default,
    element: <LazyRoute component={UjianPraktek} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.ujian.project.default,
    element: <LazyRoute component={UjianProject} />,
    elementError: <ErrorPage />
  }
];
