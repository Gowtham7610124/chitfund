import { Search, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { mockSchemes } from '../mock/data'
import { formatCurrency } from '../utils/currency'

export const ChitSchemesPage = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 5

  const filteredSchemes = useMemo(() => {
    const value = query.trim().toLowerCase()
    if (!value) return mockSchemes

    return mockSchemes.filter(
      (scheme) =>
        scheme.name.toLowerCase().includes(value) ||
        scheme.id.toLowerCase().includes(value) ||
        scheme.status.toLowerCase().includes(value),
    )
  }, [query])

  const totalPages = Math.max(1, Math.ceil(filteredSchemes.length / pageSize))
  const visibleSchemes = filteredSchemes.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Chit management</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Chit schemes</h2>
        </div>
        <Link to="/chit-schemes/new" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
          <Plus className="h-4 w-4" />
          Create scheme
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="relative block max-w-md flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setPage(1)
              }}
              placeholder="Search scheme name or status"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-sky-400 focus:bg-white"
            />
          </label>
          <button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">Export</button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Scheme</th>
                <th className="px-5 py-3 font-medium">Value</th>
                <th className="px-5 py-3 font-medium">Duration</th>
                <th className="px-5 py-3 font-medium">Members</th>
                <th className="px-5 py-3 font-medium">Monthly</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {visibleSchemes.map((scheme) => (
                <tr key={scheme.id} className="border-t border-slate-200">
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-slate-900">{scheme.name}</p>
                      <p className="text-xs text-slate-500">{scheme.id}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-700">{formatCurrency(scheme.totalValue)}</td>
                  <td className="px-5 py-4 text-slate-700">{scheme.durationMonths} months</td>
                  <td className="px-5 py-4 text-slate-700">{scheme.members}</td>
                  <td className="px-5 py-4 text-slate-700">{formatCurrency(scheme.monthlyInstallment)}</td>
                  <td className="px-5 py-4"><Badge label={scheme.status} tone={scheme.status === 'Active' ? 'success' : scheme.status === 'Draft' ? 'neutral' : 'warning'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <span className="text-sm text-slate-500">Showing {visibleSchemes.length} of {filteredSchemes.length} schemes</span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1} className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-50">Previous</button>
          <span className="text-sm font-medium text-slate-700">Page {page} / {totalPages}</span>
          <button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={page === totalPages} className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  )
}
