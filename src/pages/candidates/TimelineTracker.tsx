import { useState, useEffect } from 'react'
import { Card, Badge, Skeleton } from '@/components/ui'
import { TAHAP_LABELS } from '@/utils/constants'
import type { Calas, TahapRekrutmen } from '@/types'
import * as candidateService from '@/services/candidate.service'

const PHASES_ORDER: TahapRekrutmen[] = [
  'registrasi',
  'screening',
  'biodata_dokumen',
  'ujian_praktek',
  'ujian_project',
  'keputusan_akhir',
]

export default function TimelineTracker() {
  const [profile, setProfile] = useState<Calas | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const res = await candidateService.getMyProfile()
      if (res.success && res.data) {
        setProfile(res.data)
      }
    } catch (err) {
      // Fallback
    } finally {
      setLoading(false)
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

  const currentTahap = profile?.statusRekrutmen?.tahapSaatIni || 'registrasi'
  const hasil = profile?.statusRekrutmen?.hasil || 'proses'
  const currentIndex = PHASES_ORDER.indexOf(currentTahap as TahapRekrutmen)

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Timeline & Status Rekrutmen</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Pantau tahapan seleksi rekrutmen asisten LEPKOM secara real-time.
        </p>
      </div>

      {/* Result Status Banner */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-gray-500 font-medium">Status Hasil Seleksi Saat Ini:</span>
            <div className="flex items-center gap-3 mt-1">
              <h2 className="text-xl font-bold text-gray-900">
                {TAHAP_LABELS[currentTahap as TahapRekrutmen] || currentTahap}
              </h2>
              {hasil === 'lolos' && <Badge variant="status-green">Lolos Tahap Ini</Badge>}
              {hasil === 'tidak_lolos' && <Badge variant="status-red">Tidak Lolos</Badge>}
              {hasil === 'proses' && <Badge variant="status-yellow">Sedang Diproses</Badge>}
            </div>
          </div>

          {profile?.isBanned && (
            <Badge variant="status-red" className="text-sm py-1.5 px-3">
              Akun Dibekukan (Banned)
            </Badge>
          )}
        </div>

        {hasil === 'tidak_lolos' && profile?.statusRekrutmen?.alasanTidakLolos && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl space-y-1">
            <p className="font-bold">Keterangan Hasil:</p>
            <p>Mohon maaf, Anda belum dapat melanjutkan ke tahap berikutnya.</p>
            <p className="text-xs text-red-600 font-mono">
              Alasan: {profile.statusRekrutmen.alasanTidakLolos}
            </p>
          </div>
        )}

        {hasil === 'lolos' && currentTahap === 'keputusan_akhir' && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl space-y-1">
            <p className="font-bold">🎉 Selamat!</p>
            <p>Selamat Anda telah dinyatakan LOLOS sebagai Asisten LEPKOM. Harap nantikan informasi pembekalan.</p>
          </div>
        )}
      </Card>

      {/* Horizontal Steps Visualizer */}
      <Card header="Alur Tahapan Rekrutmen">
        <div className="py-6 px-2">
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
            {PHASES_ORDER.map((phase, idx) => {
              const isPast = idx < currentIndex
              const isCurrent = idx === currentIndex
              const isLolos = isCurrent && hasil === 'lolos'
              const isTidakLolos = isCurrent && hasil === 'tidak_lolos'

              let circleBg = 'bg-gray-200 text-gray-500 border-gray-300'
              if (isPast || isLolos) {
                circleBg = 'bg-lepkom-green text-white border-lepkom-green'
              } else if (isCurrent) {
                if (isTidakLolos) {
                  circleBg = 'bg-red-500 text-white border-red-500'
                } else {
                  circleBg = 'bg-amber-500 text-white border-amber-500 ring-4 ring-amber-100'
                }
              }

              return (
                <div key={phase} className="flex-1 flex md:flex-col items-center gap-4 md:gap-2 relative z-10 w-full">
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-colors ${circleBg}`}
                  >
                    {isPast || isLolos ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : isTidakLolos ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      idx + 1
                    )}
                  </div>

                  <div className="md:text-center">
                    <p className={`text-xs font-bold ${isCurrent ? 'text-lepkom-green' : 'text-gray-700'}`}>
                      {TAHAP_LABELS[phase]}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {isPast ? 'Selesai' : isCurrent ? 'Tahap Aktif' : 'Mendatang'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Card>
    </div>
  )
}