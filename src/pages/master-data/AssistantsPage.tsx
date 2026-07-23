import { useState, useEffect, useCallback } from 'react'
import { Button, Input, Select, Badge, DataTable, Card, Skeleton } from '@/components/ui'
import { AsistenFormModal } from '@/components/modals/AsistenFormModal'
import { RoleAssignModal } from '@/components/modals/RoleAssignModal'
import { ImportAsistenModal } from '@/components/modals/ImportAsistenModal'
import { useDebounce } from '@/hooks/useDebounce'
import { ROLE_LABELS } from '@/utils/constants'
import { ASISTEN_ROLES, type User, type Role } from '@/types'
import * as assistantService from '@/services/assistant.service'

export default function AssistantsPage() {
  const [assistants, setAssistants] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 10

  const debouncedSearch = useDebounce(search, 300)

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [selectedAsisten, setSelectedAsisten] = useState<User | null>(null)

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  const fetchAssistants = useCallback(async () => {
    setLoading(true)
    try {
      const res = await assistantService.getAsistenList({
        page,
        limit,
        search: debouncedSearch,
      })
      if (res.success && res.data) {
        let list = res.data.data || []
        if (roleFilter) {
          list = list.filter((a) => a.role === roleFilter)
        }
        setAssistants(list)
        setTotal(res.data.total || list.length)
      } else {
        setAssistants([])
        setTotal(0)
      }
    } catch (err) {
      setAssistants([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [page, debouncedSearch, roleFilter])

  useEffect(() => {
    fetchAssistants()
  }, [fetchAssistants])

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus asisten ini?')) {
      try {
        await assistantService.deleteAsisten(id)
        fetchAssistants()
      } catch (err) {
        alert('Gagal menghapus data asisten.')
      }
    }
  }

  const totalPages = Math.ceil(total / limit) || 1

  const columns = [
    {
      key: 'idAsisten',
      label: 'ID Asisten',
      render: (row: User) => <span className="font-mono font-semibold">{row.idAsisten || '-'}</span>,
    },
    {
      key: 'nama',
      label: 'Nama',
      render: (row: User) => (
        <div>
          <p className="font-semibold text-gray-900">{row.nama}</p>
          <p className="text-xs text-gray-500">{row.email}</p>
        </div>
      ),
    },
    { key: 'npm', label: 'NPM' },
    {
      key: 'role',
      label: 'Role',
      render: (row: User) => (
        <Badge variant="role">{ROLE_LABELS[row.role] || row.role}</Badge>
      ),
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (row: User) =>
        row.isActive ? (
          <Badge variant="status-green">Aktif</Badge>
        ) : (
          <Badge variant="status-red">Nonaktif</Badge>
        ),
    },
    {
      key: 'actions',
      label: 'Aksi',
      render: (row: User) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedAsisten(row)
              setIsRoleModalOpen(true)
            }}
            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
            title="Assign Role"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </button>
          <button
            onClick={() => {
              setSelectedAsisten(row)
              setFormMode('edit')
              setIsFormOpen(true)
            }}
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

  const roleFilterOptions = [
    { value: '', label: 'Semua Role' },
    ...ASISTEN_ROLES.map((r: Role) => ({ value: r, label: ROLE_LABELS[r] || r })),
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Master Data Asisten</h1>
          <p className="text-sm text-gray-500 mt-0.5">Kelola staf asisten, penugasan role, dan akun.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Import Excel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setSelectedAsisten(null)
              setFormMode('create')
              setIsFormOpen(true)
            }}
            className="flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Asisten
          </Button>
        </div>
      </div>

      <Card>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Cari berdasarkan nama, NPM, atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-56">
            <Select
              options={roleFilterOptions}
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              placeholder="Filter Role"
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
            <DataTable columns={columns} data={assistants} emptyMessage="Tidak ada data asisten ditemukan" />

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
      <AsistenFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        mode={formMode}
        data={selectedAsisten}
        onSuccess={fetchAssistants}
      />

      <RoleAssignModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        asisten={selectedAsisten}
        onSuccess={fetchAssistants}
      />

      <ImportAsistenModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onSuccess={fetchAssistants}
      />
    </div>
  )
}