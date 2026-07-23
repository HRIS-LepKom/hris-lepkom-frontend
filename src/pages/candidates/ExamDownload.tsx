import { useState, useEffect } from 'react'
import { Button, Card, Badge, Skeleton } from '@/components/ui'
import type { Soal } from '@/types'
import * as masterDataService from '@/services/masterData.service'

export default function ExamDownload() {
  const [soalList, setSoalList] = useState<Soal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSoal()
  }, [])

  const fetchSoal = async () => {
    setLoading(true)
    try {
      const res = await masterDataService.getSoalList()
      if (res.success && res.data) {
        setSoalList(res.data.data || [])
      }
    } catch (err) {
      setSoalList([])
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (id: string, fileName: string) => {
    try {
      const blob = await masterDataService.downloadSoal(id)
      const url = window.URL.createObjectURL(new Blob([blob]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName || 'Soal-Ujian.pdf')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      alert('Gagal mengunduh file soal ujian.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Ujian Praktek — Unduh Soal</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Unduh berkas soal ujian praktek sesuai jadwal dan ruangan ujian Anda.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-xl text-sm space-y-1">
        <p className="font-bold">📌 Petunjuk Pengerjaan Ujian Praktek:</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Unduh file soal sesuai instruksi pengawas ruangan.</li>
          <li>Kerjakan ujian secara mandiri dalam durasi waktu yang telah ditentukan.</li>
          <li>Simpan dan unggah berkas hasil pengerjaan Anda pada halaman Unggah Hasil Ujian.</li>
        </ul>
      </div>

      <Card header="Daftar Soal Ujian Praktek">
        {loading ? (
          <div className="space-y-3 py-4">
            <Skeleton className="h-16 w-full" count={3} />
          </div>
        ) : soalList.length > 0 ? (
          <div className="divide-y divide-border">
            {soalList.map((soal) => (
              <div key={soal._id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-lepkom-green/10 text-lepkom-green flex items-center justify-center font-bold text-lg flex-shrink-0 mt-0.5">
                    📄
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">{soal.judulSoal}</h3>
                      <Badge variant="info">Tingkat {soal.tingkat}</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 font-mono">{soal.file || 'File-Soal.pdf'}</p>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleDownload(soal._id, soal.file || soal.judulSoal)}
                  className="flex items-center gap-1.5 self-start sm:self-center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Unduh Soal
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500 space-y-2">
            <p className="text-base font-semibold text-gray-700">Belum ada soal ujian tersedia</p>
            <p className="text-xs text-gray-400">Harap tunggu pengawas membagikan soal atau hubungi PJ Ruangan.</p>
          </div>
        )}
      </Card>
    </div>
  )
}
