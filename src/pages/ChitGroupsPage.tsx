import { Search, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { mockGroups } from '../mock/data'
import { formatCurrency } from '../utils/currency'
import { formatDate } from '../utils/date'

export const ChitGroupsPage = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 6

  const filteredGroups = useMemo(() => {
    const value = query.trim().toLowerCase()
    if (!value) return mockGroups

    return mockGroups.filter(
      (group) =>
        group.id.toLowerCase().includes(value) ||
        group.schemeId.toLowerCase().includes(value) ||
        group.officeId.toLowerCase().includes(value) ||
        group.status.toLowerCase().includes(value),
    )
  }, [query])

  const totalPages = Math.max(1, Math.ceil(filteredGroups.length / pageSize))
  const visibleGroups = filteredGroups.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Chit groups</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Group management</h2>
        </div>
        <Link to="/chit-groups/new" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
          <Plus className="h-4 w-4" />
          Create group
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <label className="relative block max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
            placeholder="Search group, scheme or office"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-sky-400 focus:bg-white"
          />
        </label>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Group ID</th>
                <th className="px-5 py-3 font-medium">Scheme</th>
                <th className="px-5 py-3 font-medium">Office</th>
                <th className="px-5 py-3 font-medium">Start date</th>
                <th className="px-5 py-3 font-medium">Members</th>
                <th className="px-5 py-3 font-medium">Value</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {visibleGroups.map((group) => (
                <tr key={group.id} className="border-t border-slate-200">
                  <td className="px-5 py-4 font-medium text-slate-900">{group.id}</td>
                  <td className="px-5 py-4 text-slate-700">{group.schemeId}</td>
                  <td className="px-5 py-4 text-slate-700">{group.officeId}</td>
                  <td className="px-5 py-4 text-slate-700">{formatDate(group.startDate)}</td>
                  <td className="px-5 py-4 text-slate-700">{group.membersCount}</td>
                  <td className="px-5 py-4 text-slate-700">{formatCurrency(group.totalValue)}</td>
                  <td className="px-5 py-4"><Badge label={group.status} tone={group.status === 'Active' ? 'success' : 'warning'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <span className="text-sm text-slate-500">Showing {visibleGroups.length} of {filteredGroups.length} groups</span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1} className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-50">Previous</button>
          <span className="text-sm font-medium text-slate-700">Page {page} / {totalPages}</span>
          <button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={page === totalPages} className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  )
}
