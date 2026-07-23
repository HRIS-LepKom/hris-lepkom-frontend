import api from './api'
import type { ApiResponse, User, PaginatedResponse } from '@/types'

export async function getAsistenList(params?: { page?: number; limit?: number; search?: string }) {
  const res = await api.get<ApiResponse<PaginatedResponse<User>>>('/asisten', { params })
  return res.data
}

export async function getAsistenById(id: string) {
  const res = await api.get<ApiResponse<User>>(`/asisten/${id}`)
  return res.data
}

export async function createAsisten(data: { npm: string; nama: string; email: string; password: string }) {
  const res = await api.post<ApiResponse<User>>('/asisten', data)
  return res.data
}

export async function updateAsisten(id: string, data: Partial<User>) {
  const res = await api.put<ApiResponse<User>>(`/asisten/${id}`, data)
  return res.data
}

export async function deleteAsisten(id: string) {
  const res = await api.delete<ApiResponse<null>>(`/asisten/${id}`)
  return res.data
}

export async function importAsisten(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  const res = await api.post<ApiResponse<{ imported: number }>>('/asisten/import', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

export async function assignRole(id: string, role: string) {
  const res = await api.put<ApiResponse<User>>(`/asisten/${id}/role`, { role })
  return res.data
}
