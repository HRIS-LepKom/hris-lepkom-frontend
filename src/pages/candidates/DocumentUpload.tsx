import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Badge, Skeleton } from '@/components/ui'
import * as candidateService from '@/services/candidate.service'
import type { Calas } from '@/types'

export default function DocumentUpload() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<Calas | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploadingType, setUploadingType] = useState<'cv' | 'krs' | 'rangkumanNilai' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

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

  const handleUpload = async (file: File, type: 'cv' | 'krs' | 'rangkumanNilai') => {
    if (file.size > 2 * 1024 * 1024) {
      setError('Ukuran file maksimal adalah 2MB.')
      return
    }
    if (file.type !== 'application/pdf') {
      setError('File harus berformat PDF.')
      return
    }

    setUploadingType(type)
    setError(null)
    setSuccess(null)

    try {
      const res = await candidateService.uploadMyDocument(file, type)
      if (res.success && res.data) {
        setSuccess(`Dokumen ${type.toUpperCase()} berhasil diunggah!`)
        fetchProfile()
      } else {
        setError(res.error || 'Gagal mengunggah dokumen.')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Terjadi kesalahan saat unggah dokumen.')
    } finally {
      setUploadingType(null)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-48 w-full" count={3} />
      </div>
    )
  }

  const documentItems = [
    {
      type: 'cv' as const,
      title: 'CV / Resume',
      desc: 'Unggah Curiculum Vitae terbaru Anda dalam format PDF.',
      url: profile?.cv,
    },
    {
      type: 'krs' as const,
      title: 'KRS (Kartu Rencana Studi)',
      desc: 'Unggah KRS semester aktif yang sudah disetujui dosen pembimbing.',
      url: profile?.krs,
    },
    {
      type: 'rangkumanNilai' as const,
      title: 'Rangkuman Nilai / Transkrip',
      desc: 'Unggah rangkuman nilai atau DNS akumulatif hingga semester terakhir.',
      url: profile?.rangkumanNilai,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header & Step Tracker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <span className="text-xs font-bold text-lepkom-green tracking-wider uppercase">Langkah 2 dari 3</span>
          <h1 className="text-2xl font-bold text-gray-800">Unggah Dokumen Syarat</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Unggah dokumen persyaratam wajib (CV, KRS, Rangkuman Nilai) format PDF max 2MB.
          </p>
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

      {/* Document Zones */}
      <div className="space-y-4">
        {documentItems.map((doc) => {
          const isUploaded = !!doc.url
          const isUploading = uploadingType === doc.type

          return (
            <Card key={doc.type}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isUploaded ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-gray-900">{doc.title}</h3>
                      {isUploaded ? (
                        <Badge variant="status-green">Sudah Diunggah</Badge>
                      ) : (
                        <Badge variant="status-yellow">Belum Diunggah</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{doc.desc}</p>
                    {isUploaded && (
                      <a
                        href={doc.url!}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block text-xs font-semibold text-lepkom-green hover:underline mt-2"
                      >
                        📄 Lihat Dokumen Terunggah
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="application/pdf"
                    id={`file-input-${doc.type}`}
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleUpload(e.target.files[0], doc.type)
                      }
                    }}
                  />
                  <label htmlFor={`file-input-${doc.type}`}>
                    <Button
                      variant={isUploaded ? 'secondary' : 'primary'}
                      size="sm"
                      loading={isUploading}
                      onClick={() => document.getElementById(`file-input-${doc.type}`)?.click()}
                      className="cursor-pointer"
                    >
                      {isUploaded ? 'Ganti File' : 'Unggah PDF'}
                    </Button>
                  </label>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="flex justify-between items-center pt-4">
        <Button variant="secondary" onClick={() => navigate('/calas/biodata')}>
          Kembali ke Biodata
        </Button>
        <Button variant="primary" onClick={() => navigate('/calas/timeline')}>
          Lanjut ke Timeline Rekrutmen
        </Button>
      </div>
    </div>
  )
}