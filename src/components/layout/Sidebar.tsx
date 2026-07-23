import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSidebar } from '@/context/SidebarContext'
import { useAuthStore } from '@/stores/auth.store'

type NavItem = {
  name: string
  icon: React.ReactNode
  path?: string
  subItems?: { name: string; path: string }[]
}

function getNavItems(role: string): { main: NavItem[]; others: NavItem[] } {
  const isSuper = role === 'super_admin'
  const isPjSoal = role === 'pj_soal_materi'
  const isKorlap = role === 'koordinator_lapangan'
  const isPjRuang = role === 'penanggung_jawab_ruangan'
  const isPenilai = role === 'asisten_penilai'
  const isCalas = role === 'asisten' || role === 'staff'

  const main: NavItem[] = [
    ...(isSuper || isPjSoal || isKorlap || isPjRuang || isPenilai || isCalas
      ? [
          {
            name: 'Dashboard',
            icon: <GridSvg />,
            path: isSuper
              ? '/admin'
              : isPjSoal
                ? '/pj-soal'
                : isKorlap
                  ? '/korlap'
                  : isPjRuang
                    ? '/pj-ruangan'
                    : isPenilai
                      ? '/penilai'
                      : '/calas',
          },
        ]
      : []),
    ...(isCalas
      ? [
          { name: 'Biodata', icon: <UserSvg />, path: '/calas/biodata' },
          { name: 'Dokumen', icon: <FolderSvg />, path: '/calas/documents' },
          { name: 'Timeline', icon: <ListSvg />, path: '/calas/timeline' },
        ]
      : []),
    ...(isSuper || isKorlap
      ? [
          {
            name: 'Penjadwalan',
            icon: <CalenderSvg />,
            subItems: [
              ...(isSuper || isKorlap
                ? [
                    { name: 'Sesi Ujian', path: isSuper ? '/admin' : '/korlap/rooms' },
                    { name: 'Kanban Board', path: '/korlap/kanban' },
                  ]
                : []),
            ],
          },
        ]
      : []),
  ]

  const others: NavItem[] = [
    ...(isSuper
      ? [
          {
            name: 'Master Data',
            icon: <BoxCubeSvg />,
            subItems: [
              { name: 'Asisten', path: '/master-data/assistants' },
              { name: 'Calon Asisten', path: '/admin' },
              { name: 'Materi', path: '/master-data/materials' },
              { name: 'Soal', path: '/master-data/questions' },
              { name: 'Question Card', path: '/master-data/question-cards' },
            ],
          },
        ]
      : []),
    ...(isPjSoal
      ? [
          {
            name: 'Master Data',
            icon: <BoxCubeSvg />,
            subItems: [
              { name: 'Materi', path: '/master-data/materials' },
              { name: 'Soal', path: '/master-data/questions' },
              { name: 'Question Card', path: '/master-data/question-cards' },
            ],
          },
        ]
      : []),
    ...(isPenilai
      ? [
          {
            name: 'Penilaian',
            icon: <PencilSvg />,
            subItems: [
              { name: 'Daftar Tugas', path: '/penilai' },
              { name: 'Riwayat', path: '/penilai/history' },
            ],
          },
        ]
      : []),
    ...(isSuper
      ? [{ name: 'Toggle Rekrutmen', icon: <PlugInSvg />, path: '/admin/toggle' }]
      : []),
  ]

  return { main, others }
}

