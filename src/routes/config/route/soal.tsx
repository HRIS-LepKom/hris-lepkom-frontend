import { lazy } from 'react';
import { ErrorPage } from '@/features/shared/error';
import LazyRoute from '@/components/layout/LazyRoute';
import { path } from '@/utils/consts';

const SoalPage = lazy(() => import('@/pages/lepkom/soal'));
const MateriPage = lazy(() => import('@/pages/lepkom/soal/materi'));
const DaftarSoalPage = lazy(() => import('@/pages/lepkom/soal/daftar-soal'));
const QuestionCardPage = lazy(() => import('@/pages/lepkom/soal/question-card'));

export const soalRoute = [
  {
    path: path.lepkom.soal.default,
    element: <LazyRoute component={SoalPage} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.soal.materi.default,
    element: <LazyRoute component={MateriPage} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.soal.daftarSoal.default,
    element: <LazyRoute component={DaftarSoalPage} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.soal.questionCard.default,
    element: <LazyRoute component={QuestionCardPage} />,
    elementError: <ErrorPage />
  }
];
