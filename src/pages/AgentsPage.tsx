import { Badge } from '../components/Badge'
import { mockAgents } from '../mock/data'
import { formatCurrency } from '../utils/currency'

export const AgentsPage = () => (
  <div className="space-y-6">
    <div>
      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Field operations</p>
      <h2 className="mt-2 text-3xl font-semibold text-slate-900">Collection agents</h2>
    </div>

    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-5 py-3 font-medium">Agent</th>
            <th className="px-5 py-3 font-medium">Mobile</th>
            <th className="px-5 py-3 font-medium">Office</th>
            <th className="px-5 py-3 font-medium">Assigned customers</th>
            <th className="px-5 py-3 font-medium">Today's collection</th>
            <th className="px-5 py-3 font-medium">Monthly</th>
            <th className="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {mockAgents.map((agent) => (
            <tr key={agent.id} className="border-t border-slate-200">
              <td className="px-5 py-4 font-medium text-slate-800">{agent.name}</td>
              <td className="px-5 py-4 text-slate-700">{agent.mobile}</td>
              <td className="px-5 py-4 text-slate-700">{agent.officeId}</td>
              <td className="px-5 py-4 text-slate-700">{agent.assignedCustomers}</td>
              <td className="px-5 py-4 text-slate-700">{formatCurrency(agent.todaysCollection)}</td>
              <td className="px-5 py-4 text-slate-700">{formatCurrency(agent.monthlyCollection)}</td>
              <td className="px-5 py-4"><Badge label={agent.status} tone={agent.status === 'Active' ? 'success' : 'neutral'} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)
