import { BellRing } from 'lucide-react'
import { Badge } from '../components/Badge'
import { mockNotifications } from '../mock/data'
import { formatDate } from '../utils/date'

export const NotificationsPage = () => (
  <div className="space-y-6">
    <div>
      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Notifications</p>
      <h2 className="mt-2 text-3xl font-semibold text-slate-900">Notification center</h2>
    </div>

    <div className="space-y-4">
      {mockNotifications.map((notification) => (
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
