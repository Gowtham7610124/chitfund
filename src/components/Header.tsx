import { Bell, Search, Settings, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

interface HeaderProps {
  collapsed: boolean
  onToggleSidebar: () => void
}

export const Header = ({ collapsed, onToggleSidebar }: HeaderProps) => {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Toggle sidebar"
          >
            <span className="text-lg">☰</span>
          </button>
          <div className={`transition-all duration-200 ${collapsed ? 'hidden md:block' : 'block'}`}>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Chit Fund</p>
            <h1 className="text-lg font-semibold text-slate-900">Operations Dashboard</h1>
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-center md:flex">
          <label className="relative block w-full max-w-xl">
            <span className="sr-only">Global search</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search customers, receipts, payments, agents"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white"
            />
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-600 hover:bg-slate-100" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </button>
          <button type="button" className="relative rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-600 hover:bg-slate-100" aria-label="Notifications">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
          </button>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 font-semibold text-sky-700">
              {user?.avatar ?? 'U'}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-slate-800">{user?.name ?? 'Guest User'}</p>
              <p className="text-xs text-slate-500">{user?.role.replace('_', ' ') ?? 'User'}</p>
            </div>
            <ShieldCheck className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  )
}
