import { BellRing, Send } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '../components/Badge'
import { mockNotifications } from '../mock/data'
import type { NotificationItem } from '../types'
import { formatDate } from '../utils/date'

const initialForm = {
  sendTo: 'Group',
  target: 'GRP-01',
  type: 'Payment reminder',
  message: 'Your installment for this month is due on 10th. Please make the payment before the due date.',
}

export const NotificationsPage = () => {
  const [form, setForm] = useState(initialForm)
  const [items, setItems] = useState(mockNotifications)

  const handleChange = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSend = () => {
    const notificationType: NotificationItem['type'] =
      form.type === 'Payment reminder' ? 'Payment' :
      form.type === 'KYC follow-up' ? 'KYC' :
      'System'

    const newNotification: NotificationItem = {
      id: `NOT-${Date.now()}`,
      title: `${form.type} for ${form.target}`,
      message: form.message,
      type: notificationType,
      createdAt: new Date().toISOString(),
      read: false,
    }

    setItems((current) => [newNotification, ...current])
    setForm(initialForm)
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Notifications</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900">Notification center</h2>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900"><Send className="h-5 w-5 text-sky-600" /> Compose message</div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Send to</label>
            <select value={form.sendTo} onChange={(event) => handleChange('sendTo', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
              <option>Individual member</option>
              <option>Group</option>
              <option>All members</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Target</label>
            <select value={form.target} onChange={(event) => handleChange('target', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
              <option>GRP-01</option>
              <option>GRP-02</option>
              <option>CUST-001</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Message type</label>
            <select value={form.type} onChange={(event) => handleChange('type', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
              <option>Payment reminder</option>
              <option>General notice</option>
              <option>KYC follow-up</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-slate-700">Message</label>
          <textarea value={form.message} onChange={(event) => handleChange('message', event.target.value)} rows={4} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-sky-400" />
        </div>
        <div className="mt-4 flex justify-end">
          <button type="button" onClick={handleSend} className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">Send notification</button>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((notification) => (
          <div key={notification.id} className={`flex items-start gap-4 rounded-2xl border p-4 shadow-sm ${notification.read ? 'border-slate-200 bg-white' : 'border-sky-200 bg-sky-50'}`}>
            <div className="rounded-xl bg-slate-900 p-2 text-white"><BellRing className="h-4 w-4" /></div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-medium text-slate-900">{notification.title}</h3>
                {!notification.read && <Badge label="New" tone="info" />}
              </div>
              <p className="mt-2 text-sm text-slate-600">{notification.message}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>{notification.type}</span>
                <span>{formatDate(notification.createdAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
