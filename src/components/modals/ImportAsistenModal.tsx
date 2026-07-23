import { useState } from 'react'
import { Modal, Button } from '@/components/ui'
import * as assistantService from '@/services/assistant.service'

interface ImportAsistenModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function ImportAsistenModal({
  isOpen,
  onClose,
  onSuccess,
}: ImportAsistenModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successCount, setSuccessCount] = useState<number | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError(null)
      setSuccessCount(null)
    }
  }

  const handleImport = async () => {
    if (!file) {
      setError('Silakan pilih file Excel (.xlsx) atau CSV terlebih dahulu.')
      return
    }

    setLoading(true)
    setError(null)
    setSuccessCount(null)

    try {
      const res = await assistantService.importAsisten(file)
      if (res.success && res.data) {
        setSuccessCount(res.data.imported)
        setTimeout(() => {
          onSuccess()
          onClose()
        }, 1500)
      } else {
        setError(res.error || 'Gagal mengimpor data asisten.')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Gagal mengimpor data.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Import Data Asisten"
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleImport} loading={loading} disabled={!file}>
            Mulai Import
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-lg">
            {error}
          </div>
        )}

        {successCount !== null && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-xs p-3 rounded-lg font-medium">
            Berhasil mengimpor {successCount} data asisten!
          </div>
        )}

        <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-lepkom-green transition-colors bg-page/50">
          <svg
            className="w-10 h-10 text-gray-400 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-sm font-semibold text-gray-700">Pilih atau seret file ke sini</p>
          <p className="text-xs text-gray-500 mt-1">Format yang didukung: .xlsx, .csv (Maks 5MB)</p>

          <input
            type="file"
            accept=".xlsx,.csv"
            onChange={handleFileChange}
            className="hidden"
            id="asisten-file-input"
          />

          <label
            htmlFor="asisten-file-input"
            className="inline-block mt-4 px-4 py-2 text-xs font-medium text-lepkom-green bg-green-50 border border-lepkom-green/30 rounded-lg hover:bg-green-100 cursor-pointer transition-colors"
          >
            {file ? file.name : 'Pilih File'}
          </label>
        </div>

        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded-lg">
          <p className="font-semibold mb-1">📋 Format Kolom yang Wajib:</p>
          <p>ID Asisten, NPM, Nama, Email, Password</p>
        </div>
      </div>
    </Modal>
  )
}
