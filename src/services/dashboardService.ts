import { mockAgents, mockAuctions, mockCustomers, mockGroups, mockInstallments, mockNotifications, mockPayments } from '../mock/data'
import type { DashboardMetric, NotificationItem } from '../types'
import { formatCurrency } from '../utils/currency'

const getLatestCollectionDate = () => {
  const paidDates = mockPayments
    .filter((payment) => payment.status === 'Success')
    .map((payment) => payment.paymentDate)

  return paidDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] ?? '2024-05-22'
}

const getGrowthPercent = (current: number, previous: number) => {
  if (!previous) return 0
  return Number((((current - previous) / previous) * 100).toFixed(1))
}

export const getDashboardMetrics = (): DashboardMetric[] => {
  const activeMembers = mockCustomers.filter((customer) => customer.status === 'Active').length
  const activeGroups = mockGroups.filter((group) => group.status === 'Active').length
  const activeChitValue = mockGroups
    .filter((group) => group.status === 'Active')
    .reduce((sum, group) => sum + group.totalValue, 0)

  const todaysCollectionDate = getLatestCollectionDate()
  const todaysCollection = mockPayments
    .filter((payment) => payment.status === 'Success' && payment.paymentDate === todaysCollectionDate)
    .reduce((sum, payment) => sum + payment.amount, 0)

  const thisMonthCollection = mockPayments
    .filter((payment) => payment.status === 'Success' && payment.paymentDate.startsWith('2024-05'))
    .reduce((sum, payment) => sum + payment.amount, 0)

  const previousMonthCollection = mockPayments
    .filter((payment) => payment.status === 'Success' && payment.paymentDate.startsWith('2024-04'))
    .reduce((sum, payment) => sum + payment.amount, 0)

  const pendingCollection = mockInstallments
    .filter((item) => item.status !== 'Paid')
    .reduce((sum, item) => sum + item.outstanding, 0)

  const overdueAmount = mockInstallments
    .filter((item) => item.status === 'Overdue')
    .reduce((sum, item) => sum + item.outstanding, 0)

  const totalMembersGrowth = getGrowthPercent(activeMembers, Math.max(16, activeMembers - 3))
  const activeGroupsGrowth = getGrowthPercent(activeGroups, Math.max(2, activeGroups - 1))
  const chitValueGrowth = getGrowthPercent(activeChitValue, Math.max(1500000, activeChitValue - 200000))
  const collectionGrowth = getGrowthPercent(thisMonthCollection, previousMonthCollection || 1)

  return [
    { label: 'Total Members', value: activeMembers.toString(), change: `${totalMembersGrowth >= 0 ? '+' : ''}${totalMembersGrowth}%`, trend: totalMembersGrowth >= 0 ? 'up' : 'down', description: 'Unique active members' },
    { label: 'Active Chit Groups', value: activeGroups.toString(), change: `${activeGroupsGrowth >= 0 ? '+' : ''}${activeGroupsGrowth}%`, trend: activeGroupsGrowth >= 0 ? 'up' : 'down', description: 'Ongoing groups only' },
    { label: 'Total Chit Value', value: formatCurrency(activeChitValue), change: `${chitValueGrowth >= 0 ? '+' : ''}${chitValueGrowth}%`, trend: chitValueGrowth >= 0 ? 'up' : 'down', description: 'Across active chit groups' },
    { label: "Today's Collection", value: formatCurrency(todaysCollection), change: `${collectionGrowth >= 0 ? '+' : ''}${collectionGrowth}%`, trend: collectionGrowth >= 0 ? 'up' : 'down', description: `Collected on ${todaysCollectionDate}` },
    { label: 'Pending Collection', value: formatCurrency(pendingCollection), change: '-2.9%', trend: 'down', description: 'Outstanding from members' },
    { label: 'Overdue Amount', value: formatCurrency(overdueAmount), change: '+1.2%', trend: 'up', description: 'Due and delayed' },
    { label: 'Active Collection Agents', value: mockAgents.filter((agent) => agent.status === 'Active').length.toString(), change: '+2', trend: 'up', description: 'Agents currently assigned' },
  ]
}

export const getCollectionSummary = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const summary = days.map((day, index) => {
    const targetDate = new Date('2024-05-20')
    targetDate.setDate(targetDate.getDate() + index - 3)
    const isoDate = targetDate.toISOString().slice(0, 10)
    const amount = mockPayments
      .filter((payment) => payment.status === 'Success' && payment.paymentDate === isoDate)
      .reduce((sum, payment) => sum + payment.amount, 0)

    return {
      day,
      amount,
      label: `${day} - ${formatCurrency(amount)}`,
    }
  })

  return summary
}

export const getCollectionAgentSummary = () => {
  const customerMap = new Map(mockCustomers.map((customer) => [customer.id, customer.assignedAgent]))
  const agentInfo = mockAgents
    .filter((agent) => agent.status === 'Active')
    .map((agent) => {
      const relatedCustomers = mockCustomers.filter((customer) => customer.assignedAgent === agent.id)
      const relatedInstallments = mockInstallments.filter((item) =>
        relatedCustomers.some((customer) => customer.id === item.customerId) && item.status !== 'Paid',
      )

      const carryForwardCount = relatedInstallments.length
      const carryForwardAmount = relatedInstallments.reduce((sum, item) => sum + item.outstanding, 0)

      return {
        name: agent.name,
        customers: relatedCustomers.length,
        monthlyCollection: agent.monthlyCollection,
        pendingCollection: agent.pendingCollection + carryForwardAmount,
        carryForwardCount,
        carryForwardAmount,
        performance: agent.performance,
      }
    })

  return agentInfo
}

export const getRecentPayments = () => mockPayments.slice(0, 6)

export const getUpcomingAuctions = () => mockAuctions.slice(0, 4)

export const getPendingCollections = () => mockInstallments.filter((item) => item.status !== 'Paid')

export const getNotifications = (): NotificationItem[] => mockNotifications.slice(0, 5)
