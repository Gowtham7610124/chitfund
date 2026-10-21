import { ArrowLeft, CheckCircle2, Save } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createChitGroup, getChitGroupById, updateChitGroup } from '../services/chitGroupService'
import type { ChitGroup } from '../types'

type FormState = {
  groupId: string
  scheme: string
  office: string
  startDate: string
  endDate: string
  membersCount: number
  monthlyInstallment: number
  totalValue: number
  status: 'Active' | 'Completed' | 'Pending'
}

const initialForm: FormState = {
  groupId: '',
  scheme: 'Gold Saver Premium',
  office: 'Bengaluru Central',
  startDate: '',
  endDate: '',
  membersCount: 20,
  monthlyInstallment: 25000,
  totalValue: 500000,
  status: 'Active',
}

const mapGroupToForm = (group: ChitGroup): FormState => ({
  groupId: group.id,
  scheme: group.schemeId,
  office: group.officeId,
  startDate: group.startDate,
  endDate: group.endDate,
  membersCount: group.membersCount,
  monthlyInstallment: group.monthlyInstallment,
  totalValue: group.totalValue,
  status: group.status,
})

export const CreateChitGroupPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)
  const existingGroup = useMemo(() => (id ? getChitGroupById(id) : undefined), [id])

  const [form, setForm] = useState<FormState>(initialForm)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setForm(existingGroup ? mapGroupToForm(existingGroup) : initialForm)
    setSaved(false)
  }, [existingGroup])

  const handleChange = <T extends keyof FormState>(field: T, value: FormState[T]) => {
    setForm((current) => ({ ...current, [field]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    const groupPayload: ChitGroup = {
      id: form.groupId || existingGroup?.id || `GRP-${Date.now().toString().slice(-4)}`,
      schemeId: form.scheme,
      officeId: form.office,
      startDate: form.startDate,
      endDate: form.endDate,
      membersCount: Number(form.membersCount) || 0,
      totalValue: Number(form.totalValue) || 0,
      monthlyInstallment: Number(form.monthlyInstallment) || 0,
      status: form.status,
    }

    if (isEditMode && existingGroup) {
      updateChitGroup(groupPayload)
    } else {
      createChitGroup(groupPayload)
    }

    setSaved(true)
    navigate('/chit-groups')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Chit groups</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">{isEditMode ? 'Edit group' : 'Create group'}</h2>
        </div>
        <Link to="/chit-groups" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
          <ArrowLeft className="h-4 w-4" />
          Back to groups
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {saved && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            Group saved successfully.
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Group ID</label>
            <input value={form.groupId} onChange={(event) => handleChange('groupId', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" placeholder="GRP-06" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Scheme</label>
            <select value={form.scheme} onChange={(event) => handleChange('scheme', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
              <option>Gold Saver Premium</option>
              <option>Vehicle Growth Plan</option>
              <option>Business Expansion Chit</option>
              <option>Home Builder Scheme</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Office</label>
            <select value={form.office} onChange={(event) => handleChange('office', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
              <option>Bengaluru Central</option>
              <option>Hyderabad North</option>
              <option>Chennai South</option>
              <option>Pune West</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Start month</label>
            <input type="date" value={form.startDate} onChange={(event) => handleChange('startDate', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">End month</label>
            <input type="date" value={form.endDate} onChange={(event) => handleChange('endDate', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Members</label>
            <input type="number" min={1} value={form.membersCount} onChange={(event) => handleChange('membersCount', Number(event.target.value))} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" placeholder="20" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Monthly installment</label>
            <input type="number" min={0} value={form.monthlyInstallment} onChange={(event) => handleChange('monthlyInstallment', Number(event.target.value))} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" placeholder="25000" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Actual value</label>
            <input type="number" min={0} value={form.totalValue} onChange={(event) => handleChange('totalValue', Number(event.target.value))} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" placeholder="500000" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
            <select value={form.status} onChange={(event) => handleChange('status', event.target.value as FormState['status'])} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
              <option>Active</option>
              <option>Completed</option>
              <option>Pending</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button type="button" onClick={() => setForm(existingGroup ? mapGroupToForm(existingGroup) : initialForm)} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">Reset</button>
          <button type="button" onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">
            <Save className="h-4 w-4" />
            {isEditMode ? 'Save changes' : 'Create group'}
          </button>
        </div>
      </div>
    </div>
  )
}
