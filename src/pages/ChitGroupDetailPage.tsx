import { ArrowLeft, Pencil } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { getChitGroupById } from '../services/chitGroupService'
import { formatCurrency } from '../utils/currency'
import { formatDate } from '../utils/date'

export const ChitGroupDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const group = id ? getChitGroupById(id) : undefined

  if (!group) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-500">
        Chit group not found.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Chit groups</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">{group.id}</h2>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/chit-groups" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
            <ArrowLeft className="h-4 w-4" />
            Back to groups
          </Link>
          <button
            type="button"
            onClick={() => navigate(`/chit-groups/${group.id}/edit`)}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Group overview</h3>
            <Badge label={group.status} tone={group.status === 'Active' ? 'success' : group.status === 'Completed' ? 'neutral' : 'warning'} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Scheme</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{group.schemeId}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Office</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{group.officeId}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Start month</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{formatDate(group.startDate)}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">End month</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{formatDate(group.endDate)}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Members</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{group.membersCount}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Monthly installment</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{formatCurrency(group.monthlyInstallment)}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Actual value</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{formatCurrency(group.totalValue)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Group summary</h3>
          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              Status: <span className="font-semibold text-slate-900">{group.status}</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              Total members: <span className="font-semibold text-slate-900">{group.membersCount}</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              Installment: <span className="font-semibold text-slate-900">{formatCurrency(group.monthlyInstallment)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
