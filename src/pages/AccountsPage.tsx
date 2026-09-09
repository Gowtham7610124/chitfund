import { Badge } from '../components/Badge'

const ledger = [
  { title: 'Collection deposits', amount: '₹8,40,000', status: 'Cleared' },
  { title: 'Customer installment receipts', amount: '₹5,10,200', status: 'Pending' },
  { title: 'Payout disbursement', amount: '₹2,20,000', status: 'In review' },
  { title: 'Office operating expenses', amount: '₹1,45,500', status: 'Approved' },
]

export const AccountsPage = () => (
  <div className="space-y-6">
    <div>
      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Accounts</p>
      <h2 className="mt-2 text-3xl font-semibold text-slate-900">Finance overview</h2>
    </div>

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {[
        { label: 'Cash in hand', value: '₹18,50,200' },
        { label: 'Monthly collections', value: '₹26,40,000' },
        { label: 'Pending payouts', value: '₹4,10,000' },
        { label: 'Available balance', value: '₹12,80,450' },
      ].map((item) => (
        <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">{item.label}</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">{item.value}</p>
        </div>
      ))}
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h3 className="text-lg font-semibold text-slate-900">Account ledger</h3>
      </div>
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-5 py-3 font-medium">Entry</th>
            <th className="px-5 py-3 font-medium">Amount</th>
            <th className="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {ledger.map((entry) => (
            <tr key={entry.title} className="border-t border-slate-200">
              <td className="px-5 py-4 font-medium text-slate-800">{entry.title}</td>
              <td className="px-5 py-4 text-slate-700">{entry.amount}</td>
              <td className="px-5 py-4"><Badge label={entry.status} tone={entry.status === 'Cleared' ? 'success' : entry.status === 'Approved' ? 'info' : 'warning'} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)
