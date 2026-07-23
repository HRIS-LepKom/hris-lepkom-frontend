import { SidebarProvider, useSidebar } from '@/context/SidebarContext'
import { Outlet } from 'react-router-dom'
import AppSidebar from './Sidebar'
import Backdrop from './Backdrop'
import Navbar from './Navbar'

function LayoutContent() {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar()

  return (
    <div className="min-h-screen bg-page lg:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded || isHovered ? 'lg:ml-[260px]' : 'lg:ml-[72px]'} ${isMobileOpen ? 'ml-0' : ''}`}>
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
