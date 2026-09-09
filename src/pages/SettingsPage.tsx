import { Badge } from '../components/Badge'

const settingsSections = [
  { title: 'Company settings', items: ['Company name', 'Registration number', 'Default office', 'Currency'] },
  { title: 'Chit configuration', items: ['Commission placeholder', 'Dividend placeholder', 'Auction design', 'Business rules'] },
  { title: 'Receipt configuration', items: ['Header text', 'Footer notes', 'Print layout', 'Download PDF preset'] },
  { title: 'Notification settings', items: ['Email alerts', 'WhatsApp placeholder', 'SMS placeholder', 'Push notification'] },
]

export const SettingsPage = () => (
  <div className="space-y-6">
    <div>
      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Settings</p>
      <h2 className="mt-2 text-3xl font-semibold text-slate-900">System preferences</h2>
    </div>

    <div className="grid gap-5 lg:grid-cols-2">
      {settingsSections.map((section) => (
        <div key={section.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
            <Badge label="Config" tone="neutral" />
          </div>
          <div className="space-y-2">
            {section.items.map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">{item}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)
