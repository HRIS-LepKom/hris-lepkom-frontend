import { useQuery } from '@tanstack/react-query';
import api from '@/utils/interceptors';
import type { DetailCalasResponse } from '../types/detailCalas.types';

export const DETAIL_CALAS_KEYS = {
  all: ['detailCalas'] as const,
  detail: (id: string) => [...DETAIL_CALAS_KEYS.all, id] as const,
};

export const useGetDetailCalas = (id: string) => {
  return useQuery({
    queryKey: DETAIL_CALAS_KEYS.detail(id),
    queryFn: async () => {
      const res = await api.get<DetailCalasResponse>(`/api/calas/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
};