export default function AppSidebar() {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar()
  const location = useLocation()
  const user = useAuthStore((s) => s.user)
  const role = user?.role || 'asisten'
  const { main: navItems, others: othersItems } = getNavItems(role)

  const [openSubmenu, setOpenSubmenu] = useState<{ type: 'main' | 'others'; index: number } | null>(null)
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({})
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname])

  useEffect(() => {
    let submenuMatched = false
    ;(['main', 'others'] as const).forEach((menuType) => {
      const items = menuType === 'main' ? navItems : othersItems
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({ type: menuType, index })
              submenuMatched = true
            }
          })
        }
      })
    })
    if (!submenuMatched) setOpenSubmenu(null)
  }, [location, isActive, navItems, othersItems])

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }))
      }
    }
  }, [openSubmenu])

  const handleSubmenuToggle = (index: number, menuType: 'main' | 'others') => {
    setOpenSubmenu((prev) =>
      prev && prev.type === menuType && prev.index === index ? null : { type: menuType, index },
    )
  }

  const renderMenuItems = (items: NavItem[], menuType: 'main' | 'others') => (
    <ul className="flex flex-col gap-1">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group w-full text-left ${openSubmenu?.type === menuType && openSubmenu?.index === index ? 'menu-item-active' : 'menu-item-inactive'} ${!isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start'}`}
            >
              <span className={`menu-item-icon-size ${openSubmenu?.type === menuType && openSubmenu?.index === index ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}`}>{nav.icon}</span>
              {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownSvg className={`ml-auto w-5 h-5 transition-transform duration-200 ${openSubmenu?.type === menuType && openSubmenu?.index === index ? 'rotate-180 text-brand-500' : ''}`} />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'} ${!isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start'}`}
              >
                <span className={`menu-item-icon-size ${isActive(nav.path) ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}`}>{nav.icon}</span>
                {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : '0px',
              }}
            >
              <ul className="mt-1 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${isActive(subItem.path) ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  )

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-4 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 ${isExpanded || isMobileOpen ? 'w-[260px]' : isHovered ? 'w-[260px]' : 'w-[72px]'} ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`py-6 flex ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`}>
        <Link to="/" className="flex items-center gap-2">
          {(isExpanded || isHovered || isMobileOpen) ? (
            <span className="text-lg font-bold text-lepkom-green">HRIS LepKOM</span>
          ) : (
            <span className="w-8 h-8 rounded-lg bg-lepkom-green flex items-center justify-center text-white font-bold text-sm">H</span>
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar flex-1">
        <nav className="mb-4">
          <div className="flex flex-col gap-3">
            <div>
              <h2 className={`mb-3 text-xs uppercase tracking-wider text-gray-400 ${!isExpanded && !isHovered ? 'lg:text-center' : ''}`}>
                {(isExpanded || isHovered || isMobileOpen) ? 'Menu' : <HorizontaLDotsSvg className="size-5 mx-auto" />}
              </h2>
              {renderMenuItems(navItems, 'main')}
            </div>
            {othersItems.length > 0 && (
              <div>
                <h2 className={`mb-3 text-xs uppercase tracking-wider text-gray-400 ${!isExpanded && !isHovered ? 'lg:text-center' : ''}`}>
                  {(isExpanded || isHovered || isMobileOpen) ? 'Lainnya' : <HorizontaLDotsSvg className="size-5 mx-auto" />}
                </h2>
                {renderMenuItems(othersItems, 'others')}
              </div>
            )}
          </div>
        </nav>
      </div>
    </aside>
  )
}

// ─── SVG Icons (inline) ──────────────────────────────────────────────────────

function GridSvg() { return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> }
function UserSvg() { return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></svg> }
function FolderSvg() { return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg> }
function ListSvg() { return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> }
function CalenderSvg() { return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> }
function BoxCubeSvg() { return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg> }
function PlugInSvg() { return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22v-5"/><path d="M9 8V3"/><path d="M15 8V3"/><path d="M18 12v2a6 6 0 0 1-12 0v-2"/></svg> }
function PencilSvg() { return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg> }
function ChevronDownSvg({ className }: { className?: string }) { return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="6 9 12 15 18 9"/></svg> }
function HorizontaLDotsSvg({ className }: { className?: string }) { return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className}><circle cx="12" cy="12" r="2"/><circle cx="4" cy="12" r="2"/><circle cx="20" cy="12" r="2"/></svg> }
