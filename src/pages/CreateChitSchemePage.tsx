import { ArrowLeft, CheckCircle2, Save } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const initialForm = {
  schemeName: '',
  totalValue: '',
  duration: '',
  memberCount: '',
  monthlyInstallment: '',
  status: 'Active',
  commissionSetting: '',
  dividendSetting: '',
}

export const CreateChitSchemePage = () => {
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
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Chit schemes</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Create chit scheme</h2>
        </div>
        <Link to="/chit-schemes" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
          <ArrowLeft className="h-4 w-4" />
          Back to schemes
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {saved && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            Scheme draft saved successfully.
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Scheme name</label>
            <input value={form.schemeName} onChange={(event) => handleChange('schemeName', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" placeholder="Example: 1 Lakh 21 Month Chit" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Total chit value</label>
            <input value={form.totalValue} onChange={(event) => handleChange('totalValue', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" placeholder="₹1,00,000" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Duration</label>
            <input value={form.duration} onChange={(event) => handleChange('duration', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" placeholder="21 months" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Member count</label>
            <input value={form.memberCount} onChange={(event) => handleChange('memberCount', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" placeholder="20" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Monthly installment</label>
            <input value={form.monthlyInstallment} onChange={(event) => handleChange('monthlyInstallment', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" placeholder="₹4,762" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
            <select value={form.status} onChange={(event) => handleChange('status', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
              <option>Active</option>
              <option>Draft</option>
              <option>Paused</option>
            </select>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Commission setting</label>
            <textarea value={form.commissionSetting} onChange={(event) => handleChange('commissionSetting', event.target.value)} rows={4} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" placeholder="Commission configuration" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Dividend setting</label>
            <textarea value={form.dividendSetting} onChange={(event) => handleChange('dividendSetting', event.target.value)} rows={4} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" placeholder="Dividend configuration" />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button type="button" onClick={() => setForm(initialForm)} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">Reset</button>
          <button type="button" onClick={() => setSaved(true)} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">
            <Save className="h-4 w-4" />
            Save scheme
          </button>
        </div>
      </div>
    </div>
  )
}
