import { ArrowLeft, CheckCircle2, Save } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const initialForm = {
  fullName: '',
  memberNumber: '',
  mobile: '',
  email: '',
  assignedOffice: 'Bengaluru Central',
  chitScheme: 'Gold Saver Premium',
  nominee: '',
  bankDetails: '',
  kycStatus: 'Pending',
  address: '',
}

export const AddCustomerPage = () => {
  const [form, setForm] = useState(initialForm)
  const [saved, setSaved] = useState(false)

  const handleChange = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Customers</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Add customer</h2>
        </div>
        <Link to="/customers" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
          <ArrowLeft className="h-4 w-4" />
          Back to list
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {saved && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            Customer saved to the working draft successfully.
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
            <input value={form.fullName} onChange={(event) => handleChange('fullName', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700" placeholder="Customer name" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Member number</label>
            <input value={form.memberNumber} onChange={(event) => handleChange('memberNumber', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700" placeholder="MEM-1021" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Mobile</label>
            <input value={form.mobile} onChange={(event) => handleChange('mobile', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700" placeholder="+91 9XXXXXXXXX" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input value={form.email} onChange={(event) => handleChange('email', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700" placeholder="customer@example.com" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Assigned office</label>
            <select value={form.assignedOffice} onChange={(event) => handleChange('assignedOffice', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
              <option>Bengaluru Central</option>
              <option>Hyderabad North</option>
              <option>Chennai South</option>
              <option>Pune West</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Chit scheme</label>
            <select value={form.chitScheme} onChange={(event) => handleChange('chitScheme', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
              <option>Gold Saver Premium</option>
              <option>Vehicle Growth Plan</option>
              <option>Home Builder Scheme</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Nominee</label>
            <input value={form.nominee} onChange={(event) => handleChange('nominee', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700" placeholder="Nominee name" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Bank details</label>
            <input value={form.bankDetails} onChange={(event) => handleChange('bankDetails', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700" placeholder="Bank account info" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">KYC status</label>
            <select value={form.kycStatus} onChange={(event) => handleChange('kycStatus', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
              <option>Pending</option>
              <option>Verified</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-slate-700">Address</label>
          <textarea value={form.address} onChange={(event) => handleChange('address', event.target.value)} rows={4} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700" placeholder="Customer address" />
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button type="button" onClick={() => setForm(initialForm)} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">Reset</button>
          <button type="button" onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">
            <Save className="h-4 w-4" />
            Save customer
          </button>
        </div>
      </div>
    </div>
  )
}
