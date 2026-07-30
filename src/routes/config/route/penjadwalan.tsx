import { lazy } from 'react';
import { ErrorPage } from '@/features/shared/error';
import LazyRoute from '@/components/layout/LazyRoute';
import { path } from '@/utils/consts';

const PenjadwalanPage = lazy(() => import('@/pages/lepkom/penjadwalan'));
const SessionPage = lazy(() => import('@/pages/lepkom/penjadwalan/session'));
const RoomAssignmentPage = lazy(() => import('@/pages/lepkom/penjadwalan/room-assignment'));
const RoomPlacementPage = lazy(() => import('@/pages/lepkom/penjadwalan/room-placement'));

export const penjadwalanRoute = [
  {
    path: path.lepkom.penjadwalan.default,
    element: <LazyRoute component={PenjadwalanPage} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.penjadwalan.session.default,
    element: <LazyRoute component={SessionPage} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.penjadwalan.roomAssignment.default,
    element: <LazyRoute component={RoomAssignmentPage} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.penjadwalan.roomPlacement.default,
    element: <LazyRoute component={RoomPlacementPage} />,
    elementError: <ErrorPage />
  }
];
