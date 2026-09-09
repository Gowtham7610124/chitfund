import { Search, Upload } from 'lucide-react'
import { mockCustomers } from '../mock/data'
import { Badge } from '../components/Badge'

export const KycPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">KYC / Documents</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900">Document verification</h2>
      </div>
      <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">
        <Upload className="h-4 w-4" />
        Upload document
      </button>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <label className="relative block max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder="Search customer or status" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-sky-400" />
      </label>
    </div>

    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-5 py-3 font-medium">Customer</th>
            <th className="px-5 py-3 font-medium">Documents</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Risk</th>
            <th className="px-5 py-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {mockCustomers.slice(0, 8).map((customer, index) => (
            <tr key={customer.id} className="border-t border-slate-200">
              <td className="px-5 py-4 font-medium text-slate-800">{customer.name}</td>
              <td className="px-5 py-4 text-slate-700">{index % 2 === 0 ? 'Aadhaar, PAN, Photo' : 'Aadhaar, Voter ID'}</td>
              <td className="px-5 py-4"><Badge label={customer.kycStatus} tone={customer.kycStatus === 'Verified' ? 'success' : customer.kycStatus === 'Pending' ? 'warning' : 'danger'} /></td>
              <td className="px-5 py-4 text-slate-700">{index % 2 === 0 ? 'Low' : 'Medium'}</td>
              <td className="px-5 py-4"><button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">Review</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)
