import { Badge } from '../components/Badge'
import { mockPayments } from '../mock/data'
import { formatCurrency } from '../utils/currency'
import { formatDate } from '../utils/date'

export const PaymentsPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Collections</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900">Payments</h2>
      </div>
      <button type="button" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">Record payment</button>
    </div>

    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="max-h-[560px] overflow-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="sticky top-0 z-10 bg-slate-50/95 text-slate-500 backdrop-blur-sm">
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
            {mockPayments.slice(0, 12).map((payment) => (
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
  </div>
)
