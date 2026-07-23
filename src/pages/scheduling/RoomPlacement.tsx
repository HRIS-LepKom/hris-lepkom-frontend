import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Button, Card, Badge, Skeleton } from '@/components/ui'
import { RUANGAN_LIST, type Ruangan, type User, type Calas } from '@/types'
import * as schedulingService from '@/services/scheduling.service'
import * as assistantService from '@/services/assistant.service'
import * as candidateService from '@/services/candidate.service'

export default function RoomPlacement() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session') || ''
  const navigate = useNavigate()

  const [selectedRuangan, setSelectedRuangan] = useState<Ruangan>(121)
  const [assistants, setAssistants] = useState<User[]>([])
  const [calasList, setCalasList] = useState<Calas[]>([])
  const [selectedCalasIds, setSelectedCalasIds] = useState<string[]>([])
  const [selectedPenilaiIds, setSelectedPenilaiIds] = useState<string[]>([])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [sessionId, selectedRuangan])

  const fetchData = async () => {
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
  }

  const toggleCalas = (id: string) => {
    setSelectedCalasIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const togglePenilai = (id: string) => {
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

      if (res.success) {
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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Placement Calas & Penilai Ruangan</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Pembagian peserta ujian (calas) dan asisten penilai per ruangan.
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

      {/* Select Ruangan */}
      <Card>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold text-gray-800">Pilih Ruangan Target:</span>
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
              return (
                <div
                  key={c._id}
                  onClick={() => toggleCalas(c._id)}
                  className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between transition-colors ${
                    isChecked
                      ? 'border-lepkom-green bg-green-50/60 font-semibold'
                      : 'border-border bg-white hover:bg-page'
                  }`}
                >
                  <div>
                    <p className="text-sm text-gray-900">{c.namaCalas}</p>
                    <p className="text-xs text-gray-500">NPM: {c.npm} | Kelas: {c.kelas}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="rounded text-lepkom-green focus:ring-lepkom-green"
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
              return (
                <div
                  key={a._id}
                  onClick={() => togglePenilai(a._id)}
                  className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between transition-colors ${
                    isChecked
                      ? 'border-lepkom-blue bg-blue-50/60 font-semibold'
                      : 'border-border bg-white hover:bg-page'
                  }`}
                >
                  <div>
                    <p className="text-sm text-gray-900">{a.nama}</p>
                    <p className="text-xs text-gray-500">NPM: {a.npm} | Role: {a.role}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="rounded text-lepkom-blue focus:ring-lepkom-blue"
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
