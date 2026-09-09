export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'OFFICE_MANAGER'
  | 'OFFICE_STAFF'
  | 'ACCOUNTANT'
  | 'COLLECTION_AGENT'

export type PaymentMethod = 'Cash' | 'UPI' | 'Bank Transfer' | 'Other'
export type KycStatus = 'Verified' | 'Pending' | 'Rejected'
export type CustomerStatus = 'Active' | 'Inactive' | 'Blacklisted'
export type InstallmentStatus = 'Paid' | 'Pending' | 'Partially Paid' | 'Overdue' | 'Waived'
export type GenericStatus = 'Open' | 'Completed' | 'Scheduled' | 'Pending' | 'Approved' | 'Active' | 'Draft'

export interface PermissionSet {
  canViewDashboard: boolean
  canManageCustomers: boolean
  canCreateCustomer: boolean
  canEditCustomer: boolean
  canDeleteCustomer: boolean
  canManageChits: boolean
  canManageCollections: boolean
  canCollectPayment: boolean
  canViewReports: boolean
  canManageAuctions: boolean
  canManageUsers: boolean
  canManageOffices: boolean
  canManageKyc: boolean
  canViewSettings: boolean
  canAccessAuditLogs: boolean
}

export interface AppUser {
  id: string
  name: string
  email: string
  username: string
  password: string
  role: UserRole
  officeId: string
  avatar: string
  permissions: PermissionSet
}

export interface Office {
  id: string
  name: string
  address: string
  contact: string
  manager: string
  status: 'Active' | 'Inactive'
}

export interface Staff {
  id: string
  name: string
  email: string
  role: string
  officeId: string
  permissions: string[]
  status: 'Active' | 'Inactive'
}

export interface CollectionAgent {
  id: string
  name: string
  mobile: string
  officeId: string
  assignedCustomers: number
  todaysCollection: number
  monthlyCollection: number
  pendingCollection: number
  performance: number
  status: 'Active' | 'Inactive'
}

export interface Customer {
  id: string
  memberNumber: string
  name: string
  mobile: string
  email: string
  dateOfBirth: string
  address: string
  nominee: string
  bankInfo: string
  kycStatus: KycStatus
  status: CustomerStatus
  assignedOffice: string
  assignedAgent: string
  createdDate: string
  totalChitValue: number
}

export interface ChitScheme {
  id: string
  name: string
  totalValue: number
  durationMonths: number
  members: number
  monthlyInstallment: number
  commissionConfig: string
  dividendConfig: string
  auctionConfig: string
  status: 'Active' | 'Draft' | 'Paused'
}

export interface ChitGroup {
  id: string
  schemeId: string
  officeId: string
  startDate: string
  endDate: string
  membersCount: number
  totalValue: number
  monthlyInstallment: number
  status: 'Active' | 'Completed' | 'Pending'
}

export interface ChitMember {
  id: string
  customerId: string
  groupId: string
  memberNumber: string
  enrolledDate: string
  status: 'Active' | 'Pending' | 'Exited'
}

export interface Installment {
  id: string
  customerId: string
  groupId: string
  installmentNumber: number
  dueDate: string
  amount: number
  paidAmount: number
  outstanding: number
  status: InstallmentStatus
}

export interface Payment {
  id: string
  customerId: string
  groupId: string
  installmentId: string
  amount: number
  paymentDate: string
  paymentMethod: PaymentMethod
  referenceNumber: string
  collectionAgent: string
  remarks: string
  status: 'Success' | 'Pending' | 'Failed'
}

export interface Auction {
  id: string
  groupId: string
  auctionDate: string
  month: string
  eligibleMembers: number
  bids: number
  winningBid: number
  winner: string
  prizeAmount: number
  dividend: number
  status: GenericStatus
}

export interface Bid {
  id: string
  auctionId: string
  memberId: string
  amount: number
  status: 'Submitted' | 'Winning' | 'Rejected'
}

export interface Payout {
  id: string
  customerId: string
  chitId: string
  auctionId: string
  winner: string
  prizeAmount: number
  deductions: number
  netPayout: number
  payoutStatus: 'Pending' | 'Completed' | 'Processing'
  payoutDate: string
  reference: string
}

export interface Receipt {
  id: string
  receiptNumber: string
  office: string
  customerId: string
  memberNumber: string
  chitGroup: string
  installmentNumber: number
  amount: number
  paymentMethod: PaymentMethod
  paymentDate: string
  collectedBy: string
  remarks: string
  status: 'Issued' | 'Draft' | 'Pending'
}

export interface KycDocument {
  id: string
  customerId: string
  type: 'Identity proof' | 'Address proof' | 'Photo' | 'Other'
  status: KycStatus
  submittedDate: string
  reference: string
}

export interface Expense {
  id: string
  date: string
  category: string
  amount: number
  office: string
  description: string
  paidBy: string
  reference: string
  status: 'Approved' | 'Pending' | 'Rejected'
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  type: 'Payment' | 'Overdue' | 'Auction' | 'KYC' | 'Payout' | 'System'
  createdAt: string
  read: boolean
}

export interface AuditLog {
  id: string
  dateTime: string
  user: string
  role: UserRole
  action: string
  module: string
  record: string
  description: string
}

export interface DashboardMetric {
  label: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  description: string
}

export interface SearchResult {
  id: string
  type: 'Customer' | 'Member' | 'Chit Group' | 'Receipt' | 'Payment' | 'Agent'
  title: string
  subtitle: string
  meta: string
}
