import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Card, Badge, Skeleton } from '@/components/ui'
import { TimelineUpdateModal } from '@/components/modals/TimelineUpdateModal'
import { BanConfirmModal } from '@/components/modals/BanConfirmModal'
import { TAHAP_LABELS } from '@/utils/constants'
import type { Calas } from '@/types'
import * as candidateService from '@/services/candidate.service'

export default function CalasDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [calas, setCalas] = useState<Calas | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false)
  const [isBanModalOpen, setIsBanModalOpen] = useState(false)

  const fetchCalasDetail = useCallback(async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const res = await candidateService.getCalasById(id)
      if (res.success && res.data) {
        setCalas(res.data)
      } else {
        setError(res.error || 'Calas tidak ditemukan.')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Gagal memuat detail calas.')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchCalasDetail()
  }, [fetchCalasDetail])

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (error || !calas) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
          {error || 'Data calon asisten tidak dapat ditemukan.'}
        </div>
        <Button variant="secondary" onClick={() => navigate('/admin/calas-management')}>
          Kembali ke Daftar Calas
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back button & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/admin/calas-management')}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Daftar Calas
        </button>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => setIsTimelineModalOpen(true)}
            className="flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Update Timeline
          </Button>

          <Button
            variant={calas.isBanned ? 'primary' : 'danger'}
            onClick={() => setIsBanModalOpen(true)}
          >
            {calas.isBanned ? 'Unban Akun' : 'Ban Akun'}
          </Button>
        </div>
      </div>

      {/* Header Profile Card */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-lepkom-green text-white flex items-center justify-center font-bold text-2xl shadow-sm">
              {calas.namaCalas ? calas.namaCalas.charAt(0).toUpperCase() : 'C'}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">{calas.namaCalas}</h1>
                <span className="font-mono text-xs text-gray-500 bg-page px-2 py-1 rounded border border-border">
                  {calas.idCalas || calas.npm}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">
                NPM: {calas.npm} | Kelas: {calas.kelas} | Email: {calas.emailCalas}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="info">
              {calas.statusRekrutmen?.tahapSaatIni
                ? TAHAP_LABELS[calas.statusRekrutmen.tahapSaatIni]
                : 'Registrasi'}
            </Badge>

            {calas.statusRekrutmen?.hasil === 'lolos' && <Badge variant="status-green">Lolos</Badge>}
            {calas.statusRekrutmen?.hasil === 'tidak_lolos' && <Badge variant="status-red">Tidak Lolos</Badge>}
            {calas.statusRekrutmen?.hasil === 'proses' && <Badge variant="status-yellow">Proses</Badge>}

            {calas.isBanned && <Badge variant="status-red">Banned</Badge>}
          </div>
        </div>
      </Card>

      {/* Info Grid 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Data Diri */}
        <Card header="Informasi Data Diri">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-gray-500">Jenis Kelamin</dt>
              <dd className="font-medium text-gray-900">{calas.jenisKelamin || '-'}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-gray-500">No. KTP</dt>
              <dd className="font-medium text-gray-900">{calas.noKtp || '-'}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-gray-500">No. HP / WA</dt>
              <dd className="font-medium text-gray-900">{calas.noHp || '-'}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-gray-500">Tempat, Tgl Lahir</dt>
              <dd className="font-medium text-gray-900">
                {calas.tempatLahir ? `${calas.tempatLahir}, ${calas.tanggalLahir}` : '-'}
              </dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-gray-500">Alamat</dt>
              <dd className="font-medium text-gray-900 text-right max-w-xs">{calas.alamatLengkap || '-'}</dd>
            </div>
          </dl>
        </Card>

        {/* Pendidikan & Orang Tua */}
        <Card header="Pendidikan & Keluarga">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-gray-500">Asal Sekolah</dt>
              <dd className="font-medium text-gray-900">{calas.asalSekolah || '-'}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-gray-500">Jurusan / Prodi</dt>
              <dd className="font-medium text-gray-900">{calas.jurusan || '-'}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-gray-500">IPK</dt>
              <dd className="font-semibold text-lepkom-green">{calas.ipk ?? '-'}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-gray-500">Nama Ibu / Ayah</dt>
              <dd className="font-medium text-gray-900">
                {calas.namaIbu || calas.namaAyah ? `${calas.namaIbu || '-'} / ${calas.namaAyah || '-'}` : '-'}
              </dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-gray-500">No. HP Ortu</dt>
              <dd className="font-medium text-gray-900">{calas.noHpOrtu || '-'}</dd>
            </div>
          </dl>
        </Card>
      </div>

      {/* Kursus & Kemampuan */}
      <Card header="Kemampuan & Pengalaman">
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Kemampuan IT</h4>
            <p className="text-gray-600 bg-page p-3 rounded-lg border border-border">
              {calas.kemampuanIt || 'Belum diisi'}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Kemampuan Pribadi</h4>
            <p className="text-gray-600 bg-page p-3 rounded-lg border border-border">
              {calas.kemampuanPribadi || 'Belum diisi'}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Pengalaman Organisasi / Kerja</h4>
            <p className="text-gray-600 bg-page p-3 rounded-lg border border-border">
              {calas.pengalamanOrganisasi || calas.pengalamanKerja || 'Belum diisi'}
            </p>
          </div>
        </div>
      </Card>

      {/* Dokumen */}
      <Card header="Dokumen Terunggah">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 border border-border rounded-xl flex items-center justify-between bg-page">
            <div>
              <p className="text-sm font-bold text-gray-800">CV / Resume</p>
              <p className="text-xs text-gray-500">{calas.cv ? 'Sudah Diunggah' : 'Belum Ada'}</p>
            </div>
            {calas.cv && (
              <a
                href={calas.cv}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-lepkom-green hover:underline"
              >
                Unduh PDF
              </a>
            )}
          </div>

          <div className="p-4 border border-border rounded-xl flex items-center justify-between bg-page">
            <div>
              <p className="text-sm font-bold text-gray-800">KRS</p>
              <p className="text-xs text-gray-500">{calas.krs ? 'Sudah Diunggah' : 'Belum Ada'}</p>
            </div>
            {calas.krs && (
              <a
                href={calas.krs}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-lepkom-green hover:underline"
              >
                Unduh PDF
              </a>
            )}
          </div>

          <div className="p-4 border border-border rounded-xl flex items-center justify-between bg-page">
            <div>
              <p className="text-sm font-bold text-gray-800">Rangkuman Nilai</p>
              <p className="text-xs text-gray-500">{calas.rangkumanNilai ? 'Sudah Diunggah' : 'Belum Ada'}</p>
            </div>
            {calas.rangkumanNilai && (
              <a
                href={calas.rangkumanNilai}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-lepkom-green hover:underline"
              >
                Unduh PDF
              </a>
            )}
          </div>
        </div>
      </Card>

      {/* Modals */}
      <TimelineUpdateModal
        isOpen={isTimelineModalOpen}
        onClose={() => setIsTimelineModalOpen(false)}
        calas={calas}
        onSuccess={fetchCalasDetail}
      />

      <BanConfirmModal
        isOpen={isBanModalOpen}
        onClose={() => setIsBanModalOpen(false)}
        calas={calas}
        onSuccess={fetchCalasDetail}
      />
    </div>
  )
}
