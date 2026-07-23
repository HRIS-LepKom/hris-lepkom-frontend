import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Badge, DataTable, Skeleton } from '@/components/ui'
import type { ExamSession } from '@/types'
import * as schedulingService from '@/services/scheduling.service'

export default function SessionList() {
  const navigate = useNavigate()
  const [sessions, setSessions] = useState<ExamSession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    setLoading(true)
    try {
      const res = await schedulingService.getExamSessionList()
      if (res.success && res.data) {
        setSessions(res.data.data || [])
      } else {
        setSessions([])
      }
    } catch (err) {
      setSessions([])
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      key: 'tanggal',
      label: 'Tanggal Ujian',
      render: (row: ExamSession) => (
        <span className="font-bold text-gray-900">
          {new Date(row.tanggal).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      ),
    },
    {
      key: 'jenisUjian',
      label: 'Jenis Ujian',
      render: (row: ExamSession) => (
        <Badge variant={row.jenisUjian === 'praktek' ? 'info' : 'role'}>
          {row.jenisUjian === 'praktek' ? 'Ujian Praktek' : 'Ujian Project'}
        </Badge>
      ),
    },
    {
      key: 'catatan',
      label: 'Catatan',
      render: (row: ExamSession) => <span className="text-gray-600 truncate max-w-xs block">{row.catatan || '-'}</span>,
    },
    {
      key: 'actions',
      label: 'Aksi Penugasan',
      render: (row: ExamSession) => (
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/korlap/rooms?session=${row._id}`)}
          >
            Assign PJ Ruangan
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/scheduling/room-placement?session=${row._id}`)}
          >
            Placement Calas & Penilai
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Penjadwalan Sesi Ujian</h1>
          <p className="text-sm text-gray-500 mt-0.5">Kelola tanggal, jenis ujian, dan plot penugasan ruangan.</p>
        </div>
        <Button variant="primary" onClick={() => navigate('/scheduling/session-create')} className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Buat Sesi Ujian Baru
        </Button>
      </div>

      <Card>
        {loading ? (
          <div className="py-6">
            <Skeleton count={4} className="h-12 w-full" />
          </div>
        ) : (
          <DataTable columns={columns} data={sessions} emptyMessage="Belum ada sesi ujian dijadwalkan" />
        )}
      </Card>
    </div>
  )
}
