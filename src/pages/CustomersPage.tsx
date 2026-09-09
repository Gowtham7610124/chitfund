import { Search, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { getCustomers } from '../services/customerService'
import { formatCurrency } from '../utils/currency'
import { formatDate } from '../utils/date'

export const CustomersPage = () => {
  const customers = getCustomers()
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 6

  const filteredCustomers = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) return customers

    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(search) ||
        customer.memberNumber.toLowerCase().includes(search) ||
        customer.mobile.toLowerCase().includes(search) ||
        customer.assignedOffice.toLowerCase().includes(search),
    )
  }, [customers, query])

  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / pageSize))
  const visibleCustomers = filteredCustomers.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Customers</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Customer management</h2>
        </div>
        <Link to="/customers/new" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
          <Plus className="h-4 w-4" />
          Add customer
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
              placeholder="Search customer name, member no or mobile"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-sky-400 focus:bg-white"
            />
          </label>
          <div className="flex gap-2">
            <button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">Office</button>
            <button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">Status</button>
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
                <th className="px-5 py-3 font-medium">Member No</th>
                <th className="px-5 py-3 font-medium">Mobile</th>
                <th className="px-5 py-3 font-medium">KYC</th>
                <th className="px-5 py-3 font-medium">Assigned Office</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Total Chit Value</th>
                <th className="px-5 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {visibleCustomers.map((customer) => (
                <tr key={customer.id} className="border-t border-slate-200">
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-slate-900">{customer.name}</p>
                      <p className="text-xs text-slate-500">{customer.id}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-700">{customer.memberNumber}</td>
                  <td className="px-5 py-4 text-slate-700">{customer.mobile}</td>
                  <td className="px-5 py-4">
                    <Badge
                      label={customer.kycStatus}
                      tone={customer.kycStatus === 'Verified' ? 'success' : customer.kycStatus === 'Pending' ? 'warning' : 'danger'}
                    />
                  </td>
                  <td className="px-5 py-4 text-slate-700">{customer.assignedOffice}</td>
                  <td className="px-5 py-4">
                    <Badge label={customer.status} tone={customer.status === 'Active' ? 'success' : 'neutral'} />
                  </td>
                  <td className="px-5 py-4 text-slate-700">{formatCurrency(customer.totalChitValue)}</td>
                  <td className="px-5 py-4 text-slate-700">{formatDate(customer.createdDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <span className="text-sm text-slate-500">Showing {visibleCustomers.length} of {filteredCustomers.length} customers</span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1} className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-50">Previous</button>
          <span className="text-sm font-medium text-slate-700">Page {page} / {totalPages}</span>
          <button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={page === totalPages} className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  )
}
