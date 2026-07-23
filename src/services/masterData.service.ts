import api from './api'
import type { ApiResponse, Materi, Soal, QuestionCard, PaginatedResponse } from '@/types'

// ─── Materi ───────────────────────────────────────────────────────────────────

export async function getMateriList(params?: { tingkat?: number }) {
  const res = await api.get<ApiResponse<PaginatedResponse<Materi>>>('/materi', { params })
  return res.data
}

export async function createMateri(data: { namaMateri: string; tingkat: number; deskripsi?: string }) {
  const res = await api.post<ApiResponse<Materi>>('/materi', data)
  return res.data
}

export async function updateMateri(id: string, data: Partial<Materi>) {
  const res = await api.put<ApiResponse<Materi>>(`/materi/${id}`, data)
  return res.data
}

export async function deleteMateri(id: string) {
  const res = await api.delete<ApiResponse<null>>(`/materi/${id}`)
  return res.data
}

// ─── Soal ─────────────────────────────────────────────────────────────────────

export async function getSoalList(params?: { tingkat?: number }) {
  const res = await api.get<ApiResponse<PaginatedResponse<Soal>>>('/soal', { params })
  return res.data
}

export async function createSoal(data: { judulSoal: string; tingkat: number; file: File }) {
  const formData = new FormData()
  formData.append('judulSoal', data.judulSoal)
  formData.append('tingkat', String(data.tingkat))
  formData.append('file', data.file)
  const res = await api.post<ApiResponse<Soal>>('/soal', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

export async function deleteSoal(id: string) {
  const res = await api.delete<ApiResponse<null>>(`/soal/${id}`)
  return res.data
}

export async function downloadSoal(id: string) {
  const res = await api.get(`/soal/${id}/download`, { responseType: 'blob' })
  return res.data
}

// ─── Question Card ────────────────────────────────────────────────────────────

export async function getQuestionCardList() {
  const res = await api.get<ApiResponse<PaginatedResponse<QuestionCard>>>('/question-cards')
  return res.data
}

export async function createQuestionCard(data: { judulPertanyaan: string; deskripsi?: string }) {
  const res = await api.post<ApiResponse<QuestionCard>>('/question-cards', data)
  return res.data
}

export async function updateQuestionCard(id: string, data: Partial<QuestionCard>) {
  const res = await api.put<ApiResponse<QuestionCard>>(`/question-cards/${id}`, data)
  return res.data
}

export async function deleteQuestionCard(id: string) {
  const res = await api.delete<ApiResponse<null>>(`/question-cards/${id}`)
  return res.data
}
