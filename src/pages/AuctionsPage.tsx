import { Badge } from '../components/Badge'
import { mockAuctions } from '../mock/data'
import { formatCurrency } from '../utils/currency'
import { formatDate } from '../utils/date'

export const AuctionsPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Auctions</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900">Auction management</h2>
      </div>
      <button type="button" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">Create auction</button>
    </div>

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {mockAuctions.map((auction) => (
        <div key={auction.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">{auction.groupId}</h3>
            <Badge label={auction.status} tone={auction.status === 'Completed' ? 'success' : auction.status === 'Open' ? 'warning' : 'info'} />
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between"><span>Auction date</span><span className="font-medium text-slate-900">{formatDate(auction.auctionDate)}</span></div>
            <div className="flex justify-between"><span>Month</span><span className="font-medium text-slate-900">{auction.month}</span></div>
            <div className="flex justify-between"><span>Eligible members</span><span className="font-medium text-slate-900">{auction.eligibleMembers}</span></div>
            <div className="flex justify-between"><span>Bids</span><span className="font-medium text-slate-900">{auction.bids}</span></div>
            <div className="flex justify-between"><span>Winning bid</span><span className="font-medium text-slate-900">{formatCurrency(auction.winningBid)}</span></div>
            <div className="flex justify-between"><span>Winner</span><span className="font-medium text-slate-900">{auction.winner}</span></div>
          </div>
        </div>
      ))}
    </div>
  </div>
)
