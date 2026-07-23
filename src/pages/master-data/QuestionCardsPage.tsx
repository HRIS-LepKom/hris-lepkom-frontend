import { useState, useEffect, useCallback } from 'react'
import { Button, Input, DataTable, Card, Modal, Textarea, Skeleton } from '@/components/ui'
import type { QuestionCard as QuestionCardType } from '@/types'
import * as masterDataService from '@/services/masterData.service'

export default function QuestionCardsPage() {
  const [cards, setCards] = useState<QuestionCardType[]>([])
  const [loading, setLoading] = useState(true)

  // Modal Form State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [selectedCard, setSelectedCard] = useState<QuestionCardType | null>(null)
  const [judulPertanyaan, setJudulPertanyaan] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [modalLoading, setModalLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchQuestionCards = useCallback(async () => {
    setLoading(true)
    try {
      const res = await masterDataService.getQuestionCardList()
      if (res.success && res.data) {
        setCards(res.data.data || [])
      } else {
        setCards([])
      }
    } catch (err) {
      setCards([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchQuestionCards()
  }, [fetchQuestionCards])

  const handleOpenCreate = () => {
    setSelectedCard(null)
    setModalMode('create')
    setJudulPertanyaan('')
    setDeskripsi('')
    setError(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (card: QuestionCardType) => {
    setSelectedCard(card)
    setModalMode('edit')
    setJudulPertanyaan(card.judulPertanyaan)
    setDeskripsi(card.deskripsi || '')
    setError(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pertanyaan ini?')) {
      try {
        await masterDataService.deleteQuestionCard(id)
        fetchQuestionCards()
      } catch (err) {
        alert('Gagal menghapus pertanyaan.')
      }
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!judulPertanyaan.trim()) {
      setError('Judul pertanyaan wajib diisi.')
      return
    }

    setModalLoading(true)
    setError(null)

    try {
      if (modalMode === 'create') {
        const res = await masterDataService.createQuestionCard({
          judulPertanyaan,
          deskripsi,
        })
        if (res.success) {
          setIsModalOpen(false)
          fetchQuestionCards()
        } else {
          setError(res.error || 'Gagal membuat pertanyaan.')
        }
      } else if (modalMode === 'edit' && selectedCard) {
        const res = await masterDataService.updateQuestionCard(selectedCard._id, {
          judulPertanyaan,
          deskripsi,
        })
        if (res.success) {
          setIsModalOpen(false)
          fetchQuestionCards()
        } else {
          setError(res.error || 'Gagal mengupdate pertanyaan.')
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Terjadi kesalahan sistem.')
    } finally {
      setModalLoading(false)
    }
  }

  const columns = [
    {
      key: 'judulPertanyaan',
      label: 'Pertanyaan',
      render: (row: QuestionCardType) => (
        <span className="font-semibold text-gray-900">{row.judulPertanyaan}</span>
      ),
    },
    {
      key: 'deskripsi',
      label: 'Deskripsi / Kriteria Jawaban',
      render: (row: QuestionCardType) => (
        <span className="text-gray-600 truncate max-w-lg block">{row.deskripsi || '-'}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Aksi',
      render: (row: QuestionCardType) => (
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Bank Question Card</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Daftar pertanyaan acak untuk penilaian wawancara/klarifikasi ujian praktek.
          </p>
        </div>
        <Button variant="primary" onClick={handleOpenCreate} className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Pertanyaan
        </Button>
      </div>

      <Card>
        {loading ? (
          <div className="py-6">
            <Skeleton count={5} className="h-10 w-full" />
          </div>
        ) : (
          <DataTable columns={columns} data={cards} emptyMessage="Belum ada pertanyaan pada question card" />
        )}
      </Card>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'create' ? 'Tambah Pertanyaan' : 'Edit Pertanyaan'}
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
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-lg">
              {error}
            </div>
          )}

          <Input
            label="Judul / Pertanyaan"
            value={judulPertanyaan}
            onChange={(e) => setJudulPertanyaan(e.target.value)}
            placeholder="Contoh: Jelaskan perbedaan antara process dan thread pada OS"
            required
          />

          <Textarea
            label="Deskripsi / Panduan Penilaian"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Kunci jawaban atau poin penting yang harus disebutkan calas..."
            rows={4}
          />
        </form>
      </Modal>
    </div>
  )
}