import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Card, Select, Badge, Skeleton } from '@/components/ui'
import { RUANGAN_LIST, type Ruangan, type User } from '@/types'
import * as schedulingService from '@/services/scheduling.service'
import * as assistantService from '@/services/assistant.service'

export default function RoomAssignment() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session') || ''

  const [assistants, setAssistants] = useState<User[]>([])
  const [pjAssignments, setPjAssignments] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [sessionId])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [asistenRes, assignRes] = await Promise.all([
        assistantService.getAsistenList({ limit: 100 }),
        sessionId ? schedulingService.getRoomAssignments(sessionId) : Promise.resolve({ success: true, data: [] }),
      ])

      if (asistenRes.success && asistenRes.data) {
        setAssistants(asistenRes.data.data || [])
      }

      if (assignRes.success && assignRes.data) {
        const map: Record<number, string> = {}
        assignRes.data.forEach((item) => {
          map[item.ruangan] = item.pjRuanganRef
        })
        setPjAssignments(map)
      }
    } catch (err) {
      // Fallback empty state
    } finally {
      setLoading(false)
    }
  }

  const handlePjChange = (ruangan: Ruangan, pjId: string) => {
    setPjAssignments((prev) => ({ ...prev, [ruangan]: pjId }))
  }

  const handleSaveAll = async () => {
    if (!sessionId) {
      setError('Silakan pilih sesi ujian terlebih dahulu dari daftar sesi.')
      return
    }

    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const promises = RUANGAN_LIST.map((ruangan) => {
        const pjId = pjAssignments[ruangan]
        if (pjId) {
          return schedulingService.setRoomAssignment({
            examSessionRef: sessionId,
            ruangan,
            pjRuanganRef: pjId,
          })
        }
        return Promise.resolve(null)
      })

      await Promise.all(promises)
      setSuccess('Penugasan PJ Ruangan berhasil disimpan!')
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Gagal menyimpan penugasan PJ Ruangan.')
    } finally {
      setSaving(false)
    }
  }

  const assistantOptions = [
    { value: '', label: 'Pilih PJ Ruangan' },
    ...assistants.map((a) => ({
      value: a._id,
      label: `${a.nama} (${a.npm})`,
    })),
  ]

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-48 w-full" count={4} />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Penugasan PJ Ruangan Ujian</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Plotting Asisten sebagai Penanggung Jawab Ruangan 121, 122, 124, 125.
          </p>
        </div>
        <Button variant="primary" onClick={handleSaveAll} loading={saving}>
          Simpan Penugasan PJ
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-4 rounded-lg">
          {success}
        </div>
      )}

      {/* Grid 2x2 Ruangan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RUANGAN_LIST.map((ruangan) => {
          const currentPjId = pjAssignments[ruangan] || ''
          const currentPjUser = assistants.find((a) => a._id === currentPjId)

          return (
            <Card
              key={ruangan}
              header={
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">Ruangan {ruangan}</span>
                  {currentPjId ? (
                    <Badge variant="status-green">Terisi PJ</Badge>
                  ) : (
                    <Badge variant="status-yellow">Belum ada PJ</Badge>
                  )}
                </div>
              }
            >
              <div className="space-y-4">
                <Select
                  label="Asisten Penanggung Jawab (PJ)"
                  options={assistantOptions}
                  value={currentPjId}
                  onChange={(e) => handlePjChange(ruangan, e.target.value)}
                />

                {currentPjUser && (
                  <div className="p-3 bg-page rounded-lg border border-border text-xs space-y-1">
                    <p className="font-bold text-gray-800">{currentPjUser.nama}</p>
                    <p className="text-gray-500">NPM: {currentPjUser.npm} | Email: {currentPjUser.email}</p>
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}