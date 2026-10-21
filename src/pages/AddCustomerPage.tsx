import { ArrowLeft, CheckCircle2, Save } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createCustomer, getCustomerById, updateCustomer } from '../services/customerService'
import type { Customer } from '../types'

type FormState = {
  name: string
  memberNumber: string
  mobile: string
  email: string
  dateOfBirth: string
  address: string
  nominee: string
  bankInfo: string
  assignedOffice: string
  assignedAgent: string
  kycStatus: 'Pending' | 'Verified' | 'Rejected'
  status: 'Active' | 'Inactive' | 'Blacklisted'
  totalChitValue: number
}

const initialForm: FormState = {
  name: '',
  memberNumber: '',
  mobile: '',
  email: '',
  dateOfBirth: '',
  address: '',
  nominee: '',
  bankInfo: '',
  assignedOffice: 'Bengaluru Central',
  assignedAgent: 'Vijay Reddy',
  kycStatus: 'Pending',
  status: 'Active',
  totalChitValue: 0,
}

const mapCustomerToForm = (customer: Customer): FormState => ({
  name: customer.name,
  memberNumber: customer.memberNumber,
  mobile: customer.mobile,
  email: customer.email,
  dateOfBirth: customer.dateOfBirth,
  address: customer.address,
  nominee: customer.nominee,
  bankInfo: customer.bankInfo,
  assignedOffice: customer.assignedOffice,
  assignedAgent: customer.assignedAgent,
  kycStatus: customer.kycStatus,
  status: customer.status,
  totalChitValue: customer.totalChitValue,
})

export const AddCustomerPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const existingCustomer = useMemo(() => (id ? getCustomerById(id) : undefined), [id])
  const isEditMode = Boolean(id)

  const [form, setForm] = useState(initialForm)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setForm(existingCustomer ? mapCustomerToForm(existingCustomer) : initialForm)
    setSaved(false)
  }, [existingCustomer])

  const handleChange = <T extends keyof FormState>(field: T, value: FormState[T]) => {
    setForm((current) => ({ ...current, [field]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    const customerPayload: Customer = {
      id: existingCustomer?.id ?? `CUST-${Date.now()}`,
      memberNumber: form.memberNumber || `MEM-${Date.now().toString().slice(-4)}`,
      name: form.name,
      mobile: form.mobile,
      email: form.email,
      dateOfBirth: form.dateOfBirth,
      address: form.address,
      nominee: form.nominee,
      bankInfo: form.bankInfo,
      kycStatus: form.kycStatus,
      status: form.status,
      assignedOffice: form.assignedOffice,
      assignedAgent: form.assignedAgent,
      createdDate: existingCustomer?.createdDate ?? new Date().toISOString().slice(0, 10),
      totalChitValue: Number(form.totalChitValue) || 0,
    }

    if (isEditMode && existingCustomer) {
      updateCustomer(customerPayload)
    } else {
      createCustomer(customerPayload)
    }

    setSaved(true)
    navigate('/customers')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Customers</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">{isEditMode ? 'Edit customer' : 'Add customer'}</h2>
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
            Customer saved successfully.
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
            <input value={form.name} onChange={(event) => handleChange('name', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700" placeholder="Customer name" />
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
            <label className="mb-2 block text-sm font-medium text-slate-700">Date of birth</label>
            <input type="date" value={form.dateOfBirth} onChange={(event) => handleChange('dateOfBirth', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700" />
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
            <label className="mb-2 block text-sm font-medium text-slate-700">Assigned agent</label>
            <select value={form.assignedAgent} onChange={(event) => handleChange('assignedAgent', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
              <option>Vijay Reddy</option>
              <option>Arun Kumar</option>
              <option>Sneha Pillai</option>
              <option>Manoj Ghosh</option>
              <option>Latha Murugan</option>
              <option>Bhavya Sharma</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">KYC status</label>
            <select value={form.kycStatus} onChange={(event) => handleChange('kycStatus', event.target.value as FormState['kycStatus'])} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
              <option>Pending</option>
              <option>Verified</option>
              <option>Rejected</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Customer status</label>
            <select value={form.status} onChange={(event) => handleChange('status', event.target.value as FormState['status'])} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
              <option>Active</option>
              <option>Inactive</option>
              <option>Blacklisted</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Total chit value</label>
            <input type="number" value={form.totalChitValue} onChange={(event) => handleChange('totalChitValue', Number(event.target.value))} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700" placeholder="0" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Nominee</label>
            <input value={form.nominee} onChange={(event) => handleChange('nominee', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700" placeholder="Nominee name" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Bank info</label>
            <input value={form.bankInfo} onChange={(event) => handleChange('bankInfo', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700" placeholder="Bank account info" />
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-slate-700">Address</label>
          <textarea value={form.address} onChange={(event) => handleChange('address', event.target.value)} rows={4} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700" placeholder="Customer address" />
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button type="button" onClick={() => setForm(existingCustomer ? mapCustomerToForm(existingCustomer) : initialForm)} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">Reset</button>
          <button type="button" onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">
            <Save className="h-4 w-4" />
            {isEditMode ? 'Update customer' : 'Save customer'}
          </button>
        </div>
      </div>
    </div>
  )
}
