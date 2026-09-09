import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { getOfficePerformance, getReportSummary } from '../services/reportService'
import { formatCurrency } from '../utils/currency'

const buildCsv = (rows: Array<Record<string, string | number>>) => {
  const headers = Object.keys(rows[0] ?? {})
  const csvRows = [headers.join(',')]

  rows.forEach((row) => {
    csvRows.push(headers.map((header) => `"${String(row[header]).replace(/"/g, '""')}"`).join(','))
  })

  return csvRows.join('\n')
}

export const ReportsPage = () => {
  const summary = getReportSummary()
  const officePerformance = getOfficePerformance()
  const [schemeFilter, setSchemeFilter] = useState('All schemes')
  const [groupFilter, setGroupFilter] = useState('All groups')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 5

  const reportRows = useMemo(() => {
    const rows = [
      { name: 'Customer report', filter: 'Scheme + Office', status: 'Ready', generated: '2024-05-21' },
      { name: 'Collection report', filter: 'Group + Month', status: 'Ready', generated: '2024-05-20' },
      { name: 'KYC report', filter: 'Office + Status', status: 'Draft', generated: '2024-05-19' },
      { name: 'Payout report', filter: 'Group + Payment status', status: 'Ready', generated: '2024-05-18' },
      { name: 'Pending balance report', filter: 'Scheme + Month', status: 'Draft', generated: '2024-05-17' },
      { name: 'Booked member report', filter: 'Month + Scheme', status: 'Ready', generated: '2024-05-16' },
    ]

    return rows.filter((row) => {
      const matchesScheme = schemeFilter === 'All schemes' || row.filter.toLowerCase().includes(schemeFilter.toLowerCase())
      const matchesGroup = groupFilter === 'All groups' || row.filter.toLowerCase().includes(groupFilter.toLowerCase())
      const matchesQuery = !query || row.name.toLowerCase().includes(query.toLowerCase()) || row.filter.toLowerCase().includes(query.toLowerCase())
      return matchesScheme && matchesGroup && matchesQuery
    })
  }, [schemeFilter, groupFilter, query])

  const totalPages = Math.max(1, Math.ceil(reportRows.length / pageSize))
  const visibleRows = reportRows.slice((page - 1) * pageSize, page * pageSize)

  const handleExport = () => {
    const csv = buildCsv(reportRows)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'chit-reports.csv'
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Reports</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Performance and analytics</h2>
        </div>
        <button type="button" onClick={handleExport} className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">Export CSV</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          { label: 'Customers', value: summary.customers },
          { label: 'Groups', value: summary.groups },
          { label: 'Schemes', value: summary.schemes },
          { label: 'Agents', value: summary.agents },
          { label: 'Collections', value: formatCurrency(summary.collections) },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Office performance</h3>
          <label className="relative block w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input type="text" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} placeholder="Search office or status" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-sky-400" />
          </label>
        </div>
        <div className="space-y-4">
          {officePerformance.map((entry) => (
            <div key={entry.office}>
              <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
                <span>{entry.office}</span>
                <span>{formatCurrency(entry.value)}</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-sky-500" style={{ width: `${(entry.value / 3000000) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Generated report pack</h3>
          <div className="flex flex-wrap gap-2">
            <select value={schemeFilter} onChange={(event) => { setSchemeFilter(event.target.value); setPage(1) }} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
              <option value="All schemes">All schemes</option>
              <option value="Scheme">Scheme</option>
              <option value="Month">Month</option>
            </select>
            <select value={groupFilter} onChange={(event) => { setGroupFilter(event.target.value); setPage(1) }} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
              <option value="All groups">All groups</option>
              <option value="Group">Group</option>
              <option value="Office">Office</option>
            </select>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 pr-4 font-medium">Report</th>
                <th className="pb-3 pr-4 font-medium">Filter</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 pr-4 font-medium">Generated</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row) => (
                <tr key={row.name} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 pr-4 font-medium text-slate-800">{row.name}</td>
                  <td className="py-3 pr-4 text-slate-600">{row.filter}</td>
                  <td className="py-3 pr-4"><Badge label={row.status} tone={row.status === 'Ready' ? 'success' : 'neutral'} /></td>
                  <td className="py-3 pr-4 text-slate-600">{row.generated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <span className="text-sm text-slate-500">Showing {visibleRows.length} of {reportRows.length} reports</span>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-50">Previous</button>
            <span className="text-sm font-medium text-slate-700">Page {page} / {totalPages}</span>
            <button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={page === totalPages} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
