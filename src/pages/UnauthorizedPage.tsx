export const UnauthorizedPage = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-10 text-center shadow-sm">
      <p className="text-sm uppercase tracking-[0.2em] text-amber-600">Access denied</p>
      <h2 className="mt-3 text-3xl font-semibold text-slate-900">You do not have permission</h2>
      <p className="mt-2 text-slate-600">This role cannot access the requested section in the current frontend prototype.</p>
    </div>
  </div>
)
