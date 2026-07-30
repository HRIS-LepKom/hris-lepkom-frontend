import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/interceptors';
import type { ApiResponse, Calas, PaginatedResponse } from '@/types';
import { MOCK_CALAS } from '@/data/mockData';

const CALAS_KEYS = {
  all: ['calas'] as const,
  lists: () => [...CALAS_KEYS.all, 'list'] as const,
  list: (filters: string) => [...CALAS_KEYS.lists(), { filters }] as const,
  details: () => [...CALAS_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...CALAS_KEYS.details(), id] as const,
};

export const useGetCalasList = (params?: { page?: number; limit?: number; search?: string }) => {
  return useQuery({
    queryKey: CALAS_KEYS.list(JSON.stringify(params)),
    queryFn: async () => {
      try {
        const res = await api.get<ApiResponse<PaginatedResponse<Calas>>>('/calas', { params });
        return res.data;
      } catch (err) {
        // Fallback mock
        let list = [...MOCK_CALAS];
        if (params?.search) {
          const q = params.search.toLowerCase();
          list = list.filter(
            (c) =>
              c.namaCalas.toLowerCase().includes(q) ||
              c.npm.includes(q) ||
              c.emailCalas.toLowerCase().includes(q) ||
              c.kelas.toLowerCase().includes(q) ||
              c.idCalas.toLowerCase().includes(q)
          );
        }
        const page = params?.page || 1;
        const limit = params?.limit || 10;
        const start = (page - 1) * limit;
        const paginated = list.slice(start, start + limit);

        return {
          success: true,
          data: {
            success: true,
            data: paginated,
            total: list.length,
            page,
            limit,
          },
        };
      }
    }
  });
};

export const useGetCalasById = (id: string) => {
  return useQuery({
    queryKey: CALAS_KEYS.detail(id),
    queryFn: async () => {
      try {
        const res = await api.get<ApiResponse<Calas>>(`/calas/${id}`);
        return res.data;
      } catch (err) {
        const found = MOCK_CALAS.find((c) => c._id === id || c.idCalas === id);
        return {
          success: true,
          data: found || MOCK_CALAS[0],
        };
      }
    }
  });
};

export const useUpdateTimeline = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, tahapSaatIni, hasil }: { id: string; tahapSaatIni: string; hasil?: string }) => {
      try {
        const res = await api.put<ApiResponse<Calas>>(`/calas/${id}/timeline`, { tahapSaatIni, hasil });
        return res.data;
      } catch (err) {
        const idx = MOCK_CALAS.findIndex((c) => c._id === id);
        if (idx !== -1) {
          MOCK_CALAS[idx].statusRekrutmen = {
            tahapSaatIni: tahapSaatIni as any,
            hasil: (hasil as any) || MOCK_CALAS[idx].statusRekrutmen.hasil,
          };
          return { success: true, data: MOCK_CALAS[idx] };
        }
        return { success: true, data: MOCK_CALAS[0] };
      }
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: CALAS_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: CALAS_KEYS.detail(id) });
    },
  });
};

export const useResetCalasProcess = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const res = await api.put<ApiResponse<Calas>>(`/calas/${id}/reset`);
        return res.data;
      } catch (err) {
        const idx = MOCK_CALAS.findIndex((c) => c._id === id);
        if (idx !== -1) {
          MOCK_CALAS[idx].statusRekrutmen = { tahapSaatIni: 'registrasi', hasil: 'proses' };
          return { success: true, data: MOCK_CALAS[idx] };
        }
        return { success: true, data: MOCK_CALAS[0] };
      }
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: CALAS_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: CALAS_KEYS.detail(id) });
    },
  });
};

export const useBanCalas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const res = await api.put<ApiResponse<Calas>>(`/calas/${id}/ban`);
        return res.data;
      } catch (err) {
        const idx = MOCK_CALAS.findIndex((c) => c._id === id);
        if (idx !== -1) {
          MOCK_CALAS[idx].isBanned = true;
          return { success: true, data: MOCK_CALAS[idx] };
        }
        return { success: true, data: MOCK_CALAS[0] };
      }
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: CALAS_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: CALAS_KEYS.detail(id) });
    },
  });
};
