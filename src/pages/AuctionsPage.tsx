import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { mockAuctions } from '../mock/data'
import { formatCurrency } from '../utils/currency'
import { formatDate } from '../utils/date'

export const AuctionsPage = () => {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const filteredBookings = useMemo(() => {
    const value = query.trim().toLowerCase()
    return mockAuctions.filter((booking) => {
      const matchesStatus = statusFilter === 'All' || booking.status === statusFilter
      const matchesQuery =
        !value ||
        booking.groupId.toLowerCase().includes(value) ||
        booking.winner.toLowerCase().includes(value) ||
        booking.month.toLowerCase().includes(value)

      return matchesStatus && matchesQuery
    })
  }, [query, statusFilter])

  const statuses = ['All', ...Array.from(new Set(mockAuctions.map((booking) => booking.status)))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Chit booking</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Chit booking schedule</h2>
        </div>
        <button type="button" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">Create booking</button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="relative block max-w-md flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search booking group or winner"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-sky-400 focus:bg-white"
            />
          </label>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600"
          >
            {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredBookings.map((booking) => (
          <div key={booking.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">{booking.groupId}</h3>
              <Badge label={booking.status} tone={booking.status === 'Completed' ? 'success' : booking.status === 'Open' ? 'warning' : 'info'} />
            </div>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between"><span>Booking date</span><span className="font-medium text-slate-900">{formatDate(booking.auctionDate)}</span></div>
              <div className="flex justify-between"><span>Month</span><span className="font-medium text-slate-900">{booking.month}</span></div>
              <div className="flex justify-between"><span>Eligible members</span><span className="font-medium text-slate-900">{booking.eligibleMembers}</span></div>
              <div className="flex justify-between"><span>Booked members</span><span className="font-medium text-slate-900">{booking.bids}</span></div>
              <div className="flex justify-between"><span>Booked amount</span><span className="font-medium text-slate-900">{formatCurrency(booking.winningBid)}</span></div>
              <div className="flex justify-between"><span>Booked by</span><span className="font-medium text-slate-900">{booking.winner}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
