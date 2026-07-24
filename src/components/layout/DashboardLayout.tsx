import { SidebarProvider, useSidebar } from '@/context/SidebarContext'
import { Outlet } from 'react-router-dom'
import AppSidebar, { SIDEBAR_EXPANDED_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from './Sidebar'
import Backdrop from './Backdrop'
import Navbar from './Navbar'

function LayoutContent() {
  const { isExpanded, isHovered } = useSidebar()
  const sidebarWidth = isExpanded || isHovered ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH

  return (
    <div className="min-h-screen bg-page lg:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className="flex-1 transition-all duration-300 ease-in-out"
        style={{ marginLeft: window.innerWidth >= 1024 ? sidebarWidth : 0 }}
      >
        <Navbar />
        <main className="p-4 md:p-6 max-w-screen-2xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  )
}
