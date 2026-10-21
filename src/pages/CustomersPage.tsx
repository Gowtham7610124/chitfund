import { ChevronLeft, ChevronRight, Filter, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { useAuth } from '../context/AuthContext'
import { deleteCustomer, getCustomers } from '../services/customerService'
import type { Customer } from '../types'
import { formatCurrency } from '../utils/currency'
import { formatDate } from '../utils/date'

const PAGE_SIZE = 8

export const CustomersPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [customers, setCustomers] = useState<Customer[]>(() => getCustomers())
  const [searchTerm, setSearchTerm] = useState('')
  const [officeFilter, setOfficeFilter] = useState('All offices')
  const [statusFilter, setStatusFilter] = useState('All statuses')
  const [kycFilter, setKycFilter] = useState('All KYC')
  const [currentPage, setCurrentPage] = useState(1)

  const isSuperAdmin = user?.role === 'SUPER_ADMIN'

  const officeOptions = useMemo(
    () => Array.from(new Set(customers.map((customer) => customer.assignedOffice))).sort(),
    [customers],
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, officeFilter, statusFilter, kycFilter])

  const filteredCustomers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return customers.filter((customer) => {
      const matchesSearch =
        query.length === 0 ||
        [
          customer.name,
          customer.memberNumber,
          customer.mobile,
          customer.email,
          customer.address,
          customer.assignedOffice,
          customer.assignedAgent,
          customer.status,
          customer.kycStatus,
          customer.id,
        ]
          .join(' ')
          .toLowerCase()
          .includes(query)

      const matchesOffice = officeFilter === 'All offices' || customer.assignedOffice === officeFilter
      const matchesStatus = statusFilter === 'All statuses' || customer.status === statusFilter
      const matchesKyc = kycFilter === 'All KYC' || customer.kycStatus === kycFilter

      return matchesSearch && matchesOffice && matchesStatus && matchesKyc
    })
  }, [customers, searchTerm, officeFilter, statusFilter, kycFilter])

  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / PAGE_SIZE))
  const pageCustomers = filteredCustomers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const handleDelete = (id: string) => {
    const target = customers.find((customer) => customer.id === id)
    if (!target) return

    const confirmed = window.confirm(`Delete ${target.name}? This action cannot be undone.`)
    if (!confirmed) return

    deleteCustomer(id)
    setCustomers((current) => current.filter((customer) => customer.id !== id))
  }

  const clearFilters = () => {
    setSearchTerm('')
    setOfficeFilter('All offices')
    setStatusFilter('All statuses')
    setKycFilter('All KYC')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Customers</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Customer management</h2>
        </div>
        {isSuperAdmin && (
          <button
            type="button"
            onClick={() => navigate('/customers/new')}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            <Plus className="h-4 w-4" />
            Add customer
          </button>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              type="text"
              placeholder="Search all columns"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-sky-400 focus:bg-white"
            />
          </label>

          <select
            value={officeFilter}
            onChange={(event) => setOfficeFilter(event.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-sky-400"
          >
            <option>All offices</option>
            {officeOptions.map((office) => (
              <option key={office} value={office}>
                {office}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-sky-400"
          >
            <option>All statuses</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Blacklisted</option>
          </select>

          <select
            value={kycFilter}
            onChange={(event) => setKycFilter(event.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-sky-400"
          >
            <option>All KYC</option>
            <option>Verified</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>

          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600"
          >
            <Filter className="h-4 w-4" />
            Clear
          </button>
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
                {isSuperAdmin && <th className="px-5 py-3 font-medium text-right">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {pageCustomers.length === 0 ? (
                <tr>
                  <td colSpan={isSuperAdmin ? 9 : 8} className="px-5 py-10 text-center text-slate-500">
                    No customers match the current search and filters.
                  </td>
                </tr>
              ) : (
                pageCustomers.map((customer) => (
                  <tr key={customer.id} className="border-t border-slate-200 align-top">
                    <td className="px-5 py-4">
                      <Link to={`/customers/${customer.id}`} className="block">
                        <p className="font-medium text-slate-900 hover:text-sky-700">{customer.name}</p>
                        <p className="text-xs text-slate-500">{customer.id}</p>
                      </Link>
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
                    {isSuperAdmin && (
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => navigate(`/customers/${customer.id}/edit`)}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(customer.id)}
                            className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3 text-sm text-slate-600">
          <p>
            Showing {filteredCustomers.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}-{Math.min(currentPage * PAGE_SIZE, filteredCustomers.length)} of {filteredCustomers.length}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </button>
            <span className="rounded-xl bg-slate-100 px-2.5 py-1.5 font-medium text-slate-700">
              {currentPage}/{totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
