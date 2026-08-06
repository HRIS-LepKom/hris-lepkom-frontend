import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/interceptors';
import type { ApiResponse } from '@/types';

export interface KursusLepkom {
  materiRef: string;
  namaMateri: string;
  tingkat: number;
}

export interface SlotJadwal {
  hari: string;
  sesi: number[];
}

export interface JadwalMateriLepkom {
  materiRef: string;
  namaMateri: string;
  tingkat: number;
  hari: string;
  sesi: number;
}

export interface AsistenEntri {
  _id: string;
  jadwalKosongRef: string;
  asistenRef: string;
  asisten: {
    _id: string;
    nama: string;
    idAsisten: string;
    npm: string;
    kelasSaatIni: string;
  };
  kursusLepkom: KursusLepkom[];
  jadwalKosong: SlotJadwal[];
  jadwalMateriLepkom: JadwalMateriLepkom | null;
  statusPengisian: 'belum_diisi' | 'sebagian' | 'lengkap';
}

export interface DetailJadwalKosongResponse {
  success: boolean;
  message: string;
  data: {
    jadwal: {
      _id: string;
      judul: string;
      dibuatOleh: { nama: string; idAsisten: string; };
      createdAt: string;
    };
    entris: AsistenEntri[];
  };
  totalData: number;
  totalPage: number;
  page?: number;
  limit?: number;
}

export interface GetDetailParams {
  id: string;
  search?: string;
  nama?: string;
  npm?: string;
  idAsisten?: string;
  kelasSaatIni?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  statusPengisian?: string;
}

export const queryKeys = {
  detail: (params: GetDetailParams) => ['detailJadwalKosong', params],
  entri: (id: string, asistenId: string) => ['detailJadwalKosongEntri', id, asistenId],
};

export const useGetDetailJadwalKosong = (params: GetDetailParams) => {
  return useQuery({
    queryKey: queryKeys.detail(params),
    queryFn: async () => {
      const { id, ...queryParams } = params;
      const res = await api.get<DetailJadwalKosongResponse>(`/api/jadwal/kosong/${id}`, {
        params: queryParams,
      });
      return res.data;
    },
    enabled: !!params.id,
  });
};

export const useGetEntriAsisten = (id: string, asistenId: string) => {
  return useQuery({
    queryKey: queryKeys.entri(id, asistenId),
    queryFn: async () => {
      const res = await api.get<ApiResponse<AsistenEntri>>(`/api/jadwal/kosong/${id}/asisten/${asistenId}`);
      return res.data;
    },
    enabled: !!id && !!asistenId,
  });
};

export const useUpdateKursus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, asistenId, data }: { id: string; asistenId: string; data: { kursusLepkom: KursusLepkom[] } }) => {
      const res = await api.patch<ApiResponse<null>>(`/api/jadwal/kosong/${id}/asisten/${asistenId}/kursus`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['detailJadwalKosong'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.entri(variables.id, variables.asistenId) });
    },
  });
};

export const useUpdateJadwal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, asistenId, data }: { id: string; asistenId: string; data: { jadwalKosong: SlotJadwal[] } }) => {
      const res = await api.patch<ApiResponse<null>>(`/api/jadwal/kosong/${id}/asisten/${asistenId}/jadwal`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['detailJadwalKosong'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.entri(variables.id, variables.asistenId) });
    },
  });
};

export const useUpdateJadwalMateri = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, asistenId, data }: { id: string; asistenId: string; data: { jadwalMateriLepkom: JadwalMateriLepkom | null } }) => {
      const res = await api.patch<ApiResponse<null>>(`/api/jadwal/kosong/${id}/asisten/${asistenId}/jadwal-materi`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['detailJadwalKosong'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.entri(variables.id, variables.asistenId) });
    },
  });
};
