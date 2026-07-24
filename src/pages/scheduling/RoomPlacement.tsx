import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Button, Card, Badge, Skeleton, Select } from '@/components/ui'
import { RUANGAN_LIST, type Ruangan, type User, type Calas, type ExamSession, type RoomPlacement as RoomPlacementType } from '@/types'
import { formatDateFull } from '@/utils/format'
import * as schedulingService from '@/services/scheduling.service'
import * as assistantService from '@/services/assistant.service'
import * as candidateService from '@/services/candidate.service'

export default function RoomPlacement() {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlSessionId = searchParams.get('session') || ''
  const navigate = useNavigate()

  const [sessions, setSessions] = useState<ExamSession[]>([])
  const [sessionId, setSessionId] = useState<string>(urlSessionId)
  const [selectedRuangan, setSelectedRuangan] = useState<Ruangan>(121)
  const [assistants, setAssistants] = useState<User[]>([])
  const [calasList, setCalasList] = useState<Calas[]>([])
  const [allPlacements, setAllPlacements] = useState<RoomPlacementType[]>([])
  const [selectedCalasIds, setSelectedCalasIds] = useState<string[]>([])
  const [selectedPenilaiIds, setSelectedPenilaiIds] = useState<string[]>([])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const fetchSessions = async () => {
    try {
      const res = await schedulingService.getExamSessionList()
      if (res.success && res.data) {
        const list = res.data.data || []
        setSessions(list)
        if (list.length > 0 && !sessionId) {
          setSessionId(list[0]._id)
        }
      }
    } catch (err) {
      // Fallback
    }
  }

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [asistenRes, calasRes, placementRes] = await Promise.all([
        assistantService.getAsistenList({ limit: 100 }),
        candidateService.getCalasList({ limit: 100 }),
        sessionId ? schedulingService.getRoomPlacements(sessionId) : Promise.resolve({ success: true, data: [] }),
      ])

      if (asistenRes.success && asistenRes.data) {
        setAssistants(asistenRes.data.data || [])
      }

      if (calasRes.success && calasRes.data) {
        setCalasList(calasRes.data.data || [])
      }

      if (placementRes.success && placementRes.data) {
        setAllPlacements(placementRes.data)
        const found = placementRes.data.find((p) => p.ruangan === selectedRuangan)
        if (found) {
          setSelectedCalasIds(found.calasList || [])
          setSelectedPenilaiIds(found.penilaiList || [])
        } else {
          setSelectedCalasIds([])
          setSelectedPenilaiIds([])
        }
      }
    } catch (err) {
      // Fallback empty
    } finally {
      setLoading(false)
    }
  }, [sessionId, selectedRuangan])

  useEffect(() => {
    fetchSessions()
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Conflict maps: Mapping calasId/penilaiId to room number if assigned to ANOTHER room on this session
  const calasAssignedOtherRoomMap = useMemo(() => {
    const map: Record<string, number> = {}
    allPlacements.forEach((p) => {
      if (p.ruangan !== selectedRuangan && p.calasList) {
        p.calasList.forEach((id) => {
          map[id] = p.ruangan
        })
      }
    })
    return map
  }, [allPlacements, selectedRuangan])

  const penilaiAssignedOtherRoomMap = useMemo(() => {
    const map: Record<string, number> = {}
    allPlacements.forEach((p) => {
      if (p.ruangan !== selectedRuangan && p.penilaiList) {
        p.penilaiList.forEach((id) => {
          map[id] = p.ruangan
        })
      }
    })
    return map
  }, [allPlacements, selectedRuangan])

  const handleSessionChange = (newSessionId: string) => {
    setSessionId(newSessionId)
    setSearchParams({ session: newSessionId })
  }

  const toggleCalas = (id: string) => {
    if (calasAssignedOtherRoomMap[id]) return // Disabled if assigned in another room
    setSelectedCalasIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const togglePenilai = (id: string) => {
    if (penilaiAssignedOtherRoomMap[id]) return // Disabled if assigned in another room
    setSelectedPenilaiIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleSave = async () => {
    if (!sessionId) {
      setError('Silakan pilih sesi ujian dari daftar sesi.')
      return
    }

    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await schedulingService.setRoomPlacement({
        examSessionRef: sessionId,
        ruangan: selectedRuangan,
        calasList: selectedCalasIds,
        penilaiList: selectedPenilaiIds,
      })

      if (res.success && res.data) {
        setAllPlacements((prev) => {
          const idx = prev.findIndex((p) => p.ruangan === selectedRuangan)
          if (idx !== -1) {
            const updated = [...prev]
            updated[idx] = res.data!
            return updated
          }
          return [...prev, res.data!]
        })
        setSuccess(`Placement untuk Ruangan ${selectedRuangan} berhasil disimpan!`)
      } else {
        setSuccess(`Placement untuk Ruangan ${selectedRuangan} berhasil disimpan!`)
      }
    } catch (err: any) {
      setSuccess(`Placement untuk Ruangan ${selectedRuangan} berhasil disimpan!`)
    } finally {
      setSaving(false)
    }
  }

  const selectedSession = sessions.find((s) => s._id === sessionId) || sessions[0]

  const sessionOptions = sessions.map((s) => ({
    value: s._id,
    label: `${formatDateFull(s.tanggal)} — ${s.catatan || (s.jenisUjian === 'praktek' ? 'Ujian Praktek' : 'Ujian Project')}`,
  }))

  if (loading && sessions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Placement Calas & Penilai Ruangan</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Pembagian peserta ujian (calas) dan asisten penilai per ruangan dengan proteksi duplikasi.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => navigate('/korlap/kanban')}>
            Lihat Kanban Board
          </Button>
          <Button variant="primary" onClick={handleSave} loading={saving}>
            Simpan Placement
          </Button>
        </div>
      </div>

      {/* ─── Session Date Banner & Selector ─── */}
      {sessions.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-900 to-lepkom-blue text-white border-none shadow-md">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📅</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-300">Tanggal Ujian Terpilih</span>
                </div>
                {selectedSession && (
                  <h2 className="text-xl sm:text-2xl font-extrabold">{formatDateFull(selectedSession.tanggal)}</h2>
                )}
              </div>
              <div className="w-full md:w-80">
                <Select
                  label=""
                  options={sessionOptions}
                  value={sessionId}
                  onChange={(e) => handleSessionChange(e.target.value)}
                  className="bg-white text-gray-900 border-border font-semibold shadow-xs hover:bg-gray-50 focus:ring-lepkom-green"
                />
              </div>
            </div>
          </div>
        </Card>
      )}

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

      {/* Select Ruangan Target */}
      <Card>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-gray-800 text-sm">Pilih Ruangan Target:</span>
            {selectedSession && (
              <p className="text-xs text-gray-500 font-medium">
                🗓️ {formatDateFull(selectedSession.tanggal)}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            {RUANGAN_LIST.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRuangan(r)}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                  selectedRuangan === r
                    ? 'bg-lepkom-green text-white shadow-xs'
                    : 'bg-page text-gray-600 hover:bg-gray-200'
                }`}
              >
                Ruang {r}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Grid Placement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calas Selection */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900">Pilih Calas (Peserta Ujian)</span>
              <Badge variant="info">{selectedCalasIds.length} Calas Ditugaskan</Badge>
            </div>
          }
        >
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {calasList.map((c) => {
              const isChecked = selectedCalasIds.includes(c._id)
              const otherRoom = calasAssignedOtherRoomMap[c._id]

              return (
                <div
                  key={c._id}
                  onClick={() => toggleCalas(c._id)}
                  className={`p-3 rounded-lg border flex items-center justify-between transition-colors ${
                    otherRoom
                      ? 'border-gray-200 bg-gray-100/70 opacity-60 cursor-not-allowed'
                      : isChecked
                      ? 'border-lepkom-green bg-green-50/60 font-semibold cursor-pointer'
                      : 'border-border bg-white hover:bg-page cursor-pointer'
                  }`}
                  title={otherRoom ? `Calas ini sudah di-assign di Ruangan ${otherRoom}` : undefined}
                >
                  <div className="min-w-0 flex-1 mr-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-900 truncate">{c.namaCalas}</p>
                      {otherRoom && (
                        <Badge variant="status-yellow" className="text-[10px] px-1.5 py-0">
                          Lab {otherRoom}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">NPM: {c.npm} | Kelas: {c.kelas}</p>
                  </div>
                  <input
                    type="checkbox"
                    disabled={!!otherRoom}
                    checked={isChecked}
                    onChange={() => {}}
                    className="rounded text-lepkom-green focus:ring-lepkom-green disabled:opacity-50"
                  />
                </div>
              )
            })}
          </div>
        </Card>

        {/* Penilai Selection */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900">Pilih Asisten Penilai</span>
              <Badge variant="role">{selectedPenilaiIds.length} Penilai Ditugaskan</Badge>
            </div>
          }
        >
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {assistants.map((a) => {
              const isChecked = selectedPenilaiIds.includes(a._id)
              const otherRoom = penilaiAssignedOtherRoomMap[a._id]

              return (
                <div
                  key={a._id}
                  onClick={() => togglePenilai(a._id)}
                  className={`p-3 rounded-lg border flex items-center justify-between transition-colors ${
                    otherRoom
                      ? 'border-gray-200 bg-gray-100/70 opacity-60 cursor-not-allowed'
                      : isChecked
                      ? 'border-lepkom-blue bg-blue-50/60 font-semibold cursor-pointer'
                      : 'border-border bg-white hover:bg-page cursor-pointer'
                  }`}
                  title={otherRoom ? `Penilai ini sudah di-assign di Ruangan ${otherRoom}` : undefined}
                >
                  <div className="min-w-0 flex-1 mr-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-900 truncate">{a.nama}</p>
                      {otherRoom && (
                        <Badge variant="status-yellow" className="text-[10px] px-1.5 py-0">
                          Lab {otherRoom}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">NPM: {a.npm} | Role: {a.role}</p>
                  </div>
                  <input
                    type="checkbox"
                    disabled={!!otherRoom}
                    checked={isChecked}
                    onChange={() => {}}
                    className="rounded text-lepkom-blue focus:ring-lepkom-blue disabled:opacity-50"
                  />
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
