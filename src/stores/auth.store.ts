import { create } from 'zustand'
import type { User } from '@/types'

interface AuthState {
  token: string | null
  user: User | null
  setAuth: (token: string, user: User) => void
  logout: () => void
}

function loadInitial(): Pick<AuthState, 'token' | 'user'> {
  try {
    const token = localStorage.getItem('token')
    const raw = localStorage.getItem('user')
    const user = raw ? JSON.parse(raw) : null
    return { token, user }
  } catch {
    return { token: null, user: null }
  }
}

const initial = loadInitial()

export const useAuthStore = create<AuthState>((set) => ({
  token: initial.token,
  user: initial.user,
  setAuth: (token, user) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    set({ token, user })
  },
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ token: null, user: null })
  },
}))
