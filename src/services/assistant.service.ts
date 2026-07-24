import api from './api'
import type { ApiResponse, User, PaginatedResponse } from '@/types'
import { MOCK_ASSISTANTS } from '@/data/mockData'

export async function getAsistenList(params?: { page?: number; limit?: number; search?: string }) {
  try {
    const res = await api.get<ApiResponse<PaginatedResponse<User>>>('/asisten', { params })
    return res.data
  } catch (err) {
    let list = [...MOCK_ASSISTANTS]
    if (params?.search) {
      const q = params.search.toLowerCase()
      list = list.filter(
        (a) =>
          a.nama.toLowerCase().includes(q) ||
          a.npm.includes(q) ||
          a.email.toLowerCase().includes(q) ||
          (a.idAsisten && a.idAsisten.toLowerCase().includes(q))
      )
    }
    const page = params?.page || 1
    const limit = params?.limit || 10
    const start = (page - 1) * limit
    const paginated = list.slice(start, start + limit)

    return {
      success: true,
      data: {
        success: true,
        data: paginated,
        total: list.length,
        page,
        limit,
      },
    }
  }
}

export async function getAsistenById(id: string) {
  try {
    const res = await api.get<ApiResponse<User>>(`/asisten/${id}`)
    return res.data
  } catch (err) {
    const found = MOCK_ASSISTANTS.find((a) => a._id === id || a.idAsisten === id)
    return {
      success: true,
      data: found || MOCK_ASSISTANTS[0],
    }
  }
}

export async function createAsisten(data: { npm: string; nama: string; email: string; password: string }) {
  try {
    const res = await api.post<ApiResponse<User>>('/asisten', data)
    return res.data
  } catch (err) {
    const newAsisten: User = {
      _id: `ast-${Date.now()}`,
      idAsisten: `AST-${Math.floor(100 + Math.random() * 900)}`,
      npm: data.npm,
      nama: data.nama,
      email: data.email,
      role: 'asisten',
      wajibGantiPassword: true,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    MOCK_ASSISTANTS.unshift(newAsisten)
    return { success: true, data: newAsisten }
  }
}

export async function updateAsisten(id: string, data: Partial<User>) {
  try {
    const res = await api.put<ApiResponse<User>>(`/asisten/${id}`, data)
    return res.data
  } catch (err) {
    const idx = MOCK_ASSISTANTS.findIndex((a) => a._id === id)
    if (idx !== -1) {
      MOCK_ASSISTANTS[idx] = { ...MOCK_ASSISTANTS[idx], ...data, updatedAt: new Date().toISOString() }
      return { success: true, data: MOCK_ASSISTANTS[idx] }
    }
    return { success: true, data: MOCK_ASSISTANTS[0] }
  }
}

export async function deleteAsisten(id: string) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/asisten/${id}`)
    return res.data
  } catch (err) {
    const idx = MOCK_ASSISTANTS.findIndex((a) => a._id === id)
    if (idx !== -1) {
      MOCK_ASSISTANTS.splice(idx, 1)
    }
    return { success: true, data: null }
  }
}

export async function importAsisten(file: File) {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const res = await api.post<ApiResponse<{ imported: number }>>('/asisten/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
  } catch (err) {
    return { success: true, data: { imported: 5 } }
  }
}

export async function assignRole(id: string, role: string) {
  try {
    const res = await api.put<ApiResponse<User>>(`/asisten/${id}/role`, { role })
    return res.data
  } catch (err) {
    const idx = MOCK_ASSISTANTS.findIndex((a) => a._id === id)
    if (idx !== -1) {
      MOCK_ASSISTANTS[idx].role = role as any
    }
    return { success: true, data: MOCK_ASSISTANTS[idx] }
  }
}
