import { Eye, Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { deleteChitGroup, getChitGroups } from '../services/chitGroupService'
import type { ChitGroup } from '../types'
import { formatCurrency } from '../utils/currency'
import { formatDate } from '../utils/date'

export const ChitGroupsPage = () => {
  const navigate = useNavigate()
  const [groups, setGroups] = useState<ChitGroup[]>(() => getChitGroups())

  const handleDelete = (id: string) => {
    const group = groups.find((item) => item.id === id)
    if (!group) return

    const confirmed = window.confirm(`Delete ${group.id}?`)
    if (!confirmed) return

    deleteChitGroup(id)
    setGroups((current) => current.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Chit groups</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Group management</h2>
        </div>
        <button
          type="button"
          onClick={() => navigate('/chit-groups/new')}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white"
        >
          <Plus className="h-4 w-4" />
          Create group
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Group ID</th>
                <th className="px-5 py-3 font-medium">Scheme</th>
                <th className="px-5 py-3 font-medium">Office</th>
                <th className="px-5 py-3 font-medium">Start date</th>
                <th className="px-5 py-3 font-medium">End date</th>
                <th className="px-5 py-3 font-medium">Members</th>
                <th className="px-5 py-3 font-medium">Actual value</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <tr key={group.id} className="border-t border-slate-200 align-top">
                  <td className="px-5 py-4 font-medium text-slate-900">{group.id}</td>
                  <td className="px-5 py-4 text-slate-700">{group.schemeId}</td>
                  <td className="px-5 py-4 text-slate-700">{group.officeId}</td>
                  <td className="px-5 py-4 text-slate-700">{formatDate(group.startDate)}</td>
                  <td className="px-5 py-4 text-slate-700">{formatDate(group.endDate)}</td>
                  <td className="px-5 py-4 text-slate-700">{group.membersCount}</td>
                  <td className="px-5 py-4 text-slate-700">{formatCurrency(group.totalValue)}</td>
                  <td className="px-5 py-4">
                    <Badge
                      label={group.status}
                      tone={group.status === 'Active' ? 'success' : group.status === 'Completed' ? 'neutral' : 'warning'}
                    />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/chit-groups/${group.id}`)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate(`/chit-groups/${group.id}/edit`)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(group.id)}
                        className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
