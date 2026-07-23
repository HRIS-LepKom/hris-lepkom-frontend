import { useState, useEffect } from 'react'
import { Modal, Button, Select } from '@/components/ui'
import { TAHAP_LABELS } from '@/utils/constants'
import type { Calas, TahapRekrutmen, HasilRekrutmen, AlasanTidakLolos } from '@/types'
import * as candidateService from '@/services/candidate.service'

interface TimelineUpdateModalProps {
  isOpen: boolean
  onClose: () => void
  calas: Calas | null
  onSuccess: () => void
}

export function TimelineUpdateModal({
  isOpen,
  onClose,
  calas,
  onSuccess,
}: TimelineUpdateModalProps) {
  const [tahap, setTahap] = useState<TahapRekrutmen>('registrasi')
  const [hasil, setHasil] = useState<HasilRekrutmen>('proses')
  const [alasan, setAlasan] = useState<AlasanTidakLolos | ''>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (calas && calas.statusRekrutmen) {
      setTahap(calas.statusRekrutmen.tahapSaatIni || 'registrasi')
      setHasil(calas.statusRekrutmen.hasil || 'proses')
      setAlasan(calas.statusRekrutmen.alasanTidakLolos || '')
      setError(null)
    }
  }, [calas, isOpen])

  const tahapOptions = (Object.keys(TAHAP_LABELS) as TahapRekrutmen[]).map((key) => ({
    value: key,
    label: TAHAP_LABELS[key],
  }))

  const hasilOptions = [
    { value: 'proses', label: 'Proses (Sedang Berjalan)' },
    { value: 'lolos', label: 'Lolos Tahap Ini' },
    { value: 'tidak_lolos', label: 'Tidak Lolos' },
  ]

  const alasanOptions = [
    { value: 'tidak_lolos_screening', label: 'Tidak Lolos Screening berkas' },
    { value: 'tidak_hadir_ujian', label: 'Tidak Hadir Ujian' },
    { value: 'tidak_lolos_penilaian', label: 'Tidak Lolos Penilaian Ujian' },
    { value: 'ditolak_rapat_akhir', label: 'Ditolak Rapat Akhir' },
    { value: 'lainnya', label: 'Lainnya' },
  ]

  const handleSubmit = async () => {
    if (!calas) return
    setLoading(true)
    setError(null)

    try {
      const res = await candidateService.updateTimeline(calas._id, tahap, hasil)
      if (res.success) {
        onSuccess()
        onClose()
      } else {
        setError(res.error || 'Gagal merubah timeline calas.')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Gagal merubah timeline.')
    } finally {
      setLoading(false)
    }
  }

  if (!calas) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Status Timeline Rekrutmen"
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading}>
            Simpan Perubahan
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

        <div className="p-3 bg-page rounded-lg border border-border space-y-1">
          <p className="text-xs text-gray-500 font-medium">Calas Target:</p>
          <p className="text-sm font-bold text-gray-800">{calas.namaCalas}</p>
          <p className="text-xs text-gray-500">NPM: {calas.npm} | Kelas: {calas.kelas}</p>
        </div>

        <Select
          label="Pilih Tahap Rekrutmen"
          options={tahapOptions}
          value={tahap}
          onChange={(e) => setTahap(e.target.value as TahapRekrutmen)}
          required
        />

        <Select
          label="Status Hasil Tahap"
          options={hasilOptions}
          value={hasil}
          onChange={(e) => setHasil(e.target.value as HasilRekrutmen)}
          required
        />

        {hasil === 'tidak_lolos' && (
          <Select
            label="Alasan Tidak Lolos"
            options={alasanOptions}
            value={alasan}
            onChange={(e) => setAlasan(e.target.value as AlasanTidakLolos)}
            placeholder="Pilih Alasan"
          />
        )}

        <div className="bg-blue-50 border border-blue-200 text-blue-700 text-xs p-3 rounded-lg">
          ℹ️ Perubahan status timeline ini akan otomatis diperbarui di portal calas.
        </div>
      </div>
    </Modal>
  )
}
