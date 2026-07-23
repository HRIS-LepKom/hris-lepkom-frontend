import { useState, useEffect, useCallback } from 'react'
import { Button, Input, Select, Badge, DataTable, Card, Modal, Skeleton } from '@/components/ui'
import type { Soal } from '@/types'
import * as masterDataService from '@/services/masterData.service'

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Soal[]>([])
  const [loading, setLoading] = useState(true)
  const [tingkatFilter, setTingkatFilter] = useState<string>('')

  // Modal Upload State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [judulSoal, setJudulSoal] = useState('')
  const [tingkat, setTingkat] = useState('1')
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchQuestions = useCallback(async () => {
    setLoading(true)
    try {
      const params = tingkatFilter ? { tingkat: Number(tingkatFilter) } : undefined
      const res = await masterDataService.getSoalList(params)
      if (res.success && res.data) {
        setQuestions(res.data.data || [])
      } else {
        setQuestions([])
      }
    } catch (err) {
      setQuestions([])
    } finally {
      setLoading(false)
    }
  }, [tingkatFilter])

  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  const handleOpenUpload = () => {
    setJudulSoal('')
    setTingkat('1')
    setFile(null)
    setError(null)
    setIsModalOpen(true)
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!judulSoal.trim()) {
      setError('Judul soal wajib diisi.')
      return
    }
    if (!file) {
      setError('Silakan pilih file soal (.pdf atau .docx).')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const res = await masterDataService.createSoal({
        judulSoal,
        tingkat: Number(tingkat),
        file,
      })
      if (res.success) {
        setIsModalOpen(false)
        fetchQuestions()
      } else {
        setError(res.error || 'Gagal mengunggah soal.')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Terjadi kesalahan sistem saat mengunggah.')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
      try {
        await masterDataService.deleteSoal(id)
        fetchQuestions()
      } catch (err) {
        alert('Gagal menghapus soal.')
      }
    }
  }

  const handleDownload = async (id: string, fileName: string) => {
    try {
      const blob = await masterDataService.downloadSoal(id)
      const url = window.URL.createObjectURL(new Blob([blob]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName || `Soal-${id}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      alert('Gagal mengunduh file soal.')
    }
  }

  const columns = [
    {
      key: 'judulSoal',
      label: 'Judul Soal Ujian',
      render: (row: Soal) => (
        <div>
          <p className="font-semibold text-gray-900">{row.judulSoal}</p>
          <p className="text-xs text-gray-500">{new Date(row.createdAt).toLocaleDateString('id-ID')}</p>
        </div>
      ),
    },
    {
      key: 'tingkat',
      label: 'Tingkat',
      render: (row: Soal) => (
        <Badge variant={row.tingkat === 1 ? 'info' : row.tingkat === 2 ? 'status-yellow' : 'role'}>
          Tingkat {row.tingkat}
        </Badge>
      ),
    },
    {
      key: 'file',
      label: 'File Dokumen',
      render: (row: Soal) => (
        <div className="flex items-center gap-2 text-xs text-gray-600 font-mono">
          <svg className="w-4 h-4 text-lepkom-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span className="truncate max-w-xs">{row.file || 'Dokumen.pdf'}</span>
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Aksi',
      render: (row: Soal) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDownload(row._id, row.file || row.judulSoal)}
            className="p-1 text-lepkom-green hover:text-lepkom-green/80 hover:bg-green-50 rounded transition-colors"
            title="Unduh Soal"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
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
          <h1 className="text-2xl font-bold text-gray-800">Master Data Soal Ujian</h1>
          <p className="text-sm text-gray-500 mt-0.5">Kelola berkas bank soal ujian praktek calas.</p>
        </div>
        <Button variant="primary" onClick={handleOpenUpload} className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload Soal
        </Button>
      </div>

      <Card>
        <div className="flex justify-end mb-6">
          <div className="w-full sm:w-56">
            <Select
              options={[
                { value: '', label: 'Semua Tingkat' },
                { value: '1', label: 'Tingkat 1' },
                { value: '2', label: 'Tingkat 2' },
                { value: '3', label: 'Tingkat 3' },
              ]}
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
          <DataTable columns={columns} data={questions} emptyMessage="Belum ada berkas soal ujian" />
        )}
      </Card>

      {/* Modal Upload */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload Berkas Soal Ujian"
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)} disabled={uploading}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleUpload} loading={uploading}>
              Upload Soal
            </Button>
          </>
        }
      >
        <form onSubmit={handleUpload} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-lg">
              {error}
            </div>
          )}

          <Input
            label="Judul Soal Ujian"
            value={judulSoal}
            onChange={(e) => setJudulSoal(e.target.value)}
            placeholder="Contoh: Soal Ujian Praktek Tingkat 1 - Paket A"
            required
          />

          <Select
            label="Tingkat Ujian"
            options={[
              { value: '1', label: 'Tingkat 1' },
              { value: '2', label: 'Tingkat 2' },
              { value: '3', label: 'Tingkat 3' },
            ]}
            value={tingkat}
            onChange={(e) => setTingkat(e.target.value)}
            required
          />

          <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-lepkom-green transition-colors bg-page/50">
            <p className="text-sm font-semibold text-gray-700">Pilih Berkas Dokumen Soal</p>
            <p className="text-xs text-gray-500 mt-1">Format: .pdf, .docx (Maks 10MB)</p>

            <input
              type="file"
              accept=".pdf,.docx,.doc"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              id="soal-file-input"
            />

            <label
              htmlFor="soal-file-input"
              className="inline-block mt-3 px-4 py-2 text-xs font-medium text-lepkom-green bg-green-50 border border-lepkom-green/30 rounded-lg hover:bg-green-100 cursor-pointer transition-colors"
            >
              {file ? file.name : 'Pilih File Dokumen'}
            </label>
          </div>
        </form>
      </Modal>
    </div>
  )
}