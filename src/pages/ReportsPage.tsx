import { Search } from 'lucide-react'
import { Badge } from '../components/Badge'
import { getOfficePerformance, getReportSummary } from '../services/reportService'
import { formatCurrency } from '../utils/currency'

export const ReportsPage = () => {
  const summary = getReportSummary()
  const officePerformance = getOfficePerformance()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Reports</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Performance and analytics</h2>
        </div>
        <button type="button" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">Export CSV</button>
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
            <input type="text" placeholder="Search office or status" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-sky-400" />
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
        <h3 className="text-lg font-semibold text-slate-900">Report summary</h3>
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
              {['Customer report', 'Collection report', 'Auction report', 'Payout report'].map((name, index) => (
                <tr key={name} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 pr-4 font-medium text-slate-800">{name}</td>
                  <td className="py-3 pr-4 text-slate-600">Office + Month</td>
                  <td className="py-3 pr-4"><Badge label={index % 2 === 0 ? 'Ready' : 'Draft'} tone={index % 2 === 0 ? 'success' : 'neutral'} /></td>
                  <td className="py-3 pr-4 text-slate-600">2024-05-21</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
