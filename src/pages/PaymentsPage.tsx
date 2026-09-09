import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { mockPayments } from '../mock/data'
import { formatCurrency } from '../utils/currency'
import { formatDate } from '../utils/date'

export const PaymentsPage = () => {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [page, setPage] = useState(1)
  const pageSize = 8

  const filteredPayments = useMemo(() => {
    const value = query.trim().toLowerCase()
    return mockPayments.filter((payment) => {
      const matchesStatus = statusFilter === 'All' || payment.status === statusFilter
      const matchesQuery =
        !value ||
        payment.customerId.toLowerCase().includes(value) ||
        payment.groupId.toLowerCase().includes(value) ||
        payment.collectionAgent.toLowerCase().includes(value)

      return matchesStatus && matchesQuery
    })
  }, [query, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredPayments.length / pageSize))
  const visiblePayments = filteredPayments.slice((page - 1) * pageSize, page * pageSize)
  const statuses = ['All', ...Array.from(new Set(mockPayments.map((payment) => payment.status)))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Collections</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Payments</h2>
        </div>
        <Link to="/payments/new" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">Record payment</Link>
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
              placeholder="Search customer, group or agent"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-sky-400 focus:bg-white"
            />
          </label>
          <div className="flex gap-2">
            <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1) }} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
              {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
            <button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">Export</button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Group</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Method</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Agent</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {visiblePayments.map((payment) => (
                <tr key={payment.id} className="border-t border-slate-200">
                  <td className="px-5 py-4 font-medium text-slate-800">{payment.customerId}</td>
                  <td className="px-5 py-4 text-slate-700">{payment.groupId}</td>
                  <td className="px-5 py-4 text-slate-700">{formatCurrency(payment.amount)}</td>
                  <td className="px-5 py-4 text-slate-700">{payment.paymentMethod}</td>
                  <td className="px-5 py-4 text-slate-700">{formatDate(payment.paymentDate)}</td>
                  <td className="px-5 py-4 text-slate-700">{payment.collectionAgent}</td>
                  <td className="px-5 py-4"><Badge label={payment.status} tone={payment.status === 'Success' ? 'success' : payment.status === 'Pending' ? 'warning' : 'danger'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <span className="text-sm text-slate-500">Showing {visiblePayments.length} of {filteredPayments.length} payments</span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1} className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-50">Previous</button>
          <span className="text-sm font-medium text-slate-700">Page {page} / {totalPages}</span>
          <button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={page === totalPages} className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  )
}
