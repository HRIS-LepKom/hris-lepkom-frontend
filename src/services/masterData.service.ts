import api from './api'
import type { ApiResponse, Materi, Soal, QuestionCard, PaginatedResponse } from '@/types'
import { MOCK_MATERI, MOCK_SOAL, MOCK_QUESTION_CARDS } from '@/data/mockData'

// ─── Materi ───────────────────────────────────────────────────────────────────

export async function getMateriList(params?: { tingkat?: number }) {
  try {
    const res = await api.get<ApiResponse<PaginatedResponse<Materi>>>('/materi', { params })
    return res.data
  } catch (err) {
    let list = [...MOCK_MATERI]
    if (params?.tingkat) {
      list = list.filter((m) => m.tingkat === Number(params.tingkat))
    }
    return {
      success: true,
      data: {
        success: true,
        data: list,
        total: list.length,
        page: 1,
        limit: 50,
      },
    }
  }
}

export async function createMateri(data: { namaMateri: string; tingkat: number; deskripsi?: string }) {
  try {
    const res = await api.post<ApiResponse<Materi>>('/materi', data)
    return res.data
  } catch (err) {
    const newItem: Materi = {
      _id: `mat-${Date.now()}`,
      namaMateri: data.namaMateri,
      tingkat: data.tingkat as any,
      deskripsi: data.deskripsi,
      dibuatOleh: 'AST-005',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    MOCK_MATERI.unshift(newItem)
    return { success: true, data: newItem }
  }
}

export async function updateMateri(id: string, data: Partial<Materi>) {
  try {
    const res = await api.put<ApiResponse<Materi>>(`/materi/${id}`, data)
    return res.data
  } catch (err) {
    const idx = MOCK_MATERI.findIndex((m) => m._id === id)
    if (idx !== -1) {
      MOCK_MATERI[idx] = { ...MOCK_MATERI[idx], ...data, updatedAt: new Date().toISOString() }
      return { success: true, data: MOCK_MATERI[idx] }
    }
    return { success: true, data: MOCK_MATERI[0] }
  }
}

export async function deleteMateri(id: string) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/materi/${id}`)
    return res.data
  } catch (err) {
    const idx = MOCK_MATERI.findIndex((m) => m._id === id)
    if (idx !== -1) {
      MOCK_MATERI.splice(idx, 1)
    }
    return { success: true, data: null }
  }
}

// ─── Soal ─────────────────────────────────────────────────────────────────────

export async function getSoalList(params?: { tingkat?: number }) {
  try {
    const res = await api.get<ApiResponse<PaginatedResponse<Soal>>>('/soal', { params })
    return res.data
  } catch (err) {
    let list = [...MOCK_SOAL]
    if (params?.tingkat) {
      list = list.filter((s) => s.tingkat === Number(params.tingkat))
    }
    return {
      success: true,
      data: {
        success: true,
        data: list,
        total: list.length,
        page: 1,
        limit: 50,
      },
    }
  }
}

export async function createSoal(data: { judulSoal: string; tingkat: number; file: File }) {
  try {
    const formData = new FormData()
    formData.append('judulSoal', data.judulSoal)
    formData.append('tingkat', String(data.tingkat))
    formData.append('file', data.file)
    const res = await api.post<ApiResponse<Soal>>('/soal', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
  } catch (err) {
    const newItem: Soal = {
      _id: `sol-${Date.now()}`,
      judulSoal: data.judulSoal,
      tingkat: data.tingkat as any,
      file: `/files/${data.file.name}`,
      dibuatOleh: 'AST-005',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    MOCK_SOAL.unshift(newItem)
    return { success: true, data: newItem }
  }
}

export async function deleteSoal(id: string) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/soal/${id}`)
    return res.data
  } catch (err) {
    const idx = MOCK_SOAL.findIndex((s) => s._id === id)
    if (idx !== -1) {
      MOCK_SOAL.splice(idx, 1)
    }
    return { success: true, data: null }
  }
}

export async function downloadSoal(id: string) {
  try {
    const res = await api.get(`/soal/${id}/download`, { responseType: 'blob' })
    return res.data
  } catch (err) {
    return new Blob(['Mock PDF Content for Soal'], { type: 'application/pdf' })
  }
}

// ─── Question Card ────────────────────────────────────────────────────────────

export async function getQuestionCardList() {
  try {
    const res = await api.get<ApiResponse<PaginatedResponse<QuestionCard>>>('/question-cards')
    return res.data
  } catch (err) {
    return {
      success: true,
      data: {
        success: true,
        data: [...MOCK_QUESTION_CARDS],
        total: MOCK_QUESTION_CARDS.length,
        page: 1,
        limit: 50,
      },
    }
  }
}

export async function createQuestionCard(data: { judulPertanyaan: string; deskripsi?: string }) {
  try {
    const res = await api.post<ApiResponse<QuestionCard>>('/question-cards', data)
    return res.data
  } catch (err) {
    const newItem: QuestionCard = {
      _id: `qc-${Date.now()}`,
      judulPertanyaan: data.judulPertanyaan,
      deskripsi: data.deskripsi,
      dibuatOleh: 'AST-005',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    MOCK_QUESTION_CARDS.unshift(newItem)
    return { success: true, data: newItem }
  }
}

export async function updateQuestionCard(id: string, data: Partial<QuestionCard>) {
  try {
    const res = await api.put<ApiResponse<QuestionCard>>(`/question-cards/${id}`, data)
    return res.data
  } catch (err) {
    const idx = MOCK_QUESTION_CARDS.findIndex((q) => q._id === id)
    if (idx !== -1) {
      MOCK_QUESTION_CARDS[idx] = { ...MOCK_QUESTION_CARDS[idx], ...data, updatedAt: new Date().toISOString() }
      return { success: true, data: MOCK_QUESTION_CARDS[idx] }
    }
    return { success: true, data: MOCK_QUESTION_CARDS[0] }
  }
}

export async function deleteQuestionCard(id: string) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/question-cards/${id}`)
    return res.data
  } catch (err) {
    const idx = MOCK_QUESTION_CARDS.findIndex((q) => q._id === id)
    if (idx !== -1) {
      MOCK_QUESTION_CARDS.splice(idx, 1)
    }
    return { success: true, data: null }
  }
}
