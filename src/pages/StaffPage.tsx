import { mockStaff } from '../mock/data'
import { Badge } from '../components/Badge'

export const StaffPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Staff & Users</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900">Team access and roles</h2>
      </div>
      <button type="button" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">Add staff</button>
    </div>

    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-5 py-3 font-medium">Name</th>
            <th className="px-5 py-3 font-medium">Role</th>
            <th className="px-5 py-3 font-medium">Office</th>
            <th className="px-5 py-3 font-medium">Permissions</th>
            <th className="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {mockStaff.map((staff) => (
            <tr key={staff.id} className="border-t border-slate-200">
              <td className="px-5 py-4 font-medium text-slate-800">{staff.name}</td>
              <td className="px-5 py-4 text-slate-700">{staff.role}</td>
              <td className="px-5 py-4 text-slate-700">{staff.officeId}</td>
              <td className="px-5 py-4 text-slate-700">{staff.permissions.join(', ')}</td>
              <td className="px-5 py-4"><Badge label={staff.status} tone={staff.status === 'Active' ? 'success' : 'neutral'} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)
