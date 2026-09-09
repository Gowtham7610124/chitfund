import { mockAgents, mockCustomers, mockGroups, mockPayments, mockSchemes } from '../mock/data'

export const getReportSummary = () => ({
  customers: mockCustomers.length,
  groups: mockGroups.length,
  schemes: mockSchemes.length,
  agents: mockAgents.length,
  collections: mockPayments.reduce((sum, payment) => sum + payment.amount, 0),
})

export const getOfficePerformance = () => [
  { office: 'Bengaluru Central', value: 2840000 },
  { office: 'Hyderabad North', value: 2610000 },
  { office: 'Chennai South', value: 2335000 },
  { office: 'Pune West', value: 1980000 },
]
