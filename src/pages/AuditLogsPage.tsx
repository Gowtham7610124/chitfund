import { Badge } from '../components/Badge'
import { mockAuditLogs } from '../mock/data'
import { formatDate } from '../utils/date'

export const AuditLogsPage = () => (
  <div className="space-y-6">
    <div>
      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Audit logs</p>
      <h2 className="mt-2 text-3xl font-semibold text-slate-900">System activity trail</h2>
    </div>

    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 font-medium text-slate-500">Date</th>
              <th className="px-5 py-3 font-medium text-slate-500">User</th>
              <th className="px-5 py-3 font-medium text-slate-500">Role</th>
              <th className="px-5 py-3 font-medium text-slate-500">Action</th>
              <th className="px-5 py-3 font-medium text-slate-500">Module</th>
              <th className="px-5 py-3 font-medium text-slate-500">Record</th>
            </tr>
          </thead>
          <tbody>
            {mockAuditLogs.slice(0, 12).map((log) => (
              <tr key={log.id} className="border-t border-slate-200">
                <td className="px-5 py-3 text-slate-600">{formatDate(log.dateTime)}</td>
                <td className="px-5 py-3 font-medium text-slate-800">{log.user}</td>
                <td className="px-5 py-3"><Badge label={log.role.replace('_', ' ')} tone="neutral" /></td>
                <td className="px-5 py-3 text-slate-700">{log.action}</td>
                <td className="px-5 py-3 text-slate-700">{log.module}</td>
                <td className="px-5 py-3 text-slate-700">{log.record}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
