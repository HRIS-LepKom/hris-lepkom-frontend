import { useState, useEffect } from 'react'
import { Badge, Skeleton } from '@/components/ui'
import { RUANGAN_LIST, type Ruangan } from '@/types'

interface RoomOverview {
  ruangan: Ruangan
  pjNama?: string
  calasCount: number
  penilaiCount: number
}

export default function KanbanBoard() {
  const [loading, setLoading] = useState(true)
  const [roomOverviews, setRoomOverviews] = useState<RoomOverview[]>([])

  useEffect(() => {
    fetchKanbanData()
  }, [])

  const fetchKanbanData = async () => {
    setLoading(true)
    try {
      const data: RoomOverview[] = RUANGAN_LIST.map((r) => ({
        ruangan: r,
        pjNama: `PJ Ruang ${r}`,
        calasCount: 10,
        penilaiCount: 2,
      }))
      setRoomOverviews(data)
    } catch (err) {
      // Fallback
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Kanban Overview Penugasan Ruangan</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Monitoring status penugasan PJ, penilai, dan distribusi peserta calas per ruangan.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Skeleton className="h-80 w-full" count={4} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roomOverviews.map((room) => (
            <div key={room.ruangan} className="bg-page border border-border rounded-xl p-4 flex flex-col space-y-4 shadow-xs">
              {/* Header Ruangan */}
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="font-extrabold text-lg text-gray-900">Ruang {room.ruangan}</h3>
                <Badge variant="status-green">Siap Ujian</Badge>
              </div>

              {/* PJ Info */}
              <div className="bg-white p-3 rounded-lg border border-border space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">PJ Ruangan</p>
                <p className="text-sm font-bold text-gray-900">{room.pjNama || 'Belum di-assign'}</p>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white p-3 rounded-lg border border-border text-center">
                  <p className="text-xs text-gray-500">Calas</p>
                  <p className="text-xl font-bold text-lepkom-green">{room.calasCount}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-border text-center">
                  <p className="text-xs text-gray-500">Penilai</p>
                  <p className="text-xl font-bold text-lepkom-blue">{room.penilaiCount}</p>
                </div>
              </div>

              {/* Card Details */}
              <div className="bg-white p-3 rounded-lg border border-border flex-1 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Kapasitas Ruang:</span>
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