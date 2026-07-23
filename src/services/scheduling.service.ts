import api from './api'
import type { ApiResponse, ExamSession, RoomAssignment, RoomPlacement, PaginatedResponse } from '@/types'

// ─── Exam Session ─────────────────────────────────────────────────────────────

export async function getExamSessionList() {
  const res = await api.get<ApiResponse<PaginatedResponse<ExamSession>>>('/exam-sessions')
  return res.data
}

export async function createExamSession(data: { tanggal: string; jenisUjian: string; catatan?: string }) {
  const res = await api.post<ApiResponse<ExamSession>>('/exam-sessions', data)
  return res.data
}

// ─── Room Assignment (PJ per ruangan) ─────────────────────────────────────────

export async function getRoomAssignments(sessionId: string) {
  const res = await api.get<ApiResponse<RoomAssignment[]>>(`/room-assignments?session=${sessionId}`)
  return res.data
}

export async function setRoomAssignment(data: { examSessionRef: string; ruangan: number; pjRuanganRef: string }) {
  const res = await api.post<ApiResponse<RoomAssignment>>('/room-assignments', data)
  return res.data
}

// ─── Room Placement (calas + penilai per ruangan) ─────────────────────────────

export async function getRoomPlacements(sessionId: string) {
  const res = await api.get<ApiResponse<RoomPlacement[]>>(`/room-placements?session=${sessionId}`)
  return res.data
}

export async function setRoomPlacement(data: {
  examSessionRef: string
  ruangan: number
  calasList: string[]
  penilaiList: string[]
}) {
  const res = await api.post<ApiResponse<RoomPlacement>>('/room-placements', data)
  return res.data
}

export async function updateRoomPlacement(id: string, data: {
  calasList: string[]
  penilaiList: string[]
}) {
  const res = await api.put<ApiResponse<RoomPlacement>>(`/room-placements/${id}`, data)
  return res.data
}
