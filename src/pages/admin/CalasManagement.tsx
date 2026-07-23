import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Select, Badge, DataTable, Card, Skeleton, Button } from '@/components/ui'
import { TimelineUpdateModal } from '@/components/modals/TimelineUpdateModal'
import { BanConfirmModal } from '@/components/modals/BanConfirmModal'
import { useDebounce } from '@/hooks/useDebounce'
import { TAHAP_LABELS } from '@/utils/constants'
import type { Calas, TahapRekrutmen, HasilRekrutmen } from '@/types'
import * as candidateService from '@/services/candidate.service'

export default function CalasManagement() {
  const navigate = useNavigate()
  const [calasList, setCalasList] = useState<Calas[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [tahapFilter, setTahapFilter] = useState<string>('')
  const [hasilFilter, setHasilFilter] = useState<string>('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 10

  const debouncedSearch = useDebounce(search, 300)

  // Modal states
  const [selectedCalas, setSelectedCalas] = useState<Calas | null>(null)
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false)
  const [isBanModalOpen, setIsBanModalOpen] = useState(false)

  const fetchCalas = useCallback(async () => {
    setLoading(true)
    try {
      const res = await candidateService.getCalasList({
        page,
        limit,
        search: debouncedSearch,
      })
      if (res.success && res.data) {
        let list = res.data.data || []
        if (tahapFilter) {
          list = list.filter((c) => c.statusRekrutmen?.tahapSaatIni === tahapFilter)
        }
        if (hasilFilter) {
          list = list.filter((c) => c.statusRekrutmen?.hasil === hasilFilter)
        }
        setCalasList(list)
        setTotal(res.data.total || list.length)
      } else {
        setCalasList([])
        setTotal(0)
      }
    } catch (err) {
      setCalasList([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [page, debouncedSearch, tahapFilter, hasilFilter])

  useEffect(() => {
    fetchCalas()
  }, [fetchCalas])

  const renderHasilBadge = (hasil?: HasilRekrutmen) => {
    switch (hasil) {
      case 'lolos':
        return <Badge variant="status-green">Lolos</Badge>
      case 'tidak_lolos':
        return <Badge variant="status-red">Tidak Lolos</Badge>
      case 'proses':
      default:
        return <Badge variant="status-yellow">Proses</Badge>
    }
  }

  const columns = [
    {
      key: 'namaCalas',
      label: 'Nama Calas',
      render: (row: Calas) => (
        <div>
          <p className="font-semibold text-gray-900">{row.namaCalas}</p>
          <p className="text-xs text-gray-500">{row.emailCalas}</p>
        </div>
      ),
    },
    { key: 'npm', label: 'NPM' },
    { key: 'kelas', label: 'Kelas' },
    {
      key: 'tahap',
      label: 'Tahap saat Ini',
      render: (row: Calas) => (
        <Badge variant="info">
          {row.statusRekrutmen?.tahapSaatIni
            ? TAHAP_LABELS[row.statusRekrutmen.tahapSaatIni]
            : 'Registrasi'}
        </Badge>
      ),
    },
    {
      key: 'hasil',
      label: 'Hasil',
      render: (row: Calas) => renderHasilBadge(row.statusRekrutmen?.hasil),
    },
    {
      key: 'isBanned',
      label: 'Status Akun',
      render: (row: Calas) =>
        row.isBanned ? (
          <Badge variant="status-red">Banned</Badge>
        ) : (
          <Badge variant="status-green">Aktif</Badge>
        ),
    },
    {
      key: 'actions',
      label: 'Aksi',
      render: (row: Calas) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/admin/calas/${row._id}`)}
            className="p-1 text-lepkom-green hover:text-lepkom-green/80 hover:bg-green-50 rounded transition-colors"
            title="Lihat Detail"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button
            onClick={() => {
              setSelectedCalas(row)
              setIsTimelineModalOpen(true)
            }}
            className="p-1 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded transition-colors"
            title="Update Timeline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button
            onClick={() => {
              setSelectedCalas(row)
              setIsBanModalOpen(true)
            }}
            className={`p-1 rounded transition-colors ${
              row.isBanned
                ? 'text-green-600 hover:text-green-800 hover:bg-green-50'
                : 'text-red-600 hover:text-red-800 hover:bg-red-50'
            }`}
            title={row.isBanned ? 'Unban' : 'Ban'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </button>
        </div>
      ),
    },
  ]

  const tahapFilterOptions = [
    { value: '', label: 'Semua Tahap' },
    ...(Object.keys(TAHAP_LABELS) as TahapRekrutmen[]).map((key) => ({
      value: key,
      label: TAHAP_LABELS[key],
    })),
  ]

  const hasilFilterOptions = [
    { value: '', label: 'Semua Hasil' },
    { value: 'proses', label: 'Proses' },
    { value: 'lolos', label: 'Lolos' },
    { value: 'tidak_lolos', label: 'Tidak Lolos' },
  ]

  const totalPages = Math.ceil(total / limit) || 1

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-800">Master Data Calas</h1>
            <Badge variant="info">{total} pendaftar</Badge>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">
            Kelola pendaftaran calon asisten, status kelulusan, dan timeline rekrutmen.
          </p>
        </div>
      </div>

      <Card>
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Cari berdasarkan nama, NPM, atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <Select
              options={tahapFilterOptions}
              value={tahapFilter}
              onChange={(e) => setTahapFilter(e.target.value)}
              placeholder="Filter Tahap"
            />
          </div>
          <div className="w-full md:w-40">
            <Select
              options={hasilFilterOptions}
              value={hasilFilter}
              onChange={(e) => setHasilFilter(e.target.value)}
              placeholder="Filter Hasil"
            />
          </div>
        </div>

        {/* Table / Skeleton */}
        {loading ? (
          <div className="py-6">
            <Skeleton count={5} className="h-10 w-full" />
          </div>
        ) : (
          <>
            <DataTable columns={columns} data={calasList} emptyMessage="Tidak ada data calon asisten ditemukan" />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <span className="text-xs text-gray-500">
                  Halaman {page} dari {totalPages} ({total} total data)
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Sebelumnya
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Selanjutnya
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      {/* Modals */}
      <TimelineUpdateModal
        isOpen={isTimelineModalOpen}
        onClose={() => setIsTimelineModalOpen(false)}
        calas={selectedCalas}
        onSuccess={fetchCalas}
      />

      <BanConfirmModal
        isOpen={isBanModalOpen}
        onClose={() => setIsBanModalOpen(false)}
        calas={selectedCalas}
        onSuccess={fetchCalas}
      />
    </div>
  )
}
