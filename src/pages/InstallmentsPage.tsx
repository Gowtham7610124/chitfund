import { Badge } from '../components/Badge'
import { mockInstallments } from '../mock/data'
import { formatCurrency } from '../utils/currency'
import { formatDate } from '../utils/date'

export const InstallmentsPage = () => (
  <div className="space-y-6">
    <div>
      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Collections</p>
      <h2 className="mt-2 text-3xl font-semibold text-slate-900">Installments</h2>
    </div>

    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
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
          {mockInstallments.slice(0, 12).map((installment) => (
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
)
