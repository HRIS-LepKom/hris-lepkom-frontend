import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Badge } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { TAHAP_LABELS } from '@/utils/constants'
import type { Calas } from '@/types'
import * as candidateService from '@/services/candidate.service'

export default function CalasDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [profile, setProfile] = useState<Calas | null>(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await candidateService.getMyProfile()
      if (res.success && res.data) {
        setProfile(res.data)
      }
    } catch (err) {
      // Fallback
    }
  }

  const currentTahap = profile?.statusRekrutmen?.tahapSaatIni || 'registrasi'
  const hasil = profile?.statusRekrutmen?.hasil || 'proses'

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-lepkom-green to-emerald-700 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white">
            Portal Calon Asisten
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
            Selamat Datang, {user?.nama || profile?.namaCalas || 'Calas'}!
          </h1>
          <p className="text-sm text-white/80 mt-1 max-w-xl">
            Lengkapi data pendaftaran Anda, unduh berkas ujian, dan pantau status kelulusan rekrutmen.
          </p>
        </div>
        <Button
          variant="secondary"
          className="bg-white text-lepkom-green hover:bg-gray-100 border-none font-bold self-start sm:self-center"
          onClick={() => navigate('/calas/timeline')}
        >
          📍 Lihat Timeline Tracker
        </Button>
      </div>

      {/* Current Status Card */}
      <Card header="Status Rekrutmen Anda Saat Ini">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tahap Seleksi</p>
            <h2 className="text-xl font-bold text-gray-900 mt-1">
              {TAHAP_LABELS[currentTahap] || currentTahap}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">Status Hasil:</span>
            {hasil === 'lolos' && <Badge variant="status-green" className="text-sm px-3 py-1">Lolos Tahap Ini</Badge>}
            {hasil === 'tidak_lolos' && <Badge variant="status-red" className="text-sm px-3 py-1">Tidak Lolos</Badge>}
            {hasil === 'proses' && <Badge variant="status-yellow" className="text-sm px-3 py-1">Proses Evaluasi</Badge>}
          </div>
        </div>
      </Card>

      {/* Checklist Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step 1: Biodata */}
        <Card className="hover:border-lepkom-green transition-colors">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-lepkom-green uppercase tracking-wider">Langkah 1</span>
              <h3 className="font-bold text-lg text-gray-900">Biodata & Data Diri</h3>
              <p className="text-xs text-gray-500">Isi data pribadi, pendidikan, keluarga, dan kemampuan.</p>
            </div>
            <Button variant="primary" size="sm" onClick={() => navigate('/calas/biodata')}>
              Isi Biodata
            </Button>
          </div>
        </Card>

        {/* Step 2: Dokumen */}
        <Card className="hover:border-lepkom-green transition-colors">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-lepkom-green uppercase tracking-wider">Langkah 2</span>
              <h3 className="font-bold text-lg text-gray-900">Unggah Dokumen Syarat</h3>
              <p className="text-xs text-gray-500">Unggah CV, KRS aktif, dan rangkuman nilai (PDF).</p>
            </div>
            <Button variant="primary" size="sm" onClick={() => navigate('/calas/documents')}>
              Unggah Dokumen
            </Button>
          </div>
        </Card>

        {/* Step 3: Ujian Praktek */}
        <Card className="hover:border-lepkom-green transition-colors">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-lepkom-green uppercase tracking-wider">Ujian Praktek</span>
              <h3 className="font-bold text-lg text-gray-900">Soal & Hasil Praktek</h3>
              <p className="text-xs text-gray-500">Unduh soal ujian praktek & kumpulkan hasil pengerjaan.</p>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="secondary" size="sm" onClick={() => navigate('/calas/exam-download')}>
                Unduh Soal
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate('/calas/exam-praktek')}>
                Unggah Hasil
              </Button>
            </div>
          </div>
        </Card>

        {/* Step 4: Ujian Project */}
        <Card className="hover:border-lepkom-green transition-colors">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-lepkom-green uppercase tracking-wider">Ujian Project</span>
              <h3 className="font-bold text-lg text-gray-900">Presentasi Project</h3>
              <p className="text-xs text-gray-500">Unggah berkas presentasi PPT / PPTX untuk sidang project.</p>
            </div>
            <Button variant="primary" size="sm" onClick={() => navigate('/calas/exam-project')}>
              Unggah PPT
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}