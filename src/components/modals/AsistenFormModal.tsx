import { useState, useEffect } from 'react'
import { Modal, Button, Input } from '@/components/ui'
import * as assistantService from '@/services/assistant.service'
import type { User } from '@/types'

interface AsistenFormModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'create' | 'edit'
  data?: User | null
  onSuccess: () => void
}

export function AsistenFormModal({
  isOpen,
  onClose,
  mode,
  data,
  onSuccess,
}: AsistenFormModalProps) {
  const [formData, setFormData] = useState({
    idAsisten: '',
    npm: '',
    nama: '',
    email: '',
    password: '',
    kelasSaatIni: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (mode === 'edit' && data) {
      setFormData({
        idAsisten: data.idAsisten || '',
        npm: data.npm || '',
        nama: data.nama || '',
        email: data.email || '',
        password: '',
        kelasSaatIni: data.kelasSaatIni || '',
      })
    } else {
      setFormData({
        idAsisten: '',
        npm: '',
        nama: '',
        email: '',
        password: '',
        kelasSaatIni: '',
      })
    }
    setError(null)
  }, [mode, data, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (mode === 'create') {
        const res = await assistantService.createAsisten({
          npm: formData.npm,
          nama: formData.nama,
          email: formData.email,
          password: formData.password,
        })
        if (res.success) {
          onSuccess()
          onClose()
        } else {
          setError(res.error || 'Gagal membuat data asisten.')
        }
      } else if (mode === 'edit' && data) {
        const res = await assistantService.updateAsisten(data._id, {
          idAsisten: formData.idAsisten,
          npm: formData.npm,
          nama: formData.nama,
          email: formData.email,
          kelasSaatIni: formData.kelasSaatIni,
        })
        if (res.success) {
          onSuccess()
          onClose()
        } else {
          setError(res.error || 'Gagal memperbarui data asisten.')
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Terjadi kesalahan sistem.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Tambah Asisten Baru' : 'Edit Data Asisten'}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading}>
            Simpan
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-lg">
            {error}
          </div>
        )}

        {mode === 'edit' && (
          <Input
            label="ID Asisten"
            name="idAsisten"
            value={formData.idAsisten}
            onChange={handleChange}
            placeholder="Contoh: AST-001"
          />
        )}

        <Input
          label="NPM"
          name="npm"
          value={formData.npm}
          onChange={handleChange}
          placeholder="Contoh: 10121001"
          required
        />

        <Input
          label="Nama Lengkap"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          placeholder="Masukkan nama lengkap"
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="nama@domain.com"
          required
        />

        {mode === 'create' && (
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        )}

        <Input
          label="Kelas Saat Ini"
          name="kelasSaatIni"
          value={formData.kelasSaatIni}
          onChange={handleChange}
          placeholder="Contoh: 4KA01"
        />
      </form>
    </Modal>
  )
}
