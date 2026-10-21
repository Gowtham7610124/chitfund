import { Badge } from '../components/Badge'
import { mockSchemes } from '../mock/data'
import { formatCurrency } from '../utils/currency'

export const ChitSchemesPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Chit management</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900">Chit schemes</h2>
      </div>
      <button type="button" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">Create scheme</button>
    </div>

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {mockSchemes.map((scheme) => (
        <div key={scheme.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">{scheme.name}</h3>
            <Badge label={scheme.status} tone={scheme.status === 'Active' ? 'success' : 'neutral'} />
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between"><span>Total chit value</span><span className="font-medium text-slate-900">{formatCurrency(scheme.totalValue)}</span></div>
            <div className="flex justify-between"><span>Duration</span><span className="font-medium text-slate-900">{scheme.durationMonths} months</span></div>
            <div className="flex justify-between"><span>Members</span><span className="font-medium text-slate-900">{scheme.members}</span></div>
            <div className="flex justify-between"><span>Monthly installment</span><span className="font-medium text-slate-900">{formatCurrency(scheme.monthlyInstallment)}</span></div>
            <div className="flex justify-between"><span>Commission</span><span className="font-medium text-slate-900">{scheme.commissionConfig}</span></div>
            <div className="flex justify-between"><span>Dividend</span><span className="font-medium text-slate-900">{scheme.dividendConfig}</span></div>
          </div>
        </div>
      ))}
    </div>
  </div>
)
