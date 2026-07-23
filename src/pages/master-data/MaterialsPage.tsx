import { useState, useEffect, useCallback } from 'react'
import { Button, Input, Select, Badge, DataTable, Card, Modal, Textarea, Skeleton } from '@/components/ui'
import type { Materi } from '@/types'
import * as masterDataService from '@/services/masterData.service'

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Materi[]>([])
  const [loading, setLoading] = useState(true)
  const [tingkatFilter, setTingkatFilter] = useState<string>('')

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [selectedMateri, setSelectedMateri] = useState<Materi | null>(null)
  const [formData, setFormData] = useState({
    namaMateri: '',
    tingkat: '1',
    deskripsi: '',
  })
  const [modalLoading, setModalLoading] = useState(false)
  const [modalError, setModalError] = useState<string | null>(null)

  const fetchMaterials = useCallback(async () => {
    setLoading(true)
    try {
      const params = tingkatFilter ? { tingkat: Number(tingkatFilter) } : undefined
      const res = await masterDataService.getMateriList(params)
      if (res.success && res.data) {
        setMaterials(res.data.data || [])
      } else {
        setMaterials([])
      }
    } catch (err) {
      setMaterials([])
    } finally {
      setLoading(false)
    }
  }, [tingkatFilter])

  useEffect(() => {
    fetchMaterials()
  }, [fetchMaterials])

  const handleOpenCreate = () => {
    setSelectedMateri(null)
    setModalMode('create')
    setFormData({ namaMateri: '', tingkat: '1', deskripsi: '' })
    setModalError(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (materi: Materi) => {
    setSelectedMateri(materi)
    setModalMode('edit')
    setFormData({
      namaMateri: materi.namaMateri,
      tingkat: String(materi.tingkat),
      deskripsi: materi.deskripsi || '',
    })
    setModalError(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus materi ini?')) {
      try {
        await masterDataService.deleteMateri(id)
        fetchMaterials()
      } catch (err) {
        alert('Gagal menghapus materi.')
      }
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.namaMateri.trim()) {
      setModalError('Nama materi wajib diisi.')
      return
    }

    setModalLoading(true)
    setModalError(null)

    try {
      if (modalMode === 'create') {
        const res = await masterDataService.createMateri({
          namaMateri: formData.namaMateri,
          tingkat: Number(formData.tingkat),
          deskripsi: formData.deskripsi,
        })
        if (res.success) {
          setIsModalOpen(false)
          fetchMaterials()
        } else {
          setModalError(res.error || 'Gagal membuat materi.')
        }
      } else if (modalMode === 'edit' && selectedMateri) {
        const res = await masterDataService.updateMateri(selectedMateri._id, {
          namaMateri: formData.namaMateri,
          tingkat: Number(formData.tingkat) as 1 | 2 | 3,
          deskripsi: formData.deskripsi,
        })
        if (res.success) {
          setIsModalOpen(false)
          fetchMaterials()
        } else {
          setModalError(res.error || 'Gagal mengupdate materi.')
        }
      }
    } catch (err: any) {
      setModalError(err.response?.data?.error || err.message || 'Terjadi kesalahan sistem.')
    } finally {
      setModalLoading(false)
    }
  }

  const columns = [
    {
      key: 'namaMateri',
      label: 'Nama Materi',
      render: (row: Materi) => <span className="font-semibold text-gray-900">{row.namaMateri}</span>,
    },
    {
      key: 'tingkat',
      label: 'Tingkat Kursus',
      render: (row: Materi) => (
        <Badge variant={row.tingkat === 1 ? 'info' : row.tingkat === 2 ? 'status-yellow' : 'role'}>
          Tingkat {row.tingkat}
        </Badge>
      ),
    },
    {
      key: 'deskripsi',
      label: 'Deskripsi',
      render: (row: Materi) => <span className="text-gray-600 truncate max-w-md block">{row.deskripsi || '-'}</span>,
    },
    {
      key: 'actions',
      label: 'Aksi',
      render: (row: Materi) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenEdit(row)}
            className="p-1 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded transition-colors"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
            title="Hapus"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ),
    },
  ]

  const tingkatFilterOptions = [
    { value: '', label: 'Semua Tingkat' },
    { value: '1', label: 'Tingkat 1' },
    { value: '2', label: 'Tingkat 2' },
    { value: '3', label: 'Tingkat 3' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Master Data Materi Kursus</h1>
          <p className="text-sm text-gray-500 mt-0.5">Kelola daftar materi praktikum LEPKOM per tingkat.</p>
        </div>
        <Button variant="primary" onClick={handleOpenCreate} className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Materi
        </Button>
      </div>

      <Card>
        <div className="flex justify-end mb-6">
          <div className="w-full sm:w-56">
            <Select
              options={tingkatFilterOptions}
              value={tingkatFilter}
              onChange={(e) => setTingkatFilter(e.target.value)}
              placeholder="Filter Tingkat"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-6">
            <Skeleton count={5} className="h-10 w-full" />
          </div>
        ) : (
          <DataTable columns={columns} data={materials} emptyMessage="Belum ada data materi" />
        )}
      </Card>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'create' ? 'Tambah Materi Kursus' : 'Edit Materi Kursus'}
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)} disabled={modalLoading}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleSave} loading={modalLoading}>
              Simpan
            </Button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4">
          {modalError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-lg">
              {modalError}
            </div>
          )}

          <Input
            label="Nama Materi"
            value={formData.namaMateri}
            onChange={(e) => setFormData((p) => ({ ...p, namaMateri: e.target.value }))}
            placeholder="Contoh: Pemrograman Web Lanjut"
            required
          />

          <Select
            label="Tingkat Kursus"
            options={[
              { value: '1', label: 'Tingkat 1' },
              { value: '2', label: 'Tingkat 2' },
              { value: '3', label: 'Tingkat 3' },
            ]}
            value={formData.tingkat}
            onChange={(e) => setFormData((p) => ({ ...p, tingkat: e.target.value }))}
            required
          />

          <Textarea
            label="Deskripsi Materi"
            value={formData.deskripsi}
            onChange={(e) => setFormData((p) => ({ ...p, deskripsi: e.target.value }))}
            placeholder="Jelaskan silabus atau fokus pembahasan..."
            rows={3}
          />
        </form>
      </Modal>
    </div>
  )
}