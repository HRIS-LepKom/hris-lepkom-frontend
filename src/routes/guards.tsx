import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth.store'
import type { ReactNode } from 'react'

const ROLE_DASHBOARD: Record<string, string> = {
  super_admin: '/admin',
  pj_soal_materi: '/pj-soal',
  koordinator_lapangan: '/korlap',
  penanggung_jawab_ruangan: '/pj-ruangan',
  asisten_penilai: '/penilai',
  asisten: '/calas',
  staff: '/admin',
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = useAuthStore((s) => s.token)
  const user = useAuthStore((s) => s.user)
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (user && location.pathname === '/') {
    const dashboard = ROLE_DASHBOARD[user.role] || '/login'
    return <Navigate to={dashboard} replace />
  }

  return <>{children}</>
}
