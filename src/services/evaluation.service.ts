import api from './api'
import type { ApiResponse, Penilaian, PaginatedResponse } from '@/types'

export async function getMyAssignments(sessionId?: string) {
  const res = await api.get<ApiResponse<PaginatedResponse<Penilaian>>>('/penilaian/my-assignments', {
    params: sessionId ? { session: sessionId } : undefined,
  })
  return res.data
}

export async function submitPenilaian(data: {
  calasRef: string
  examSessionRef: string
  jenisUjian: string
  kriteria: Record<string, number>
  deskripsi: string
}) {
  const res = await api.post<ApiResponse<Penilaian>>('/penilaian', data)
  return res.data
}

export async function getMyScores() {
  const res = await api.get<ApiResponse<PaginatedResponse<Penilaian>>>('/penilaian/my-scores')
  return res.data
}
