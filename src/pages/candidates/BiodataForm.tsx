import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Card, Textarea, Skeleton } from '@/components/ui'
import * as candidateService from '@/services/candidate.service'
import type { Calas, KursusSemester } from '@/types'

export default function BiodataForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [formData, setFormData] = useState<Partial<Calas>>({
    namaCalas: '',
    npm: '',
    emailCalas: '',
    kelas: '',
    jenisKelamin: 'Laki-laki',
    noKtp: '',
    noHp: '',
    tempatLahir: '',
    tanggalLahir: '',
    alamatLengkap: '',
    asalSekolah: '',
    jurusan: '',
    ipk: 0.0,
    namaIbu: '',
    namaAyah: '',
    noHpOrtu: '',
    kemampuanPribadi: '',
    kemampuanIt: '',
    pengalamanOrganisasi: '',
    pengalamanKerja: '',
    semesterKursusDel: false,
    kursusSemester: {
      semester1: '',
      semester2: '',
      semester3: '',
      semester4: '',
      semester5: '',
      semester6: '',
      semester7: '',
    },
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const res = await candidateService.getMyProfile()
      if (res.success && res.data) {
        setFormData({
          ...res.data,
          kursusSemester: res.data.kursusSemester || {
            semester1: '',
            semester2: '',
            semester3: '',
            semester4: '',
            semester5: '',
            semester6: '',
            semester7: '',
          },
        })
      }
    } catch (err) {
      // Fallback empty form
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleKursusChange = (sem: keyof KursusSemester, val: string) => {
    setFormData((prev) => ({
      ...prev,
      kursusSemester: {
        ...prev.kursusSemester,
        [sem]: val,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await candidateService.updateMyBiodata(formData)
      if (res.success) {
        setSuccess('Biodata berhasil disimpan! Melanjutkan ke unggah dokumen...')
        setTimeout(() => {
          navigate('/calas/documents')
        }, 1200)
      } else {
        setError(res.error || 'Gagal menyimpan biodata.')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Gagal menyimpan biodata.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header & Step Tracker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <span className="text-xs font-bold text-lepkom-green tracking-wider uppercase">Langkah 1 dari 3</span>
          <h1 className="text-2xl font-bold text-gray-800">Isi Biodata Diri</h1>
          <p className="text-sm text-gray-500 mt-0.5">Lengkapi data pribadi, pendidikan, dan keluarga Anda.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 rounded-lg flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-4 rounded-lg flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Data Diri */}
        <Card header="Section 1 — Data Pribadi">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nama Lengkap"
                name="namaCalas"
                value={formData.namaCalas || ''}
                onChange={handleChange}
                required
              />

              <Input
                label="NPM"
                name="npm"
                value={formData.npm || ''}
                disabled
                className="bg-gray-100 font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Email"
                name="emailCalas"
                value={formData.emailCalas || ''}
                disabled
                className="bg-gray-100"
              />

              <Input
                label="Kelas"
                name="kelas"
                value={formData.kelas || ''}
                onChange={handleChange}
                placeholder="Contoh: 3KA01"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin *</label>
                <div className="flex items-center gap-6 mt-2">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name="jenisKelamin"
                      value="Laki-laki"
                      checked={formData.jenisKelamin === 'Laki-laki'}
                      onChange={handleChange}
                      className="text-lepkom-green focus:ring-lepkom-green"
                    />
                    Laki-laki
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name="jenisKelamin"
                      value="Perempuan"
                      checked={formData.jenisKelamin === 'Perempuan'}
                      onChange={handleChange}
                      className="text-lepkom-green focus:ring-lepkom-green"
                    />
                    Perempuan
                  </label>
                </div>
              </div>

              <Input
                label="No. KTP (16 Digit)"
                name="noKtp"
                value={formData.noKtp || ''}
                onChange={handleChange}
                placeholder="3201010101010001"
                required
              />

              <Input
                label="No. HP / Whatsapp"
                name="noHp"
                value={formData.noHp || ''}
                onChange={handleChange}
                placeholder="081234567890"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Tempat Lahir"
                name="tempatLahir"
                value={formData.tempatLahir || ''}
                onChange={handleChange}
                placeholder="Jakarta"
                required
              />

              <Input
                label="Tanggal Lahir"
                type="date"
                name="tanggalLahir"
                value={formData.tanggalLahir || ''}
                onChange={handleChange}
                required
              />
            </div>

            <Textarea
              label="Alamat Lengkap"
              name="alamatLengkap"
              value={formData.alamatLengkap || ''}
              onChange={handleChange}
              placeholder="Masukkan alamat domisili lengkap..."
              rows={3}
              required
            />
          </div>
        </Card>

        {/* Section 2: Pendidikan */}
        <Card header="Section 2 — Data Pendidikan & IPK">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Asal Sekolah (SMA/SMK)"
                name="asalSekolah"
                value={formData.asalSekolah || ''}
                onChange={handleChange}
                placeholder="SMA Negeri 1 Jakarta"
                required
              />

              <Input
                label="Jurusan"
                name="jurusan"
                value={formData.jurusan || ''}
                onChange={handleChange}
                placeholder="Sistem Informasi / Informatika"
                required
              />

              <Input
                label="IPK Terakhir"
                type="number"
                step="0.01"
                min="0"
                max="4.00"
                name="ipk"
                value={formData.ipk || ''}
                onChange={(e) => setFormData((p) => ({ ...p, ipk: parseFloat(e.target.value) || 0 }))}
                placeholder="3.50"
                required
              />
            </div>

            {/* Riwayat Kursus per Semester */}
            <div className="border-t border-border pt-4">
              <h4 className="text-sm font-bold text-gray-800 mb-3">Riwayat Kursus Praktikum LEPKOM Per Semester</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {([1, 2, 3, 4, 5, 6, 7] as const).map((sem) => {
                  const semKey = `semester${sem}` as keyof KursusSemester
                  return (
                    <Input
                      key={sem}
                      label={`Semester ${sem}`}
                      value={formData.kursusSemester?.[semKey] || ''}
                      onChange={(e) => handleKursusChange(semKey, e.target.value)}
                      placeholder="Nama kursus / materi"
                    />
                  )
                })}
              </div>

              <div className="mt-4">
                <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="semesterKursusDel"
                    checked={formData.semesterKursusDel || false}
                    onChange={handleChange}
                    className="rounded border-border text-lepkom-green focus:ring-lepkom-green"
                  />
                  <span>Semester kursus DEL (pindahan / khusus)</span>
                </label>
              </div>
            </div>
          </div>
        </Card>

        {/* Section 3: Keluarga & Kemampuan */}
        <Card header="Section 3 — Keluarga & Kemampuan">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Nama Ibu Kandung"
                name="namaIbu"
                value={formData.namaIbu || ''}
                onChange={handleChange}
                placeholder="Nama Ibu"
              />

              <Input
                label="Nama Ayah Kandung"
                name="namaAyah"
                value={formData.namaAyah || ''}
                onChange={handleChange}
                placeholder="Nama Ayah"
              />

              <Input
                label="No. HP Orang Tua"
                name="noHpOrtu"
                value={formData.noHpOrtu || ''}
                onChange={handleChange}
                placeholder="081234567890"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Textarea
                label="Kemampuan IT"
                name="kemampuanIt"
                value={formData.kemampuanIt || ''}
                onChange={handleChange}
                placeholder="Bahasa pemrograman, framework, database, tools yang dikuasai..."
                rows={3}
              />

              <Textarea
                label="Kemampuan Pribadi / Soft Skills"
                name="kemampuanPribadi"
                value={formData.kemampuanPribadi || ''}
                onChange={handleChange}
                placeholder="Communication, leadership, problem solving..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Textarea
                label="Pengalaman Organisasi"
                name="pengalamanOrganisasi"
                value={formData.pengalamanOrganisasi || ''}
                onChange={handleChange}
                placeholder="Nama himpunan/UKM, jabatan, periode..."
                rows={3}
              />

              <Textarea
                label="Pengalaman Kerja / Magang"
                name="pengalamanKerja"
                value={formData.pengalamanKerja || ''}
                onChange={handleChange}
                placeholder="Perusahaan, posisi, durasi..."
                rows={3}
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-4 pt-2">
          <Button type="submit" variant="primary" loading={saving} size="lg">
            Simpan Biodata & Lanjut
          </Button>
        </div>
      </form>
    </div>
  )
}