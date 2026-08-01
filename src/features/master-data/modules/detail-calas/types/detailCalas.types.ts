export interface RoomPlacementItem {
  ruangan: number;
  examSession: {
    _id: string;
    tanggal: string;
    jamMulai: string;
    jamSelesai: string;
    jenisUjian: string;
  };
}

export interface DetailPenilaiItem {
  penilai: {
    _id: string;
    idAsisten: string;
    nama: string;
    role?: string;
  };
  kriteria: Record<string, number>;
  skorKeseluruhan: number;
  deskripsi: string;
}

export interface RingkasanTipeUjian {
  rataRataKeseluruhan: number;
  rataRataKriteria: Record<string, number>;
  detailPenilai: DetailPenilaiItem[];
}

export interface RingkasanPenilaian {
  praktek: RingkasanTipeUjian;
  project: RingkasanTipeUjian;
}

export interface DetailCalas {
  _id: string;
  idCalas: string;
  npm: string;
  namaCalas: string;
  kelas: string;
  jurusan: string;
  emailCalas: string;
  noHp: string;
  jenisKelamin: string;
  tempatLahir: string;
  tanggalLahir: string;
  alamatLengkap: string;
  agama: string;
  statusRekrutmen: {
    tahapSaatIni: string;
    hasil: string;
  };
  skorAkhirNilai: number | null;
  // Files
  cv?: string;
  krs?: string;
  rangkumanNilai?: string;
  jawabanPraktek?: string;
  jawabanProject?: string;
  // Placements & Assessments
  penempatanRuangan: RoomPlacementItem[];
  ringkasanPenilaian: RingkasanPenilaian;
}

export interface DetailCalasResponse {
  errorStatus: boolean;
  message: string;
  data: DetailCalas;
}
