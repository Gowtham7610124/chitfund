import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  description: string
  icon: ReactNode
}

export const StatCard = ({ label, value, change, trend, description, icon }: StatCardProps) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <h3 className="mt-3 text-2xl font-semibold text-slate-900">{value}</h3>
      </div>
      <div className="rounded-xl bg-slate-100 p-2 text-slate-700">{icon}</div>
    </div>
    <div className="mt-4 flex items-center justify-between">
      <span
        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
          trend === 'up'
            ? 'bg-emerald-100 text-emerald-700'
            : trend === 'down'
              ? 'bg-rose-100 text-rose-700'
              : 'bg-slate-200 text-slate-700'
        }`}
      >
        {change}
      </span>
      <p className="text-xs text-slate-500">{description}</p>
    </div>
  </div>
)
