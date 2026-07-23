import api from './api'
import type { ApiResponse, Calas, PaginatedResponse } from '@/types'

export async function getCalasList(params?: { page?: number; limit?: number; search?: string }) {
  const res = await api.get<ApiResponse<PaginatedResponse<Calas>>>('/calas', { params })
  return res.data
}

export async function getCalasById(id: string) {
  const res = await api.get<ApiResponse<Calas>>(`/calas/${id}`)
  return res.data
}

export async function getMyProfile() {
  const res = await api.get<ApiResponse<Calas>>('/calas/me')
  return res.data
}

export async function updateMyBiodata(data: Partial<Calas>) {
  const res = await api.put<ApiResponse<Calas>>('/calas/me/biodata', data)
  return res.data
}

export async function uploadMyDocument(file: File, type: 'cv' | 'krs' | 'rangkumanNilai') {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('type', type)
  const res = await api.post<ApiResponse<{ url: string }>>('/calas/me/documents', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

export async function updateTimeline(id: string, tahapSaatIni: string, hasil?: string) {
  const res = await api.put<ApiResponse<Calas>>(`/calas/${id}/timeline`, { tahapSaatIni, hasil })
  return res.data
}

export async function resetCalasProcess(id: string) {
  const res = await api.put<ApiResponse<Calas>>(`/calas/${id}/reset`)
  return res.data
}

export async function banCalas(id: string) {
  const res = await api.put<ApiResponse<Calas>>(`/calas/${id}/ban`)
  return res.data
}
