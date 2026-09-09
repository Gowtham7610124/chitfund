import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { mockInstallments } from '../mock/data'
import { formatCurrency } from '../utils/currency'
import { formatDate } from '../utils/date'

export const InstallmentsPage = () => {
  const [groupFilter, setGroupFilter] = useState('All groups')
  const [statusFilter, setStatusFilter] = useState('All statuses')
  const [monthFilter, setMonthFilter] = useState('All months')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 8

  const filteredInstallments = useMemo(() => {
    const value = query.trim().toLowerCase()
    return mockInstallments.filter((installment) => {
      const matchesGroup = groupFilter === 'All groups' || installment.groupId === groupFilter
      const matchesStatus = statusFilter === 'All statuses' || installment.status === statusFilter
      const matchesMonth = monthFilter === 'All months' || installment.dueDate.startsWith(monthFilter)
      const matchesQuery =
        !value ||
        installment.customerId.toLowerCase().includes(value) ||
        installment.groupId.toLowerCase().includes(value) ||
        installment.status.toLowerCase().includes(value)

      return matchesGroup && matchesStatus && matchesMonth && matchesQuery
    })
  }, [groupFilter, statusFilter, monthFilter, query])

  const totalPages = Math.max(1, Math.ceil(filteredInstallments.length / pageSize))
  const visibleInstallments = filteredInstallments.slice((page - 1) * pageSize, page * pageSize)

  const groups = ['All groups', ...Array.from(new Set(mockInstallments.map((item) => item.groupId)))]
  const statuses = ['All statuses', ...Array.from(new Set(mockInstallments.map((item) => item.status)))]
  const months = ['All months', ...Array.from(new Set(mockInstallments.map((item) => item.dueDate.slice(0, 7))))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Collections</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Installments</h2>
        </div>
        <button type="button" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">Export Excel</button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block max-w-md flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setPage(1)
              }}
              placeholder="Search customer or group"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-sky-400 focus:bg-white"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <select value={groupFilter} onChange={(event) => { setGroupFilter(event.target.value); setPage(1) }} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
              {groups.map((group) => <option key={group} value={group}>{group}</option>)}
            </select>
            <select value={monthFilter} onChange={(event) => { setMonthFilter(event.target.value); setPage(1) }} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
              {months.map((month) => <option key={month} value={month}>{month === 'All months' ? 'All months' : month}</option>)}
            </select>
            <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1) }} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
              {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Chit group</th>
                <th className="px-5 py-3 font-medium">Installment</th>
                <th className="px-5 py-3 font-medium">Due date</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Paid</th>
                <th className="px-5 py-3 font-medium">Outstanding</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {visibleInstallments.map((installment) => (
                <tr key={installment.id} className="border-t border-slate-200">
                  <td className="px-5 py-4 font-medium text-slate-800">{installment.customerId}</td>
                  <td className="px-5 py-4 text-slate-700">{installment.groupId}</td>
                  <td className="px-5 py-4 text-slate-700">#{installment.installmentNumber}</td>
                  <td className="px-5 py-4 text-slate-700">{formatDate(installment.dueDate)}</td>
                  <td className="px-5 py-4 text-slate-700">{formatCurrency(installment.amount)}</td>
                  <td className="px-5 py-4 text-slate-700">{formatCurrency(installment.paidAmount)}</td>
                  <td className="px-5 py-4 text-slate-700">{formatCurrency(installment.outstanding)}</td>
                  <td className="px-5 py-4"><Badge label={installment.status} tone={installment.status === 'Paid' ? 'success' : installment.status === 'Overdue' ? 'danger' : 'warning'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <span className="text-sm text-slate-500">Showing {visibleInstallments.length} of {filteredInstallments.length} items</span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1} className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-50">Previous</button>
          <span className="text-sm font-medium text-slate-700">Page {page} / {totalPages}</span>
          <button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={page === totalPages} className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  )
}
