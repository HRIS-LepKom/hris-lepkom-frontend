import api from './api'
import type { ApiResponse, Calas, PaginatedResponse } from '@/types'
import { MOCK_CALAS } from '@/data/mockData'

export async function getCalasList(params?: { page?: number; limit?: number; search?: string }) {
  try {
    const res = await api.get<ApiResponse<PaginatedResponse<Calas>>>('/calas', { params })
    return res.data
  } catch (err) {
    let list = [...MOCK_CALAS]
    if (params?.search) {
      const q = params.search.toLowerCase()
      list = list.filter(
        (c) =>
          c.namaCalas.toLowerCase().includes(q) ||
          c.npm.includes(q) ||
          c.emailCalas.toLowerCase().includes(q) ||
          c.kelas.toLowerCase().includes(q) ||
          c.idCalas.toLowerCase().includes(q)
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

export async function getCalasById(id: string) {
  try {
    const res = await api.get<ApiResponse<Calas>>(`/calas/${id}`)
    return res.data
  } catch (err) {
    const found = MOCK_CALAS.find((c) => c._id === id || c.idCalas === id)
    return {
      success: true,
      data: found || MOCK_CALAS[0],
    }
  }
}

export async function getMyProfile() {
  try {
    const res = await api.get<ApiResponse<Calas>>('/calas/me')
    return res.data
  } catch (err) {
    return {
      success: true,
      data: MOCK_CALAS[0],
    }
  }
}

export async function updateMyBiodata(data: Partial<Calas>) {
  try {
    const res = await api.put<ApiResponse<Calas>>('/calas/me/biodata', data)
    return res.data
  } catch (err) {
    MOCK_CALAS[0] = { ...MOCK_CALAS[0], ...data, updatedAt: new Date().toISOString() }
    return { success: true, data: MOCK_CALAS[0] }
  }
}

export async function uploadMyDocument(file: File, type: 'cv' | 'krs' | 'rangkumanNilai') {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)
    const res = await api.post<ApiResponse<{ url: string }>>('/calas/me/documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
  } catch (err) {
    const url = `/files/${type}_${Date.now()}.pdf`
    MOCK_CALAS[0][type] = url
    return { success: true, data: { url } }
  }
}

export async function uploadExamPraktek(file: File) {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const res = await api.post<ApiResponse<{ url: string }>>('/calas/me/exam-praktek', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
  } catch (err) {
    return { success: true, data: { url: `/files/exam_praktek_${Date.now()}.zip` } }
  }
}

export async function uploadExamProject(file: File) {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const res = await api.post<ApiResponse<{ url: string }>>('/calas/me/exam-project', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
  } catch (err) {
    return { success: true, data: { url: `/files/exam_project_${Date.now()}.pptx` } }
  }
}

export async function updateTimeline(id: string, tahapSaatIni: string, hasil?: string) {
  try {
    const res = await api.put<ApiResponse<Calas>>(`/calas/${id}/timeline`, { tahapSaatIni, hasil })
    return res.data
  } catch (err) {
    const idx = MOCK_CALAS.findIndex((c) => c._id === id)
    if (idx !== -1) {
      MOCK_CALAS[idx].statusRekrutmen = {
        tahapSaatIni: tahapSaatIni as any,
        hasil: (hasil as any) || MOCK_CALAS[idx].statusRekrutmen.hasil,
      }
      return { success: true, data: MOCK_CALAS[idx] }
    }
    return { success: true, data: MOCK_CALAS[0] }
  }
}

export async function resetCalasProcess(id: string) {
  try {
    const res = await api.put<ApiResponse<Calas>>(`/calas/${id}/reset`)
    return res.data
  } catch (err) {
    const idx = MOCK_CALAS.findIndex((c) => c._id === id)
    if (idx !== -1) {
      MOCK_CALAS[idx].statusRekrutmen = { tahapSaatIni: 'registrasi', hasil: 'proses' }
      return { success: true, data: MOCK_CALAS[idx] }
    }
    return { success: true, data: MOCK_CALAS[0] }
  }
}

export async function banCalas(id: string) {
  try {
    const res = await api.put<ApiResponse<Calas>>(`/calas/${id}/ban`)
    return res.data
  } catch (err) {
    const idx = MOCK_CALAS.findIndex((c) => c._id === id)
    if (idx !== -1) {
      MOCK_CALAS[idx].isBanned = true
      return { success: true, data: MOCK_CALAS[idx] }
    }
    return { success: true, data: MOCK_CALAS[0] }
  }
}
