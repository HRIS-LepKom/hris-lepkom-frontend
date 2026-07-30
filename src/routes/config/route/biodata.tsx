import { lazy } from 'react';
import { ErrorPage } from '@/features/shared/error';
import LazyRoute from '@/components/layout/LazyRoute';
import { path } from '@/utils/consts';

const BiodataPage = lazy(() => import('@/pages/lepkom/biodata'));
const PersonalPage = lazy(() => import('@/pages/lepkom/biodata/personal'));
const PendidikanPage = lazy(() => import('@/pages/lepkom/biodata/pendidikan'));
const KeluargaPage = lazy(() => import('@/pages/lepkom/biodata/keluarga'));
const BerkasPage = lazy(() => import('@/pages/lepkom/biodata/berkas'));

export const biodataRoute = [
  {
    path: path.lepkom.biodata.default,
    element: <LazyRoute component={BiodataPage} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.biodata.personal.default,
    element: <LazyRoute component={PersonalPage} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.biodata.pendidikan.default,
    element: <LazyRoute component={PendidikanPage} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.biodata.keluarga.default,
    element: <LazyRoute component={KeluargaPage} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.biodata.berkas.default,
    element: <LazyRoute component={BerkasPage} />,
    elementError: <ErrorPage />
  }
];
