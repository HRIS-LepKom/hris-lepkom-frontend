import { useState, useEffect, useCallback } from 'react'
import { Badge, Skeleton, Card, Select } from '@/components/ui'
import { RUANGAN_LIST, type Ruangan, type ExamSession } from '@/types'
import { formatDateFull } from '@/utils/format'
import * as schedulingService from '@/services/scheduling.service'

interface RoomOverview {
  ruangan: Ruangan
  pjNama?: string
  calasCount: number
  penilaiCount: number
}

export default function KanbanBoard() {
  const [loading, setLoading] = useState(true)
  const [sessions, setSessions] = useState<ExamSession[]>([])
  const [selectedSessionId, setSelectedSessionId] = useState<string>('')
  const [roomOverviews, setRoomOverviews] = useState<RoomOverview[]>([])

  const fetchSessions = async () => {
    try {
      const res = await schedulingService.getExamSessionList()
      if (res.success && res.data) {
        const list = res.data.data || []
        setSessions(list)
        if (list.length > 0 && !selectedSessionId) {
          setSelectedSessionId(list[0]._id)
        }
      }
    } catch (err) {
      // Fallback
    }
  }

  const fetchKanbanData = useCallback(async () => {
    setLoading(true)
    try {
      const [assignRes, placementRes] = await Promise.all([
        selectedSessionId ? schedulingService.getRoomAssignments(selectedSessionId) : Promise.resolve({ success: true, data: [] }),
        selectedSessionId ? schedulingService.getRoomPlacements(selectedSessionId) : Promise.resolve({ success: true, data: [] }),
      ])

      const assignMap: Record<number, string> = {}
      if (assignRes.success && assignRes.data) {
        assignRes.data.forEach((item) => {
          assignMap[item.ruangan] = item.pjRuanganRef
        })
      }

      const placementMap: Record<number, { calasCount: number; penilaiCount: number }> = {}
      if (placementRes.success && placementRes.data) {
        placementRes.data.forEach((item) => {
          placementMap[item.ruangan] = {
            calasCount: item.calasList?.length || 0,
            penilaiCount: item.penilaiList?.length || 0,
          }
        })
      }

      const data: RoomOverview[] = RUANGAN_LIST.map((r) => ({
        ruangan: r,
        pjNama: assignMap[r] ? `PJ Lab ${r}` : 'Belum di-assign',
        calasCount: placementMap[r]?.calasCount || 0,
        penilaiCount: placementMap[r]?.penilaiCount || 0,
      }))

      setRoomOverviews(data)
    } catch (err) {
      // Fallback
    } finally {
      setLoading(false)
    }
  }, [selectedSessionId])

  useEffect(() => {
    fetchSessions()
  }, [])

  useEffect(() => {
    fetchKanbanData()
  }, [fetchKanbanData])

  const selectedSession = sessions.find((s) => s._id === selectedSessionId) || sessions[0]

  const sessionOptions = sessions.map((s) => ({
    value: s._id,
    label: `${formatDateFull(s.tanggal)} — ${s.catatan || (s.jenisUjian === 'praktek' ? 'Ujian Praktek' : 'Ujian Project')}`,
  }))

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* ─── Header & Session Selector ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kanban Overview Penugasan Ruangan</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Monitoring status penugasan PJ, penilai, dan distribusi peserta calas per ruangan.
          </p>
        </div>

        {sessions.length > 0 && (
          <div className="w-full md:w-96">
            <Select
              label="Pilih Sesi Ujian"
              options={sessionOptions}
              value={selectedSessionId}
              onChange={(e) => setSelectedSessionId(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* ─── Session Date Banner ─── */}
      {selectedSession && (
        <Card className="bg-gradient-to-r from-lepkom-blue to-emerald-900 text-white border-none shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">📅</span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Tanggal & Jadwal Ujian</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold">{formatDateFull(selectedSession.tanggal)}</h2>
              <p className="text-xs text-white/80">{selectedSession.catatan || 'Sesi Penilaian Ujian Rekrutmen LEPKOM'}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="role" className="bg-white/20 text-white border-none text-sm px-3 py-1">
                {selectedSession.jenisUjian === 'praktek' ? '📝 Ujian Praktek' : '📊 Ujian Project'}
              </Badge>
            </div>
          </div>
        </Card>
      )}

      {/* ─── Kanban Cards ─── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Skeleton className="h-80 w-full" count={4} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roomOverviews.map((room) => (
            <div key={room.ruangan} className="bg-surface border border-border rounded-xl p-4 flex flex-col space-y-4 shadow-xs">
              {/* Header Ruangan */}
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900">Lab {room.ruangan}</h3>
                  {selectedSession && (
                    <p className="text-[10px] text-gray-500 font-semibold mt-0.5">
                      🗓️ {formatDateFull(selectedSession.tanggal)}
                    </p>
                  )}
                </div>
                <Badge variant={room.pjNama !== 'Belum di-assign' ? 'status-green' : 'status-yellow'}>
                  {room.pjNama !== 'Belum di-assign' ? 'Siap' : 'Pending'}
                </Badge>
              </div>

              {/* PJ Info */}
              <div className="bg-page p-3 rounded-lg border border-border space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">PJ Ruangan</p>
                <p className="text-sm font-bold text-gray-900">{room.pjNama}</p>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-page p-3 rounded-lg border border-border text-center">
                  <p className="text-xs text-gray-500 font-medium">Calas</p>
                  <p className="text-xl font-extrabold text-lepkom-green">{room.calasCount}</p>
                </div>
                <div className="bg-page p-3 rounded-lg border border-border text-center">
                  <p className="text-xs text-gray-500 font-medium">Penilai</p>
                  <p className="text-xl font-extrabold text-lepkom-blue">{room.penilaiCount}</p>
                </div>
              </div>

              {/* Card Details */}
              <div className="bg-page p-3 rounded-lg border border-border flex-1 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Kapasitas PC:</span>
                  <span className="font-semibold">30 Komputer</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Status Ruangan:</span>
                  <span className="font-semibold text-green-600">Aktif</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}