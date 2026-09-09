import { Badge } from '../components/Badge'
import { mockOffices } from '../mock/data'

export const OfficesPage = () => (
  <div className="space-y-6">
    <div>
      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Office network</p>
      <h2 className="mt-2 text-3xl font-semibold text-slate-900">Offices</h2>
    </div>

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {mockOffices.map((office) => (
        <div key={office.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">{office.name}</h3>
            <Badge label={office.status} tone={office.status === 'Active' ? 'success' : 'neutral'} />
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div><span className="block text-xs uppercase tracking-[0.16em] text-slate-400">Address</span><span className="mt-1 block text-slate-700">{office.address}</span></div>
            <div><span className="block text-xs uppercase tracking-[0.16em] text-slate-400">Contact</span><span className="mt-1 block text-slate-700">{office.contact}</span></div>
            <div><span className="block text-xs uppercase tracking-[0.16em] text-slate-400">Manager</span><span className="mt-1 block text-slate-700">{office.manager}</span></div>
          </div>
        </div>
      ))}
    </div>
  </div>
)
