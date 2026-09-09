import { useParams } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { getCustomerById } from '../services/customerService'
import { formatCurrency } from '../utils/currency'
import { formatDate } from '../utils/date'

const tabs = ['Overview', 'Chits', 'Installments', 'Payments', 'Receipts', 'Documents', 'Nominee', 'Activity']

export const CustomerDetailPage = () => {
  const { id } = useParams()
  const customer = getCustomerById(id ?? '')

  if (!customer) {
    return <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-500">Customer not found.</div>
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Customer profile</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">{customer.name}</h2>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-sm text-slate-500">{customer.id}</span>
              <Badge label={customer.status} tone={customer.status === 'Active' ? 'success' : 'neutral'} />
              <Badge label={customer.kycStatus} tone={customer.kycStatus === 'Verified' ? 'success' : customer.kycStatus === 'Pending' ? 'warning' : 'danger'} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <div className="rounded-xl bg-slate-50 p-3"><p className="text-slate-500">Total chit value</p><p className="mt-1 font-semibold text-slate-900">{formatCurrency(customer.totalChitValue)}</p></div>
            <div className="rounded-xl bg-slate-50 p-3"><p className="text-slate-500">Paid amount</p><p className="mt-1 font-semibold text-slate-900">₹2.8L</p></div>
            <div className="rounded-xl bg-slate-50 p-3"><p className="text-slate-500">Outstanding</p><p className="mt-1 font-semibold text-slate-900">₹1.4L</p></div>
            <div className="rounded-xl bg-slate-50 p-3"><p className="text-slate-500">Next due</p><p className="mt-1 font-semibold text-slate-900">{formatDate('2024-06-10')}</p></div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button key={tab} type="button" className={`rounded-xl px-3 py-2 text-sm ${tab === 'Overview' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Customer overview</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.2em] text-slate-500">Member number</p><p className="mt-2 text-lg font-semibold text-slate-900">{customer.memberNumber}</p></div>
            <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.2em] text-slate-500">Mobile</p><p className="mt-2 text-lg font-semibold text-slate-900">{customer.mobile}</p></div>
            <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</p><p className="mt-2 text-lg font-semibold text-slate-900">{customer.email}</p></div>
            <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.2em] text-slate-500">Assigned office</p><p className="mt-2 text-lg font-semibold text-slate-900">{customer.assignedOffice}</p></div>
            <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2"><p className="text-xs uppercase tracking-[0.2em] text-slate-500">Address</p><p className="mt-2 text-lg font-semibold text-slate-900">{customer.address}</p></div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Recent activity</h3>
          <div className="mt-5 space-y-4">
            {['Monthly installment recorded', 'KYC reviewed', 'Receipt generated', 'Auction status updated'].map((entry) => (
              <div key={entry} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                {entry}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
