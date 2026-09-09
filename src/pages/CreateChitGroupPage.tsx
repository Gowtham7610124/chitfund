import { ArrowLeft, CheckCircle2, Save } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const initialForm = {
  groupId: '',
  scheme: 'Gold Saver Premium',
  office: 'Bengaluru Central',
  startMonth: '',
  totalMembers: '',
  monthlyInstallment: '',
}

export const CreateChitGroupPage = () => {
  const [form, setForm] = useState(initialForm)
  const [saved, setSaved] = useState(false)

  const handleChange = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setSaved(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Chit groups</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Create group</h2>
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
            Group created and staged for activation.
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Group ID</label>
            <input value={form.groupId} onChange={(event) => handleChange('groupId', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" placeholder="GRP-06" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Select scheme</label>
            <select value={form.scheme} onChange={(event) => handleChange('scheme', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
              <option>Gold Saver Premium</option>
              <option>Vehicle Growth Plan</option>
              <option>1 Lakh 21 Month Chit</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Office</label>
            <select value={form.office} onChange={(event) => handleChange('office', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
              <option>Bengaluru Central</option>
              <option>Hyderabad North</option>
              <option>Chennai South</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Start month</label>
            <input type="date" value={form.startMonth} onChange={(event) => handleChange('startMonth', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Total members</label>
            <input value={form.totalMembers} onChange={(event) => handleChange('totalMembers', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" placeholder="20" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Monthly installment</label>
            <input value={form.monthlyInstallment} onChange={(event) => handleChange('monthlyInstallment', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" placeholder="₹4,762" />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button type="button" onClick={() => setForm(initialForm)} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">Reset</button>
          <button type="button" onClick={() => setSaved(true)} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">
            <Save className="h-4 w-4" />
            Create group
          </button>
        </div>
      </div>
    </div>
  )
}
