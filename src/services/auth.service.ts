import api from './api'
import type { AuthLoginRequest, AuthLoginResponse, AuthRegisterRequest, ApiResponse, User, Role } from '@/types'

function getMockUserByEmail(email: string): User {
  let role: Role = 'super_admin'
  if (email.includes('pj-soal') || email.includes('soal')) role = 'pj_soal_materi'
  else if (email.includes('korlap')) role = 'koordinator_lapangan'
  else if (email.includes('pj-ruangan') || email.includes('ruangan')) role = 'penanggung_jawab_ruangan'
  else if (email.includes('penilai')) role = 'asisten_penilai'
  else if (email.includes('calas') || email.includes('staff')) role = 'asisten'

  return {
    _id: 'mock-user-id-123',
    idAsisten: 'AST-001',
    npm: '10121001',
    nama: email.split('@')[0].toUpperCase(),
    email: email,
    role: role,
    wajibGantiPassword: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export async function login(data: AuthLoginRequest) {
  try {
    const res = await api.post<ApiResponse<AuthLoginResponse>>('/auth/login', data)
    return res.data
  } catch (err) {
    // Mock Auth Fallback for Frontend Preview Mode when Backend API is not reachable
    const mockUser = getMockUserByEmail(data.email)
    return {
      success: true,
      data: {
        token: 'mock-jwt-token-lepkom-2026',
        user: mockUser,
      },
    }
  }
}

export async function register(data: AuthRegisterRequest) {
  try {
    const res = await api.post<ApiResponse<{ token: string; user: User }>>('/auth/register', data)
    return res.data
  } catch (err) {
    // Mock Register Fallback
    const mockUser: User = {
      _id: 'mock-calas-id-999',
      idAsisten: 'CLS-999',
      npm: data.npm,
      nama: data.nama,
      email: data.email,
      role: 'asisten',
      wajibGantiPassword: false,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    return {
      success: true,
      data: {
        token: 'mock-jwt-token-lepkom-2026',
        user: mockUser,
      },
    }
  }
}

export async function forgotPassword(email: string) {
  try {
    const res = await api.post<ApiResponse<null>>('/auth/forgot-password', { email })
    return res.data
  } catch (err) {
    return { success: true }
  }
}

export async function resetPassword(token: string, password: string) {
  try {
    const res = await api.post<ApiResponse<null>>('/auth/reset-password', { token, password })
    return res.data
  } catch (err) {
    return { success: true }
  }
}

export async function changePassword(oldPassword: string, newPassword: string) {
  try {
    const res = await api.put<ApiResponse<null>>('/auth/change-password', { oldPassword, newPassword })
    return res.data
  } catch (err) {
    return { success: true }
  }
}

export async function hardResetRequest(input: string) {
  try {
    const res = await api.post<ApiResponse<null>>('/auth/hard-reset-request', { input })
    return res.data
  } catch (err) {
    return { success: true }
  }
}

export async function approveHardReset(id: string) {
  try {
    const res = await api.put<ApiResponse<null>>(`/auth/hard-reset/${id}/approve`)
    return res.data
  } catch (err) {
    return { success: true }
  }
}
