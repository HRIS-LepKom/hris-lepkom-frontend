import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './guards'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import ForgotPassword from '@/pages/auth/ForgotPassword'
import ResetPassword from '@/pages/auth/ResetPassword'
import ForceChangePassword from '@/pages/auth/ForceChangePassword'
import AdminDashboard from '@/pages/dashboard/AdminDashboard'
import RecruitmentToggle from '@/pages/admin/RecruitmentToggle'
import CalasManagement from '@/pages/admin/CalasManagement'
import CalasDetail from '@/pages/admin/CalasDetail'
import CalasDashboard from '@/pages/dashboard/CalasDashboard'
import PenilaiDashboard from '@/pages/dashboard/PenilaiDashboard'
import KorlapDashboard from '@/pages/dashboard/KorlapDashboard'
import PJRuanganDashboard from '@/pages/dashboard/PJRuanganDashboard'
import PJSoalDashboard from '@/pages/dashboard/PJSoalDashboard'
import BiodataForm from '@/pages/candidates/BiodataForm'
import DocumentUpload from '@/pages/candidates/DocumentUpload'
import TimelineTracker from '@/pages/candidates/TimelineTracker'
import ExamDownload from '@/pages/candidates/ExamDownload'
import ExamUploadPraktek from '@/pages/candidates/ExamUploadPraktek'
import ExamUploadProject from '@/pages/candidates/ExamUploadProject'
import ScoreForm from '@/pages/evaluations/ScoreForm'
import ScoreHistory from '@/pages/evaluations/ScoreHistory'
import SessionList from '@/pages/scheduling/SessionList'
import SessionForm from '@/pages/scheduling/SessionForm'
import RoomAssignment from '@/pages/scheduling/RoomAssignment'
import RoomPlacement from '@/pages/scheduling/RoomPlacement'
import KanbanBoard from '@/pages/scheduling/KanbanBoard'
import AssistantsPage from '@/pages/master-data/AssistantsPage'
import MaterialsPage from '@/pages/master-data/MaterialsPage'
import QuestionsPage from '@/pages/master-data/QuestionsPage'
import QuestionCardsPage from '@/pages/master-data/QuestionCardsPage'
import NotFound from '@/pages/NotFound'

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },
  {
    path: '/force-change-password',
    element: (
      <ProtectedRoute>
        <ForceChangePassword />
      </ProtectedRoute>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'admin', element: <AdminDashboard /> },
      { path: 'admin/recruitment-toggle', element: <RecruitmentToggle /> },
      { path: 'admin/calas-management', element: <CalasManagement /> },
      { path: 'admin/calas/:id', element: <CalasDetail /> },
      { path: 'calas', element: <CalasDashboard /> },
      { path: 'calas/biodata', element: <BiodataForm /> },
      { path: 'calas/documents', element: <DocumentUpload /> },
      { path: 'calas/timeline', element: <TimelineTracker /> },
      { path: 'calas/exam-download', element: <ExamDownload /> },
      { path: 'calas/exam-praktek', element: <ExamUploadPraktek /> },
      { path: 'calas/exam-project', element: <ExamUploadProject /> },
      { path: 'penilai', element: <PenilaiDashboard /> },
      { path: 'penilai/score/:id', element: <ScoreForm /> },
      { path: 'penilai/history', element: <ScoreHistory /> },
      { path: 'korlap', element: <KorlapDashboard /> },
      { path: 'korlap/rooms', element: <RoomAssignment /> },
      { path: 'korlap/kanban', element: <KanbanBoard /> },
      { path: 'scheduling/session-list', element: <SessionList /> },
      { path: 'scheduling/session-create', element: <SessionForm /> },
      { path: 'scheduling/room-placement', element: <RoomPlacement /> },
      { path: 'pj-ruangan', element: <PJRuanganDashboard /> },
      { path: 'pj-soal', element: <PJSoalDashboard /> },
      { path: 'master-data/assistants', element: <AssistantsPage /> },
      { path: 'master-data/materials', element: <MaterialsPage /> },
      { path: 'master-data/questions', element: <QuestionsPage /> },
      { path: 'master-data/question-cards', element: <QuestionCardsPage /> },
    ],
  },
  { path: '*', element: <NotFound /> },
])
