import { Download, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { mockReceipts } from '../mock/data'
import { formatCurrency } from '../utils/currency'
import { formatDate } from '../utils/date'

const buildCsv = (rows: Array<Record<string, string | number>>) => {
  const headers = Object.keys(rows[0] ?? {})
  const csvRows = [headers.join(',')]

  rows.forEach((row) => {
    csvRows.push(headers.map((header) => `"${String(row[header]).replace(/"/g, '""')}"`).join(','))
  })

  return csvRows.join('\n')
}

export const ReceiptsPage = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 6

  const filteredReceipts = useMemo(() => {
    const value = query.trim().toLowerCase()
    if (!value) return mockReceipts

    return mockReceipts.filter(
      (receipt) =>
        receipt.receiptNumber.toLowerCase().includes(value) ||
        receipt.customerId.toLowerCase().includes(value) ||
        receipt.chitGroup.toLowerCase().includes(value) ||
        receipt.status.toLowerCase().includes(value),
    )
  }, [query])

  const totalPages = Math.max(1, Math.ceil(filteredReceipts.length / pageSize))
  const visibleReceipts = filteredReceipts.slice((page - 1) * pageSize, page * pageSize)

  const handleExport = () => {
    const csv = buildCsv(filteredReceipts.map((receipt) => ({
      receipt: receipt.receiptNumber,
      customer: receipt.customerId,
      group: receipt.chitGroup,
      amount: receipt.amount,
      date: receipt.paymentDate,
      status: receipt.status,
    })))

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'chit-receipts.csv'
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const handlePrintReceipt = (receipt: (typeof mockReceipts)[number]) => {
    const printWindow = window.open('', '_blank', 'width=800,height=900')
    if (!printWindow) return

    printWindow.document.write(`
      <html>
        <head><title>${receipt.receiptNumber}</title></head>
        <body style="font-family:Arial;padding:32px;color:#111827;">
          <h2 style="margin-bottom:8px;">Chit Receipt</h2>
          <p><strong>Receipt:</strong> ${receipt.receiptNumber}</p>
          <p><strong>Customer:</strong> ${receipt.customerId}</p>
          <p><strong>Member:</strong> ${receipt.memberNumber}</p>
          <p><strong>Group:</strong> ${receipt.chitGroup}</p>
          <p><strong>Amount:</strong> ${formatCurrency(receipt.amount)}</p>
          <p><strong>Collected By:</strong> ${receipt.collectedBy}</p>
          <p><strong>Date:</strong> ${formatDate(receipt.paymentDate)}</p>
          <p><strong>Method:</strong> ${receipt.paymentMethod}</p>
          <p><strong>Status:</strong> ${receipt.status}</p>
          <button onClick="window.print()" style="margin-top:20px;padding:10px 14px;">Print / Save as PDF</button>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Receipts</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Receipt register</h2>
        </div>
        <button type="button" onClick={() => handlePrintReceipt(mockReceipts[0])} className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">Print receipt</button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="relative block max-w-md flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setPage(1)
              }}
              placeholder="Search party or receipt no"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-sky-400"
            />
          </label>
          <button type="button" onClick={handleExport} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Receipt</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Group</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleReceipts.map((receipt) => (
                <tr key={receipt.id} className="border-t border-slate-200">
                  <td className="px-5 py-4 font-medium text-slate-800">{receipt.receiptNumber}</td>
                  <td className="px-5 py-4 text-slate-700">{receipt.customerId}</td>
                  <td className="px-5 py-4 text-slate-700">{receipt.chitGroup}</td>
                  <td className="px-5 py-4 text-slate-700">{formatCurrency(receipt.amount)}</td>
                  <td className="px-5 py-4 text-slate-700">{formatDate(receipt.paymentDate)}</td>
                  <td className="px-5 py-4"><Badge label={receipt.status} tone={receipt.status === 'Issued' ? 'success' : 'neutral'} /></td>
                  <td className="px-5 py-4">
                    <button type="button" onClick={() => handlePrintReceipt(receipt)} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700">PDF</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <span className="text-sm text-slate-500">Showing {visibleReceipts.length} of {filteredReceipts.length} receipts</span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1} className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-50">Previous</button>
          <span className="text-sm font-medium text-slate-700">Page {page} / {totalPages}</span>
          <button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={page === totalPages} className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  )
}
