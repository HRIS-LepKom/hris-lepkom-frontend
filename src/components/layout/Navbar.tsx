import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ROLE_LABELS } from '@/utils/constants'

interface NavbarProps {
  onMenuClick: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Dynamic title based on pathname
  const getPageTitle = (pathname: string) => {
    if (pathname.includes('/admin/recruitment-toggle')) return 'Toggle Rekrutmen'
    if (pathname.includes('/admin/calas-management')) return 'Manajemen Calas'
    if (pathname.includes('/admin')) return 'Dashboard Admin'
    if (pathname.includes('/master-data/assistants')) return 'Master Data Asisten'
    if (pathname.includes('/master-data/materials')) return 'Master Data Materi'
    if (pathname.includes('/master-data/questions')) return 'Master Data Soal'
    if (pathname.includes('/master-data/question-cards')) return 'Question Cards'
    if (pathname.includes('/calas/biodata')) return 'Biodata Calas'
    if (pathname.includes('/calas/documents')) return 'Unggah Dokumen'
    if (pathname.includes('/calas/timeline')) return 'Timeline Rekrutmen'
    if (pathname.includes('/calas')) return 'Dashboard Calas'
    if (pathname.includes('/penilai/my-assignments')) return 'Tugas Penilaian'
    if (pathname.includes('/penilai/history')) return 'Riwayat Penilaian'
    if (pathname.includes('/penilai')) return 'Dashboard Penilai'
    if (pathname.includes('/korlap/rooms')) return 'Penugasan Ruangan'
    if (pathname.includes('/korlap/kanban')) return 'Kanban Board'
    if (pathname.includes('/korlap')) return 'Dashboard Korlap'
    if (pathname.includes('/pj-ruangan')) return 'Dashboard PJ Ruangan'
    if (pathname.includes('/pj-soal')) return 'Dashboard PJ Soal'
    return 'HRIS LepKOM'
  }

  const initial = user?.nama ? user.nama.charAt(0).toUpperCase() : 'U'

  return (
    <header className="h-14 bg-white border-b border-border flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden text-gray-600 hover:text-gray-900 p-1.5 rounded-lg hover:bg-gray-100 focus:outline-none"
          aria-label="Buka menu navigasi"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-base sm:text-lg font-semibold text-gray-800">
          {getPageTitle(location.pathname)}
        </h1>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-2 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-lepkom-blue text-white flex items-center justify-center font-bold text-sm shadow-xs">
            {initial}
          </div>
          <span className="hidden sm:inline-block text-sm font-medium text-gray-700">
            {user?.nama || 'Pengguna'}
          </span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-border py-1 z-50 animate-in fade-in duration-150">
            <div className="px-4 py-2 border-b border-border">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.nama}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              <p className="text-xs font-medium text-lepkom-green mt-0.5">
                {user?.role ? ROLE_LABELS[user.role] : ''}
              </p>
            </div>
            <button
              onClick={() => {
                setDropdownOpen(false)
                logout()
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Keluar
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
