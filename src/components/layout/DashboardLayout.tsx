import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-page">
      <aside className="w-64 bg-surface border-r border-border">
        <p className="p-4 font-bold text-lepkom-green">HRIS LepKOM</p>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-surface border-b border-border flex items-center px-6">
          <span className="text-sm text-gray-500">Navbar placeholder</span>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
