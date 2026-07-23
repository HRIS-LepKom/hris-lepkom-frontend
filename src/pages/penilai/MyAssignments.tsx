import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Badge, DataTable, Skeleton } from '@/components/ui'
import type { Penilaian } from '@/types'
import * as evaluationService from '@/services/evaluation.service'

export default function MyAssignments() {
  const navigate = useNavigate()
  const [assignments, setAssignments] = useState<Penilaian[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAssignments()
  }, [])

  const fetchAssignments = async () => {
    setLoading(true)
    try {
      const res = await evaluationService.getMyAssignments()
      if (res.success && res.data) {
        setAssignments(res.data.data || [])
      } else {
        setAssignments([])
      }
    } catch (err) {
      setAssignments([])
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
          <p className="text-xs text-gray-500">ID: {row.calasRef}</p>
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
      key: 'status',
      label: 'Status Penilaian',
      render: (row: Penilaian) =>
        row.skorKeseluruhan ? (
          <Badge variant="status-green">Sudah Dinilai ({row.skorKeseluruhan})</Badge>
        ) : (
          <Badge variant="status-yellow">Belum Dinilai</Badge>
        ),
    },
    {
      key: 'actions',
      label: 'Aksi',
      render: (row: Penilaian) => (
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate(`/penilai/score/${row.calasRef}?jenis=${row.jenisUjian}&session=${row.examSessionRef}`)}
        >
          {row.skorKeseluruhan ? 'Edit Nilai' : 'Input Nilai'}
        </Button>
      ),
    },
  ]

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Daftar Tugas Penilaian</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Peserta ujian calon asisten yang ditugaskan kepada Anda untuk dinilai.
        </p>
      </div>

      <Card>
        {loading ? (
          <div className="py-6">
            <Skeleton count={4} className="h-12 w-full" />
          </div>
        ) : (
          <DataTable columns={columns} data={assignments} emptyMessage="Belum ada tugas penilaian ditugaskan kepada Anda." />
        )}
      </Card>
    </div>
  )
}
