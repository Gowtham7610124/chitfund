import { mockAgents, mockAuctions, mockCustomers, mockInstallments, mockNotifications, mockPayments } from '../mock/data'
import type { DashboardMetric, NotificationItem } from '../types'
import { formatCurrency } from '../utils/currency'

export const getDashboardMetrics = (): DashboardMetric[] => {
  const customers = mockCustomers.length
  const activeGroups = 14
  const totalChitValue = mockCustomers.reduce((sum, customer) => sum + customer.totalChitValue, 0)
  const todaysCollection = mockPayments
    .filter((payment) => payment.paymentDate === '2024-05-21')
    .reduce((sum, payment) => sum + payment.amount, 0)
  const thisMonthCollection = mockPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const pendingCollection = mockInstallments.reduce((sum, item) => sum + item.outstanding, 0)
  const overdueAmount = mockInstallments
    .filter((item) => item.status === 'Overdue')
    .reduce((sum, item) => sum + item.outstanding, 0)

  return [
    { label: 'Total Customers', value: customers.toString(), change: '+12.4%', trend: 'up', description: 'Compared to last month' },
    { label: 'Active Chit Groups', value: activeGroups.toString(), change: '+6.1%', trend: 'up', description: 'Groups currently live' },
    { label: 'Total Chit Value', value: formatCurrency(totalChitValue), change: '+9.8%', trend: 'up', description: 'Total value across active customers' },
    { label: "Today's Collection", value: formatCurrency(todaysCollection), change: '+4.7%', trend: 'up', description: 'Collected today' },
    { label: "This Month's Collection", value: formatCurrency(thisMonthCollection), change: '+11.3%', trend: 'up', description: 'Current month collection' },
    { label: 'Pending Collection', value: formatCurrency(pendingCollection), change: '-2.9%', trend: 'down', description: 'Outstanding from members' },
    { label: 'Overdue Amount', value: formatCurrency(overdueAmount), change: '+1.2%', trend: 'up', description: 'Due and delayed' },
    { label: 'Active Collection Agents', value: mockAgents.filter((agent) => agent.status === 'Active').length.toString(), change: '+2', trend: 'up', description: 'Agents currently assigned' },
  ]
}

export const getRecentPayments = () => mockPayments.slice(0, 6)

export const getUpcomingAuctions = () => mockAuctions.slice(0, 4)

export const getPendingCollections = () => mockInstallments.filter((item) => item.status !== 'Paid').slice(0, 6)

export const getNotifications = (): NotificationItem[] => mockNotifications.slice(0, 5)
