import { useState, useEffect } from 'react'
import { Modal, Button, Select, Badge } from '@/components/ui'
import { ROLE_LABELS } from '@/utils/constants'
import { ASISTEN_ROLES, type User, type Role } from '@/types'
import * as assistantService from '@/services/assistant.service'

interface RoleAssignModalProps {
  isOpen: boolean
  onClose: () => void
  asisten: User | null
  onSuccess: () => void
}

export function RoleAssignModal({
  isOpen,
  onClose,
  asisten,
  onSuccess,
}: RoleAssignModalProps) {
  const [selectedRole, setSelectedRole] = useState<Role>('asisten')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (asisten) {
      setSelectedRole(asisten.role || 'asisten')
      setError(null)
    }
  }, [asisten, isOpen])

  const roleOptions = ASISTEN_ROLES.map((r) => ({
    value: r,
    label: ROLE_LABELS[r] || r,
  }))

  const handleSubmit = async () => {
    if (!asisten) return
    setLoading(true)
    setError(null)

    try {
      const res = await assistantService.assignRole(asisten._id, selectedRole)
      if (res.success) {
        onSuccess()
        onClose()
      } else {
        setError(res.error || 'Gagal mengubah role asisten.')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Gagal mengubah role.')
    } finally {
      setLoading(false)
    }
  }

  if (!asisten) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Role Asisten"
      size="sm"
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
          <p className="text-xs text-gray-500 font-medium">Asisten Target:</p>
          <p className="text-sm font-bold text-gray-800">{asisten.nama}</p>
          <p className="text-xs text-gray-500">NPM: {asisten.npm}</p>
          <div className="pt-1 flex items-center gap-2">
            <span className="text-xs text-gray-500">Role Saat Ini:</span>
            <Badge variant="role">{ROLE_LABELS[asisten.role] || asisten.role}</Badge>
          </div>
        </div>

        <Select
          label="Pilih Role Baru"
          options={roleOptions}
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value as Role)}
          required
        />

        <div className="bg-blue-50 border border-blue-200 text-blue-700 text-xs p-3 rounded-lg flex items-start gap-2">
          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Catatan: Penugasan role menyesuaikan hak akses pada modul rekrutmen.</span>
        </div>
      </div>
    </Modal>
  )
}
