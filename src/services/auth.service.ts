import api from './api'
import type { AuthLoginRequest, AuthLoginResponse, AuthRegisterRequest, ApiResponse, User } from '@/types'

export async function login(data: AuthLoginRequest) {
  const res = await api.post<ApiResponse<AuthLoginResponse>>('/auth/login', data)
  return res.data
}

export async function register(data: AuthRegisterRequest) {
  const res = await api.post<ApiResponse<{ token: string; user: User }>>('/auth/register', data)
  return res.data
}

export async function forgotPassword(email: string) {
  const res = await api.post<ApiResponse<null>>('/auth/forgot-password', { email })
  return res.data
}

export async function resetPassword(token: string, password: string) {
  const res = await api.post<ApiResponse<null>>('/auth/reset-password', { token, password })
  return res.data
}

export async function changePassword(oldPassword: string, newPassword: string) {
  const res = await api.put<ApiResponse<null>>('/auth/change-password', { oldPassword, newPassword })
  return res.data
}

export async function hardResetRequest(input: string) {
  const res = await api.post<ApiResponse<null>>('/auth/hard-reset-request', { input })
  return res.data
}

export async function approveHardReset(id: string) {
  const res = await api.put<ApiResponse<null>>(`/auth/hard-reset/${id}/approve`)
  return res.data
}
