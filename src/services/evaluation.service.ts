import api from './api'
import type { ApiResponse, Penilaian, PaginatedResponse } from '@/types'
import { MOCK_PENILAIAN_LIST } from '@/data/mockData'

export async function getMyAssignments(sessionId?: string) {
  try {
    const res = await api.get<ApiResponse<PaginatedResponse<Penilaian>>>('/penilaian/my-assignments', {
      params: sessionId ? { session: sessionId } : undefined,
    })
    return res.data
  } catch (err) {
    return {
      success: true,
      data: {
        success: true,
        data: [...MOCK_PENILAIAN_LIST],
        total: MOCK_PENILAIAN_LIST.length,
        page: 1,
        limit: 50,
      },
    }
  }
}

export async function submitPenilaian(data: {
  calasRef: string
  examSessionRef: string
  jenisUjian: string
  kriteria: Record<string, number>
  deskripsi: string
}) {
  try {
    const res = await api.post<ApiResponse<Penilaian>>('/penilaian', data)
    return res.data
  } catch (err) {
    const values = Object.values(data.kriteria)
    const avg = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0

    const newItem: Penilaian = {
      _id: `pnl-${Date.now()}`,
      calasRef: data.calasRef,
      penilaiRef: 'ast-011',
      examSessionRef: data.examSessionRef,
      jenisUjian: data.jenisUjian as any,
      kriteria: data.kriteria,
      deskripsi: data.deskripsi,
      skorKeseluruhan: Number(avg.toFixed(2)),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    MOCK_PENILAIAN_LIST.unshift(newItem)
    return { success: true, data: newItem }
  }
}

export async function getMyScores() {
  try {
    const res = await api.get<ApiResponse<PaginatedResponse<Penilaian>>>('/penilaian/my-scores')
    return res.data
  } catch (err) {
    const filled = MOCK_PENILAIAN_LIST.filter((p) => p.skorKeseluruhan > 0)
    return {
      success: true,
      data: {
        success: true,
        data: filled,
        total: filled.length,
        page: 1,
        limit: 50,
      },
    }
  }
}
