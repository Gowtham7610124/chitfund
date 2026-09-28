import { CircleDollarSign, Coins, ShieldCheck, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { StatCard } from '../components/StatCard'
import {
  getCollectionAgentSummary,
  getCollectionSummary,
  getDashboardMetrics,
  getPendingCollections,
  getRecentPayments,
  getUpcomingAuctions,
} from '../services/dashboardService'
import { formatCurrency } from '../utils/currency'
import { formatDate } from '../utils/date'

export const DashboardPage = () => {
  const metrics = getDashboardMetrics()
  const recentPayments = getRecentPayments()
  const upcomingAuctions = getUpcomingAuctions()
  const pendingCollectionsRaw = getPendingCollections()
  const collectionSummary = getCollectionSummary()
  const collectionAgentSummary = getCollectionAgentSummary()

  const [searchTerm, setSearchTerm] = useState('')
  const [filterField, setFilterField] = useState<'all' | 'name' | 'group' | 'number'>('all')
  const [page, setPage] = useState(1)
  const pageSize = 6

  const filteredPendingCollections = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase()

    return pendingCollectionsRaw.filter((item) => {
      const customerName = item.customerId || ''
      const groupLabel = item.groupId || ''
      const numberLabel = `#${item.installmentNumber}`

      const matchesTerm = !normalizedTerm ||
        customerName.toLowerCase().includes(normalizedTerm) ||
        groupLabel.toLowerCase().includes(normalizedTerm) ||
        numberLabel.toLowerCase().includes(normalizedTerm)

      const matchesField =
        filterField === 'all' ||
        (filterField === 'name' && customerName.toLowerCase().includes(normalizedTerm || '')) ||
        (filterField === 'group' && groupLabel.toLowerCase().includes(normalizedTerm || '')) ||
        (filterField === 'number' && numberLabel.toLowerCase().includes(normalizedTerm || ''))

      return matchesTerm && matchesField
    })
  }, [filterField, pendingCollectionsRaw, searchTerm])

  const totalPages = Math.max(1, Math.ceil(filteredPendingCollections.length / pageSize))
  const paginatedPendingCollections = filteredPendingCollections.slice((page - 1) * pageSize, page * pageSize)

  const financialSummary = useMemo(() => {
    const collectionTotal = recentPayments.reduce((sum, payment) => sum + payment.amount, 0)
    const expenseTotal = 820000
    const netSummary = collectionTotal - expenseTotal

    return {
      collectionTotal,
      expenseTotal,
      netSummary,
    }
  }, [recentPayments])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Overview</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Chit fund dashboard</h2>
        </div>
        <button type="button" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">Export report</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.slice(0, 4).map((metric) => (
          <StatCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            description={metric.description}
            icon={
              metric.label === 'Total Members' ? <Users className="h-5 w-5" /> :
              metric.label === 'Active Chit Groups' ? <ShieldCheck className="h-5 w-5" /> :
              metric.label === 'Total Chit Value' ? <Coins className="h-5 w-5" /> :
              <CircleDollarSign className="h-5 w-5" />
            }
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Collection summary</h3>
            <div className="flex gap-2">
              <Badge label="Today" tone="success" />
              <Badge label="This Week" tone="neutral" />
              <Badge label="This Month" tone="info" />
            </div>
          </div>
          <div className="grid grid-cols-7 items-end gap-3 pt-6">
            {collectionSummary.map((entry) => (
              <div key={entry.day} className="flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-sky-500 to-cyan-300"
                  style={{ height: `${Math.max(20, (entry.amount / 20000) * 100)}px` }}
                  title={`${entry.label}`}
                />
                <span className="text-xs text-slate-500">{entry.day.slice(0, 1)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Collection agent summary</h3>
          <div className="mt-5 max-h-[320px] space-y-4 overflow-y-auto pr-1">
            {collectionAgentSummary.map((agent) => (
              <div key={agent.name} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-800">{agent.name}</p>
                  <Badge
                    label={`${agent.performance}%`}
                    tone={agent.performance >= 90 ? 'success' : agent.performance >= 80 ? 'info' : 'neutral'}
                  />
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-slate-500">
                  <span>Customers: {agent.customers}</span>
                  <span>Carry forward: {agent.carryForwardCount}</span>
                  <span>Pending: {formatCurrency(agent.pendingCollection)}</span>
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  Extra pending from missed collection: {agent.carryForwardCount} items • {formatCurrency(agent.carryForwardAmount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Recent payments</h3>
            <button type="button" className="text-sm text-sky-600">View all</button>
          </div>
          <div className="max-h-[320px] overflow-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="sticky top-0 z-10 bg-white">
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="pb-3 pr-4 font-medium">Receipt No</th>
                  <th className="pb-3 pr-4 font-medium">Customer</th>
                  <th className="pb-3 pr-4 font-medium">Chit</th>
                  <th className="pb-3 pr-4 font-medium">Amount</th>
                  <th className="pb-3 pr-4 font-medium">Date</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 pr-4 font-medium text-slate-800">{payment.referenceNumber}</td>
                    <td className="py-3 pr-4">{payment.customerId}</td>
                    <td className="py-3 pr-4">{payment.groupId}</td>
                    <td className="py-3 pr-4">{formatCurrency(payment.amount)}</td>
                    <td className="py-3 pr-4">{formatDate(payment.paymentDate)}</td>
                    <td className="py-3 pr-4"><Badge label={payment.status} tone={payment.status === 'Success' ? 'success' : 'warning'} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Upcoming auctions</h3>
            <button type="button" className="text-sm text-sky-600">View all</button>
          </div>
          <div className="max-h-[320px] space-y-4 overflow-y-auto pr-1">
            {upcomingAuctions.map((auction) => (
              <div key={auction.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-800">{auction.groupId}</p>
                  <Badge label={auction.status} tone={auction.status === 'Scheduled' ? 'info' : 'success'} />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-600">
                  <span>Auction date: {formatDate(auction.auctionDate)}</span>
                  <span>Month: {auction.month}</span>
                  <span>Members: {auction.eligibleMembers}</span>
                  <span>Bids: {auction.bids}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-slate-900">Pending collections</h3>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value)
                setPage(1)
              }}
              placeholder="Search name, group or number"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-sky-400"
            />
            <select
              value={filterField}
              onChange={(event) => {
                setFilterField(event.target.value as 'all' | 'name' | 'group' | 'number')
                setPage(1)
              }}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-sky-400"
            >
              <option value="all">All</option>
              <option value="name">Name</option>
              <option value="group">Chit group</option>
              <option value="number">Number</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 pr-4 font-medium">Customer</th>
                <th className="pb-3 pr-4 font-medium">Chit group</th>
                <th className="pb-3 pr-4 font-medium">Installment</th>
                <th className="pb-3 pr-4 font-medium">Amount</th>
                <th className="pb-3 pr-4 font-medium">Due date</th>
                <th className="pb-3 pr-4 font-medium">Agent</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPendingCollections.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 pr-4 font-medium text-slate-800">{item.customerId}</td>
                  <td className="py-3 pr-4">{item.groupId}</td>
                  <td className="py-3 pr-4">#{item.installmentNumber}</td>
                  <td className="py-3 pr-4">{formatCurrency(item.outstanding)}</td>
                  <td className="py-3 pr-4">{formatDate(item.dueDate)}</td>
                  <td className="py-3 pr-4">Vijay Reddy</td>
                  <td className="py-3 pr-4"><Badge label={item.status} tone={item.status === 'Overdue' ? 'danger' : 'warning'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {Math.min((page - 1) * pageSize + 1, filteredPendingCollections.length)}-
            {Math.min(page * pageSize, filteredPendingCollections.length)} of {filteredPendingCollections.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              disabled={page === 1}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
              disabled={page >= totalPages}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Action center</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-sm text-slate-500">KYC pending</p><p className="mt-2 text-2xl font-semibold text-slate-900">07</p></div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-sm text-slate-500">Collections due</p><p className="mt-2 text-2xl font-semibold text-slate-900">14</p></div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-sm text-slate-500">Overdue</p><p className="mt-2 text-2xl font-semibold text-slate-900">₹18.6L</p></div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Financial summary</h3>
          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Collections</span>
              <span className="font-medium text-slate-900">{formatCurrency(financialSummary.collectionTotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Expenses</span>
              <span className="font-medium text-slate-900">{formatCurrency(financialSummary.expenseTotal)}</span>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 text-right text-sm font-medium text-emerald-700">
              Net summary: {formatCurrency(financialSummary.netSummary)}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
