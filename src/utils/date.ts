export const formatDate = (value: string, options?: Intl.DateTimeFormatOptions): string =>
  new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...options,
  }).format(new Date(value))

export const formatShortDate = (value: string): string =>
  formatDate(value, { month: 'short', day: '2-digit' })
