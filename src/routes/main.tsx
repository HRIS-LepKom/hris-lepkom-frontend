import { createBrowserRouter } from 'react-router-dom';
import UserLayout from '@/components/layout/UserLayout';
import ProtectedRoute from '@/components/layout/protected-view/ProtectedRoute';
import ProtectedAccessPermission from '@/components/layout/protected-view/ProtectedAccessPermission';

import { ErrorNotFound, ErrorPermission, PublicErrorNotFound } from '@/features/shared/error';
import LoginPage from '@/features/auth/modules/login';
import RegisterPage from '@/features/auth/modules/register';
import RequestResetPage from '@/features/shared/reset-password/pages/RequestResetPage';
import ForceChangePasswordPage from '@/features/shared/reset-password/pages/ForceChangePasswordPage';
import LandingPage from '@/features/shared/landing-page';

import {
  dashboardRoute,
  masterDataRoute,
  biodataRoute,
  calasSoalRoute,
  penugasanRoute,
  jadwalRoute
} from './config/route';

import { mainMenus } from './config/menu';

export { mainMenus };

export const mainRoutes = createBrowserRouter(
  [
    {
      path: '/',
      element: <LandingPage />
    },
    {
      element: (
        <ProtectedRoute>
          <ProtectedAccessPermission>
            <UserLayout />
          </ProtectedAccessPermission>
        </ProtectedRoute>
      ),
      children: [
        ...dashboardRoute,
        ...masterDataRoute,
        ...biodataRoute,
        ...calasSoalRoute,
        ...penugasanRoute,
        ...jadwalRoute,
        {
          path: '/not-permitted',
          element: <ErrorPermission />
        },
        {
          path: '*',
          element: <ErrorNotFound />
        }
      ]
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/register',
      element: <RegisterPage />
    },
    {
      path: '/forgot-password',
      element: <RequestResetPage />
    },
    {
      path: '/force-change-password',
      element: (
        <ProtectedRoute>
          <ForceChangePasswordPage />
        </ProtectedRoute>
      )
    },
    {
      path: '*',
      element: <PublicErrorNotFound />
    }
  ]
);
