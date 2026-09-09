type BadgeTone = 'success' | 'warning' | 'neutral' | 'danger' | 'info'

interface BadgeProps {
  label: string
  tone?: BadgeTone
}

const tones: Record<BadgeTone, string> = {
  success: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  warning: 'bg-amber-100 text-amber-700 ring-amber-200',
  neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
  danger: 'bg-rose-100 text-rose-700 ring-rose-200',
  info: 'bg-sky-100 text-sky-700 ring-sky-200',
}

export const Badge = ({ label, tone = 'neutral' }: BadgeProps) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${tones[tone]}`}>
    {label}
  </span>
)
