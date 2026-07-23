import { z } from 'zod'

export const candidateBiodataSchema = z.object({
  namaCalas: z.string().min(1, 'Nama wajib diisi').max(100),
  npm: z.string().regex(/^\d{8,12}$/, 'NPM harus 8-12 digit angka'),
  kelas: z.string().min(1, 'Kelas wajib diisi'),
  jenisKelamin: z.enum(['Laki-laki', 'Perempuan']),
  noKtp: z.string().min(16, 'No KTP harus 16 digit').max(16),
  noHp: z.string().regex(/^08\d{8,12}$/, 'No HP tidak valid'),
  emailCalas: z.string().email('Email tidak valid'),
  tempatLahir: z.string().min(1, 'Tempat lahir wajib diisi'),
  tanggalLahir: z.string().min(1, 'Tanggal lahir wajib diisi'),
  alamatLengkap: z.string().min(1, 'Alamat wajib diisi'),
  asalSekolah: z.string().min(1, 'Asal sekolah wajib diisi'),
  jurusan: z.string().min(1, 'Jurusan wajib diisi'),
  ipk: z.number().min(0).max(4, 'IPK tidak valid'),
  noHpOrtu: z.string().regex(/^08\d{8,12}$/, 'No HP orang tua tidak valid'),
})
