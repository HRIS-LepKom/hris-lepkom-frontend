export interface User {
  _id: string
  idAsisten: string
  npm: string
  nama: string
  email: string
  kelasSaatIni?: string | null
  role: Role
  wajibGantiPassword: boolean
  calasRef?: string | null
  isActive: boolean
}

export type Role =
  | 'super_admin'
  | 'pj_soal_materi'
  | 'penanggung_jawab_ruangan'
  | 'koordinator_lapangan'
  | 'asisten_penilai'
  | 'asisten'
  | 'staff'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface Calas {
  _id: string
  idCalas: string
  npm: string
  namaCalas: string
  kelas: string
  emailCalas: string
  statusRekrutmen: {
    tahapSaatIni: TahapRekrutmen
    hasil: HasilRekrutmen
    alasanTidakLolos?: string | null
  }
  isBanned: boolean
  daftarVia: 'mandiri' | 'asisten'
}

export type TahapRekrutmen =
  | 'registrasi'
  | 'screening'
  | 'biodata_dokumen'
  | 'ujian_praktek'
  | 'ujian_project'
  | 'keputusan_akhir'
  | 'selesai'

export type HasilRekrutmen = 'proses' | 'lolos' | 'tidak_lolos'

export interface Materi {
  _id: string
  namaMateri: string
  tingkat: 1 | 2 | 3
  deskripsi?: string | null
}

export interface Soal {
  _id: string
  judulSoal: string
  tingkat: 1 | 2 | 3
  file: string
}

export interface QuestionCard {
  _id: string
  judulPertanyaan: string
  deskripsi?: string | null
}

export interface ExamSession {
  _id: string
  tanggal: string
  jenisUjian: 'praktek' | 'project'
  catatan?: string | null
}

export interface RoomAssignment {
  _id: string
  examSessionRef: string
  ruangan: 121 | 122 | 124 | 125
  pjRuanganRef: string
}

export interface RoomPlacement {
  _id: string
  examSessionRef: string
  ruangan: 121 | 122 | 124 | 125
  calasList: string[]
  penilaiList: string[]
}

export interface Penilaian {
  _id: string
  calasRef: string
  penilaiRef: string
  examSessionRef: string
  jenisUjian: 'praktek' | 'project'
  kriteria: Record<string, number>
  deskripsi: string
  skorKeseluruhan: number
}

export interface RecruitmentSetting {
  isActive: boolean
  gelombangAktif?: string | null
}

export interface HardResetRequest {
  _id: string
  asistenRef: string
  inputAwal: string
  status: 'menunggu' | 'disetujui' | 'ditolak'
}
