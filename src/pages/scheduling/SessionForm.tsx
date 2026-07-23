import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Select, Textarea, Card } from '@/components/ui'
import type { JenisUjian } from '@/types'
import * as schedulingService from '@/services/scheduling.service'

export default function SessionForm() {
  const navigate = useNavigate()
  const [tanggal, setTanggal] = useState('')
  const [jenisUjian, setJenisUjian] = useState<JenisUjian>('praktek')
  const [catatan, setCatatan] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!tanggal) {
      setError('Tanggal ujian wajib diisi.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await schedulingService.createExamSession({
        tanggal,
        jenisUjian,
        catatan,
      })
      if (res.success) {
        navigate('/scheduling/session-list')
      } else {
        setError(res.error || 'Gagal membuat sesi ujian.')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Gagal membuat sesi ujian.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/scheduling/session-list')}
          className="text-gray-500 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Buat Sesi Ujian Baru</h1>
          <p className="text-sm text-gray-500 mt-0.5">Jadwalkan tanggal pelaksanaan ujian praktek atau project.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 rounded-lg">
          {error}
        </div>
      )}

      <Card header="Form Rincian Sesi Ujian">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Tanggal Pelaksanaan Ujian"
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            required
          />

          <Select
            label="Jenis Ujian"
            options={[
              { value: 'praktek', label: 'Ujian Praktek (Coding / Problem Solving)' },
              { value: 'project', label: 'Ujian Project (Presentasi / Demoware)' },
            ]}
            value={jenisUjian}
            onChange={(e) => setJenisUjian(e.target.value as JenisUjian)}
            required
          />

          <Textarea
            label="Catatan / Pengumuman Sesi"
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            placeholder="Tambahkan catatan instruksi untuk PJ Ruangan & Asisten Penilai..."
            rows={4}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="secondary" onClick={() => navigate('/scheduling/session-list')} disabled={loading}>
              Batal
            </Button>
            <Button type="submit" variant="primary" loading={loading}>
              Simpan & Buat Sesi
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
