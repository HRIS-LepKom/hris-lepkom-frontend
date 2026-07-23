import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth.store'
import * as authService from '@/services/auth.service'

export function useAuth() {
  const { token, user, setAuth, logout } = useAuthStore()
  const navigate = useNavigate()

  const login = useCallback(async (email: string, password: string) => {
    const res = await authService.login({ email, password })
    if (res.success && res.data) {
      setAuth(res.data.token, res.data.user)
      navigate('/')
    }
    return res
  }, [setAuth, navigate])

  const register = useCallback(async (data: {
    nama: string
    npm: string
    email: string
    password: string
    kelas: string
  }) => {
    const res = await authService.register(data)
    if (res.success && res.data) {
      setAuth(res.data.token, res.data.user)
      navigate('/')
    }
    return res
  }, [setAuth, navigate])

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
