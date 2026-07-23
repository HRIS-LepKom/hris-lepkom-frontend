import api from './api'
import type { ApiResponse, RecruitmentSetting } from '@/types'

export async function getRecruitmentSetting() {
  const res = await api.get<ApiResponse<RecruitmentSetting>>('/recruitment/setting')
  return res.data
}

export async function toggleRecruitment(isActive: boolean) {
  const res = await api.put<ApiResponse<RecruitmentSetting>>('/recruitment/setting', { isActive })
  return res.data
}
