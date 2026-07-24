import api from './api'
import type { ApiResponse, ExamSession, RoomAssignment, RoomPlacement, PaginatedResponse } from '@/types'
import { MOCK_EXAM_SESSIONS, MOCK_ROOM_ASSIGNMENTS, MOCK_ROOM_PLACEMENTS } from '@/data/mockData'

// ─── Exam Session ─────────────────────────────────────────────────────────────

export async function getExamSessionList() {
  try {
    const res = await api.get<ApiResponse<PaginatedResponse<ExamSession>>>('/exam-sessions')
    return res.data
  } catch (err) {
    return {
      success: true,
      data: {
        success: true,
        data: [...MOCK_EXAM_SESSIONS],
        total: MOCK_EXAM_SESSIONS.length,
        page: 1,
        limit: 50,
      },
    }
  }
}

export async function createExamSession(data: { tanggal: string; jenisUjian: string; catatan?: string }) {
  try {
    const res = await api.post<ApiResponse<ExamSession>>('/exam-sessions', data)
    return res.data
  } catch (err) {
    const newItem: ExamSession = {
      _id: `ses-${Date.now()}`,
      tanggal: data.tanggal,
      jenisUjian: data.jenisUjian as any,
      catatan: data.catatan,
      dibuatOleh: 'AST-003',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    MOCK_EXAM_SESSIONS.unshift(newItem)
    return { success: true, data: newItem }
  }
}

// ─── Room Assignment (PJ per ruangan) ─────────────────────────────────────────

export async function getRoomAssignments(sessionId: string) {
  try {
    const res = await api.get<ApiResponse<RoomAssignment[]>>(`/room-assignments?session=${sessionId}`)
    return res.data
  } catch (err) {
    return {
      success: true,
      data: [...MOCK_ROOM_ASSIGNMENTS],
    }
  }
}

export async function setRoomAssignment(data: { examSessionRef: string; ruangan: number; pjRuanganRef: string }) {
  try {
    const res = await api.post<ApiResponse<RoomAssignment>>('/room-assignments', data)
    return res.data
  } catch (err) {
    const idx = MOCK_ROOM_ASSIGNMENTS.findIndex(
      (ra) => ra.examSessionRef === data.examSessionRef && ra.ruangan === data.ruangan
    )
    if (idx !== -1) {
      MOCK_ROOM_ASSIGNMENTS[idx].pjRuanganRef = data.pjRuanganRef
      return { success: true, data: MOCK_ROOM_ASSIGNMENTS[idx] }
    }
    const newItem: RoomAssignment = {
      _id: `ra-${Date.now()}`,
      examSessionRef: data.examSessionRef,
      ruangan: data.ruangan as any,
      pjRuanganRef: data.pjRuanganRef,
      dibuatOleh: 'AST-003',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    MOCK_ROOM_ASSIGNMENTS.push(newItem)
    return { success: true, data: newItem }
  }
}

// ─── Room Placement (calas + penilai per ruangan) ─────────────────────────────

export async function getRoomPlacements(sessionId: string) {
  try {
    const res = await api.get<ApiResponse<RoomPlacement[]>>(`/room-placements?session=${sessionId}`)
    return res.data
  } catch (err) {
    return {
      success: true,
      data: [...MOCK_ROOM_PLACEMENTS],
    }
  }
}

export async function setRoomPlacement(data: {
  examSessionRef: string
  ruangan: number
  calasList: string[]
  penilaiList: string[]
}) {
  try {
    const res = await api.post<ApiResponse<RoomPlacement>>('/room-placements', data)
    return res.data
  } catch (err) {
    const idx = MOCK_ROOM_PLACEMENTS.findIndex(
      (rp) => rp.examSessionRef === data.examSessionRef && rp.ruangan === data.ruangan
    )
    if (idx !== -1) {
      MOCK_ROOM_PLACEMENTS[idx].calasList = data.calasList
      MOCK_ROOM_PLACEMENTS[idx].penilaiList = data.penilaiList
      return { success: true, data: MOCK_ROOM_PLACEMENTS[idx] }
    }
    const newItem: RoomPlacement = {
      _id: `rp-${Date.now()}`,
      examSessionRef: data.examSessionRef,
      ruangan: data.ruangan as any,
      calasList: data.calasList,
      penilaiList: data.penilaiList,
      dibuatOleh: 'AST-003',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    MOCK_ROOM_PLACEMENTS.push(newItem)
    return { success: true, data: newItem }
  }
}

export async function updateRoomPlacement(
  id: string,
  data: {
    calasList: string[]
    penilaiList: string[]
  }
) {
  try {
    const res = await api.put<ApiResponse<RoomPlacement>>(`/room-placements/${id}`, data)
    return res.data
  } catch (err) {
    const idx = MOCK_ROOM_PLACEMENTS.findIndex((rp) => rp._id === id)
    if (idx !== -1) {
      MOCK_ROOM_PLACEMENTS[idx].calasList = data.calasList
      MOCK_ROOM_PLACEMENTS[idx].penilaiList = data.penilaiList
      return { success: true, data: MOCK_ROOM_PLACEMENTS[idx] }
    }
    return { success: true, data: MOCK_ROOM_PLACEMENTS[0] }
  }
}
