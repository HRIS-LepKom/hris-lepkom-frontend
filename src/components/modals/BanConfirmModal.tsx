import { useState } from 'react'
import { Modal, Button } from '@/components/ui'
import type { Calas } from '@/types'
import * as candidateService from '@/services/candidate.service'

interface BanConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  calas: Calas | null
  onSuccess: () => void
}

export function BanConfirmModal({
  isOpen,
  onClose,
  calas,
  onSuccess,
}: BanConfirmModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!calas) return null

  const isBanned = calas.isBanned

  const handleConfirm = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await candidateService.banCalas(calas._id)
      if (res.success) {
        onSuccess()
        onClose()
      } else {
        setError(res.error || 'Gagal memproses status ban calas.')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Gagal memproses tindakan.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isBanned ? 'Unban Calas' : 'Ban Calas'}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Batal
          </Button>
          <Button
            variant={isBanned ? 'primary' : 'danger'}
            onClick={handleConfirm}
            loading={loading}
          >
            {isBanned ? 'Aktifkan Kembali (Unban)' : 'Ya, Ban Calas'}
          </Button>
        </>
      }
    >
      <div className="space-y-4 text-center py-2">
        <div
          className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
            isBanned ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-lg text-left">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <p className="text-sm text-gray-600">
            Apakah Anda yakin ingin {isBanned ? 'membuka blokir (unban)' : 'memblokir (ban)'} akun calon asisten ini?
          </p>
          <p className="font-bold text-gray-900">{calas.namaCalas}</p>
          <p className="text-xs text-gray-500">NPM: {calas.npm}</p>
        </div>

        {!isBanned && (
          <p className="text-xs text-red-500 bg-red-50 p-3 rounded-lg border border-red-100 text-left">
            ⚠️ Calas yang di-ban tidak akan bisa masuk ke portal rekrutmen atau melanjutkan proses ujian.
          </p>
        )}
      </div>
    </Modal>
  )
}
