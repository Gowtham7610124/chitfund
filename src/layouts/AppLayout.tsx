import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'

export const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="relative flex h-screen overflow-hidden bg-slate-100 text-slate-800">
      <div
        className={`fixed inset-y-0 left-0 z-40 transition-transform duration-200 md:static md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          collapsed={collapsed}
          mobileOpen={mobileMenuOpen}
          onToggle={() => setCollapsed((value) => !value)}
          onClose={() => setMobileMenuOpen(false)}
        />
      </div>

      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/45 md:hidden"
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          collapsed={collapsed}
          onToggleSidebar={() => {
            if (window.innerWidth < 768) {
              setMobileMenuOpen((value) => !value)
              return
            }

            setCollapsed((value) => !value)
          }}
        />
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
