import { useState, useEffect } from 'react'
import { Card, Badge, DataTable, Skeleton } from '@/components/ui'
import type { Penilaian } from '@/types'
import * as evaluationService from '@/services/evaluation.service'

export default function ScoreHistory() {
  const [history, setHistory] = useState<Penilaian[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    setLoading(true)
    try {
      const res = await evaluationService.getMyScores()
      if (res.success && res.data) {
        setHistory(res.data.data || [])
      } else {
        setHistory([])
      }
    } catch (err) {
      setHistory([])
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      key: 'calasRef',
      label: 'Nama Calon Asisten',
      render: (row: Penilaian) => (
        <div>
          <p className="font-bold text-gray-900">{(row as any).calasName || 'Calas ' + row.calasRef}</p>
          <p className="text-xs text-gray-500">
            {new Date(row.createdAt || Date.now()).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      ),
    },
    {
      key: 'jenisUjian',
      label: 'Jenis Ujian',
      render: (row: Penilaian) => (
        <Badge variant={row.jenisUjian === 'praktek' ? 'info' : 'role'}>
          {row.jenisUjian === 'praktek' ? 'Ujian Praktek' : 'Ujian Project'}
        </Badge>
      ),
    },
    {
      key: 'skorKeseluruhan',
      label: 'Skor Akhir',
      render: (row: Penilaian) => (
        <span className="font-extrabold text-lepkom-green text-base">
          {row.skorKeseluruhan ?? '-'} / 100
        </span>
      ),
    },
    {
      key: 'deskripsi',
      label: 'Catatan Penilai',
      render: (row: Penilaian) => (
        <span className="text-gray-600 truncate max-w-xs block">{row.deskripsi || '-'}</span>
      ),
    },
  ]

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Riwayat Penilaian Ujian</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Daftar riwayat skor evaluasi yang telah Anda inputkan sebelumnya.
        </p>
      </div>

      <Card>
        {loading ? (
          <div className="py-6">
            <Skeleton count={4} className="h-12 w-full" />
          </div>
        ) : (
          <DataTable columns={columns} data={history} emptyMessage="Belum ada riwayat penilaian tersimpan." />
        )}
      </Card>
    </div>
  )
}