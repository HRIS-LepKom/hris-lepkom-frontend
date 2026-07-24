import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ROLE_LABELS } from '@/utils/constants'
import { useSidebar } from '@/context/SidebarContext'

const getPageTitle = (pathname: string) => {
  if (pathname.includes('/admin/recruitment-toggle')) return 'Toggle Rekrutmen'
  if (pathname.includes('/admin/calas-management')) return 'Manajemen Calas'
  if (pathname.includes('/admin/calas/')) return 'Detail Calas'
  if (pathname.includes('/admin')) return 'Dashboard Admin'
  if (pathname.includes('/master-data/assistants')) return 'Master Data Asisten'
  if (pathname.includes('/master-data/materials')) return 'Master Data Materi'
  if (pathname.includes('/master-data/questions')) return 'Master Data Soal'
  if (pathname.includes('/master-data/question-cards')) return 'Question Cards'
  if (pathname.includes('/calas/biodata')) return 'Biodata Calas'
  if (pathname.includes('/calas/documents')) return 'Unggah Dokumen'
  if (pathname.includes('/calas/timeline')) return 'Timeline Rekrutmen'
  if (pathname.includes('/calas/exam')) return 'Ujian'
  if (pathname.includes('/calas')) return 'Dashboard Calas'
  if (pathname.includes('/penilai/my-assignments')) return 'Tugas Penilaian'
  if (pathname.includes('/penilai/score')) return 'Input Penilaian'
  if (pathname.includes('/penilai/history')) return 'Riwayat Penilaian'
  if (pathname.includes('/penilai')) return 'Dashboard Penilai'
  if (pathname.includes('/korlap/rooms')) return 'Penugasan Ruangan'
  if (pathname.includes('/korlap/kanban')) return 'Kanban Board'
  if (pathname.includes('/korlap')) return 'Dashboard Korlap'
  if (pathname.includes('/pj-ruangan')) return 'Dashboard PJ Ruangan'
  if (pathname.includes('/pj-soal')) return 'Dashboard PJ Soal'
  if (pathname.includes('/scheduling/session-list')) return 'Sesi Ujian'
  if (pathname.includes('/scheduling/session-create')) return 'Buat Sesi'
  if (pathname.includes('/scheduling/room-placement')) return 'Placement Ruangan'
  return 'HRIS LEPKOM'
}

export default function Navbar() {
  const { user, logout } = useAuth()
  const { toggleSidebar, toggleMobileSidebar, isMobileOpen } = useSidebar()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar()
    } else {
      toggleMobileSidebar()
    }
  }

  const initial = user?.nama ? user.nama.charAt(0).toUpperCase() : 'U'

  return (
    <header className="sticky top-0 z-30 h-14 bg-surface border-b border-border flex items-center justify-between px-4 sm:px-6 shadow-xs">
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle Button */}
        <button
          type="button"
          onClick={handleToggle}
          className="text-gray-500 hover:text-gray-900 p-1.5 rounded-lg hover:bg-gray-100 focus:outline-none lg:border lg:border-border lg:h-10 lg:w-10 lg:flex lg:items-center lg:justify-center transition-colors"
          aria-label="Toggle Sidebar"
        >
          {isMobileOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile Logo */}
        <img
          src="/assets/images/logo.svg"
          alt="LEPKOM Logo"
          className="h-7 w-auto object-contain lg:hidden"
        />

        {/* Page Title */}
        <h1 className="hidden sm:block text-base font-semibold text-gray-800">
          {getPageTitle(location.pathname)}
        </h1>
      </div>

      {/* User Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-2 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-lepkom-blue text-white flex items-center justify-center font-bold text-sm shadow-xs">
            {initial}
          </div>
          <span className="hidden sm:inline-block text-sm font-medium text-gray-700 max-w-[120px] truncate">
            {user?.nama || 'Pengguna'}
          </span>
          <svg className="w-4 h-4 text-gray-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-52 bg-surface rounded-xl shadow-lg border border-border py-1 z-50 animate-in fade-in duration-150">
            <div className="px-4 py-2.5 border-b border-border">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Keluar
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
