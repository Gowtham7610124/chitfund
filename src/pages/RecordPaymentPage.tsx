import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const initialForm = {
  customer: 'Asha Nair',
  group: 'GRP-01',
  month: 'June 2024',
  paymentMethod: 'UPI',
  amount: '25000',
  reference: 'UPI-XXXX',
  remarks: '',
}

export const RecordPaymentPage = () => {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setSubmitted(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Payments</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Record payment</h2>
        </div>
        <Link to="/payments" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
          <ArrowLeft className="h-4 w-4" />
          Back to ledger
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {submitted && (
            <div className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Payment recorded and queued for reconciliation.
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Customer</label>
              <select value={form.customer} onChange={(event) => handleChange('customer', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                <option>Asha Nair</option>
                <option>Rahul Bhatia</option>
                <option>Karthik Sekar</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Group</label>
              <select value={form.group} onChange={(event) => handleChange('group', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                <option>GRP-01</option>
                <option>GRP-02</option>
                <option>GRP-03</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Month</label>
              <select value={form.month} onChange={(event) => handleChange('month', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                <option>June 2024</option>
                <option>July 2024</option>
                <option>August 2024</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Payment method</label>
              <select value={form.paymentMethod} onChange={(event) => handleChange('paymentMethod', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                <option>UPI</option>
                <option>Cash</option>
                <option>Bank transfer</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Amount</label>
              <input value={form.amount} onChange={(event) => handleChange('amount', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700" placeholder="₹25,000" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Reference</label>
              <input value={form.reference} onChange={(event) => handleChange('reference', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700" placeholder="UPI-XXXX" />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">Remarks</label>
            <textarea value={form.remarks} onChange={(event) => handleChange('remarks', event.target.value)} rows={4} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700" placeholder="Payment remarks" />
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button type="button" onClick={() => setForm(initialForm)} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">Reset</button>
            <button type="button" onClick={() => setSubmitted(true)} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">
              <CheckCircle2 className="h-4 w-4" />
              Confirm payment
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Payment summary</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div className="flex items-center justify-between"><span>Due amount</span><span className="font-medium text-slate-900">₹25,000</span></div>
            <div className="flex items-center justify-between"><span>Outstanding</span><span className="font-medium text-slate-900">₹10,000</span></div>
            <div className="flex items-center justify-between"><span>Agent</span><span className="font-medium text-slate-900">Vijay Reddy</span></div>
            <div className="flex items-center justify-between"><span>Payment status</span><span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">Verified</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
