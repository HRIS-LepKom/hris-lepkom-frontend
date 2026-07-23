import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth.store'
import * as authService from '@/services/auth.service'
import type { Role, User } from '@/types'

export function getRoleDashboard(role?: Role): string {
  switch (role) {
    case 'super_admin':
      return '/admin'
    case 'pj_soal_materi':
      return '/pj-soal'
    case 'koordinator_lapangan':
      return '/korlap'
    case 'penanggung_jawab_ruangan':
      return '/pj-ruangan'
    case 'asisten_penilai':
      return '/penilai'
    case 'asisten':
    case 'staff':
    default:
      return '/calas'
  }
}

export function useAuth() {
  const { token, user, setAuth, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleRedirectAfterAuth = useCallback(
    (userData: User) => {
      if (userData.wajibGantiPassword) {
        navigate('/force-change-password')
      } else {
        navigate(getRoleDashboard(userData.role))
      }
    },
    [navigate]
  )

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const res = await authService.login({ email, password })
        if (res.success && res.data) {
          setAuth(res.data.token, res.data.user)
          handleRedirectAfterAuth(res.data.user)
        }
        return res
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || err.message || 'Gagal melakukan login'
        return { success: false, error: errorMessage }
      }
    },
    [setAuth, handleRedirectAfterAuth]
  )

  const register = useCallback(
    async (data: {
      nama: string
      npm: string
      email: string
      password: string
      kelas: string
    }) => {
      try {
        const res = await authService.register(data)
        if (res.success && res.data) {
          setAuth(res.data.token, res.data.user)
          handleRedirectAfterAuth(res.data.user)
        }
        return res
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || err.message || 'Gagal melakukan pendaftaran'
        return { success: false, error: errorMessage }
      }
    },
    [setAuth, handleRedirectAfterAuth]
  )

  const handleLogout = useCallback(() => {
    logout()
    navigate('/login')
  }, [logout, navigate])

  return {
    token,
    user,
    isAuthenticated: !!token,
    login,
    register,
    logout: handleLogout,
  }
}
