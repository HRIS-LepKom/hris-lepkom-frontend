import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/interceptors';

export interface JadwalKosong {
  _id: string;
  judul: string;
  dibuatOleh: { _id: string; nama: string; idAsisten: string; };
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  errorStatus: boolean;
  message: string;
  data: T;
  totalData: number;
  totalPage: number;
}

export interface ApiResponse<T> {
  errorStatus: boolean;
  message: string;
  data: T;
}

export const jadwalKosongKeys = {
  all: ['jadwalKosong'] as const,
  lists: () => [...jadwalKosongKeys.all, 'list'] as const,
  list: (queryString: string) => [...jadwalKosongKeys.lists(), queryString] as const,
};

export const useGetJadwalKosong = (queryString: string = '') => {
  return useQuery({
    queryKey: jadwalKosongKeys.list(queryString),
    queryFn: async () => {
      const { data } = await api.get<PaginatedResponse<JadwalKosong[]>>(`/api/jadwal/kosong${queryString}`);
      return data;
    },
  });
};

export const useCreateJadwalKosong = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { judul: string }) => {
      const { data } = await api.post<ApiResponse<JadwalKosong>>('/api/jadwal/kosong', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jadwalKosongKeys.lists() });
    },
  });
};

export const useUpdateJadwalKosong = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: { judul: string } }) => {
      const { data } = await api.patch<ApiResponse<JadwalKosong>>(`/api/jadwal/kosong/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jadwalKosongKeys.lists() });
    },
  });
};
