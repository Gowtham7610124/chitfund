import {
  BadgeDollarSign,
  BookOpen,
  BriefcaseBusiness,
  ClipboardCheck,
  CreditCard,
  FileText,
  Gauge,
  LayoutGrid,
  LogOut,
  Megaphone,
  Receipt,
  ShieldCheck,
  ShoppingBag,
  Users,
  Wallet,
} from 'lucide-react'
import type { ComponentType } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

interface NavItem {
  label: string
  icon: ComponentType<{ className?: string }>
  path: string
}

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className ?? 'h-4 w-4'}>
    <path d="M12 3v2.2M12 18.8V21M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M3 12h2.2M18.8 12H21M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6M12 7.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Z" />
  </svg>
)

const navGroups: Array<{ title: string; items: NavItem[] }> = [
  { title: 'Overview', items: [{ label: 'Dashboard', icon: LayoutGrid, path: '/dashboard' }] },
  { title: 'Management', items: [
    { label: 'Customers', icon: Users, path: '/customers' },
    { label: 'Chit Schemes', icon: BookOpen, path: '/chit-schemes' },
    { label: 'Chit Groups', icon: ShoppingBag, path: '/chit-groups' },
    { label: 'Installments', icon: ClipboardCheck, path: '/installments' },
    { label: 'Payments', icon: CreditCard, path: '/payments' },
    { label: 'Chit Booking', icon: BadgeDollarSign, path: '/chit-booking' },
    { label: 'Payouts', icon: Wallet, path: '/payouts' },
    { label: 'Receipts', icon: Receipt, path: '/receipts' },
  ]},
  { title: 'Operations', items: [
    { label: 'KYC / Documents', icon: FileText, path: '/kyc' },
    { label: 'Agents', icon: ShieldCheck, path: '/agents' },
    { label: 'Staff & Users', icon: BriefcaseBusiness, path: '/staff' },
    { label: 'Reports', icon: Gauge, path: '/reports' },
    { label: 'Accounts', icon: Wallet, path: '/accounts' },
    { label: 'Notifications', icon: Megaphone, path: '/notifications' },
    { label: 'Audit Logs', icon: ClipboardCheck, path: '/audit-logs' },
    { label: 'Settings', icon: SettingsIcon, path: '/settings' },
  ]},
]

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <aside className={`h-screen shrink-0 overflow-y-auto border-r border-slate-200 bg-slate-950 text-slate-200 transition-all duration-200 ${collapsed ? 'w-20' : 'w-72'}`}>
      <div className="flex h-20 items-center justify-between border-b border-slate-800 px-4">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 font-bold text-white">C</div>
          {!collapsed && <div><p className="text-lg font-semibold text-white">CHIT</p><p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Admin</p></div>}
        </div>
        <button type="button" onClick={onToggle} className="rounded-lg p-2 text-slate-300 hover:bg-slate-800" aria-label="Collapse sidebar">
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="space-y-6 px-3 py-5">
        {navGroups.map((group) => (
          <div key={group.title} className="space-y-2">
            {!collapsed && <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">{group.title}</p>}
            {group.items.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                      isActive ? 'bg-sky-500/20 text-white shadow-inner ring-1 ring-sky-500/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    } ${collapsed ? 'justify-center' : ''}`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <div className={`mb-3 flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-sky-200">{user?.avatar ?? 'A'}</div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-slate-400">{user?.role.replace('_', ' ')}</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <button
            type="button"
            onClick={() => {
              logout()
              navigate('/login')
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 hover:border-slate-500"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        )}
      </div>
    </aside>
  )
}
