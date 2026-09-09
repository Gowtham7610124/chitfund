import type {
  AppUser,
  AuditLog,
  Auction,
  ChitGroup,
  ChitMember,
  ChitScheme,
  CollectionAgent,
  Customer,
  Expense,
  Installment,
  NotificationItem,
  Office,
  Payment,
  Payout,
  Receipt,
  Staff,
} from '../types'
import { ROLE_PERMISSIONS } from '../utils/permissions'

export const mockOffices: Office[] = [
  { id: 'OFF-01', name: 'Bengaluru Central', address: 'MG Road, Bengaluru', contact: '+91 98765 43210', manager: 'Shankar Rao', status: 'Active' },
  { id: 'OFF-02', name: 'Hyderabad North', address: 'Ameerpet, Hyderabad', contact: '+91 99887 66554', manager: 'Anitha Reddy', status: 'Active' },
  { id: 'OFF-03', name: 'Chennai South', address: 'T.Nagar, Chennai', contact: '+91 90909 12345', manager: 'Prakash Nair', status: 'Active' },
  { id: 'OFF-04', name: 'Pune West', address: 'Kalyani Nagar, Pune', contact: '+91 97654 33441', manager: 'Kiran Kale', status: 'Inactive' },
]

export const mockStaff: Staff[] = [
  { id: 'STF-001', name: 'Nisha Varma', email: 'nisha@chit.com', role: 'Office Manager', officeId: 'OFF-01', permissions: ['customers', 'payments', 'reports'], status: 'Active' },
  { id: 'STF-002', name: 'Rohan Mehta', email: 'rohan@chit.com', role: 'Office Staff', officeId: 'OFF-02', permissions: ['customers', 'receipts'], status: 'Active' },
  { id: 'STF-003', name: 'Kavya Nair', email: 'kavya@chit.com', role: 'Accountant', officeId: 'OFF-03', permissions: ['accounts', 'payments'], status: 'Active' },
  { id: 'STF-004', name: 'Hemanth Kumar', email: 'hemanth@chit.com', role: 'Senior Staff', officeId: 'OFF-01', permissions: ['customers', 'kyc'], status: 'Active' },
  { id: 'STF-005', name: 'Divya Iyer', email: 'divya@chit.com', role: 'Operations Analyst', officeId: 'OFF-02', permissions: ['reports', 'settings'], status: 'Inactive' },
]

export const mockAgents: CollectionAgent[] = [
  { id: 'AG-001', name: 'Vijay Reddy', mobile: '+91 90000 11111', officeId: 'OFF-01', assignedCustomers: 38, todaysCollection: 48250, monthlyCollection: 612500, pendingCollection: 16800, performance: 92, status: 'Active' },
  { id: 'AG-002', name: 'Arun Kumar', mobile: '+91 90000 22222', officeId: 'OFF-01', assignedCustomers: 26, todaysCollection: 39500, monthlyCollection: 504200, pendingCollection: 11950, performance: 89, status: 'Active' },
  { id: 'AG-003', name: 'Sneha Pillai', mobile: '+91 90000 33333', officeId: 'OFF-02', assignedCustomers: 42, todaysCollection: 52400, monthlyCollection: 647100, pendingCollection: 22120, performance: 94, status: 'Active' },
  { id: 'AG-004', name: 'Manoj Ghosh', mobile: '+91 90000 44444', officeId: 'OFF-02', assignedCustomers: 31, todaysCollection: 28600, monthlyCollection: 432400, pendingCollection: 15400, performance: 85, status: 'Active' },
  { id: 'AG-005', name: 'Latha Murugan', mobile: '+91 90000 55555', officeId: 'OFF-03', assignedCustomers: 35, todaysCollection: 41250, monthlyCollection: 538500, pendingCollection: 17650, performance: 91, status: 'Active' },
  { id: 'AG-006', name: 'Suresh Jain', mobile: '+91 90000 66666', officeId: 'OFF-03', assignedCustomers: 24, todaysCollection: 23200, monthlyCollection: 341600, pendingCollection: 12400, performance: 82, status: 'Inactive' },
  { id: 'AG-007', name: 'Bhavya Sharma', mobile: '+91 90000 77777', officeId: 'OFF-01', assignedCustomers: 29, todaysCollection: 34800, monthlyCollection: 489100, pendingCollection: 14680, performance: 88, status: 'Active' },
  { id: 'AG-008', name: 'Rajesh Patil', mobile: '+91 90000 88888', officeId: 'OFF-04', assignedCustomers: 18, todaysCollection: 18100, monthlyCollection: 265400, pendingCollection: 9600, performance: 74, status: 'Active' },
  { id: 'AG-009', name: 'Madhuri Das', mobile: '+91 90000 99999', officeId: 'OFF-02', assignedCustomers: 27, todaysCollection: 29950, monthlyCollection: 376500, pendingCollection: 11200, performance: 86, status: 'Active' },
  { id: 'AG-010', name: 'Pradeep Yadav', mobile: '+91 90001 01010', officeId: 'OFF-03', assignedCustomers: 20, todaysCollection: 21450, monthlyCollection: 295600, pendingCollection: 9880, performance: 79, status: 'Active' },
]

export const mockCustomers: Customer[] = [
  { id: 'CUST-001', memberNumber: 'MEM-1001', name: 'Asha Nair', mobile: '+91 98100 10001', email: 'asha.nair@example.com', dateOfBirth: '1990-04-12', address: 'Koramangala, Bengaluru', nominee: 'Ravi Nair', bankInfo: 'HDFC **** 8931', kycStatus: 'Verified', status: 'Active', assignedOffice: 'OFF-01', assignedAgent: 'AG-001', createdDate: '2024-01-18', totalChitValue: 450000 },
  { id: 'CUST-002', memberNumber: 'MEM-1002', name: 'Karthik Sekar', mobile: '+91 98100 10002', email: 'karthik.sekar@example.com', dateOfBirth: '1988-10-08', address: 'Anna Nagar, Chennai', nominee: 'Sundari Sekar', bankInfo: 'ICICI **** 8824', kycStatus: 'Verified', status: 'Active', assignedOffice: 'OFF-03', assignedAgent: 'AG-005', createdDate: '2024-02-10', totalChitValue: 625000 },
  { id: 'CUST-003', memberNumber: 'MEM-1003', name: 'Nandini Rao', mobile: '+91 98100 10003', email: 'nandini.rao@example.com', dateOfBirth: '1995-01-25', address: 'Madhapur, Hyderabad', nominee: 'Harish Rao', bankInfo: 'Axis **** 7765', kycStatus: 'Pending', status: 'Active', assignedOffice: 'OFF-02', assignedAgent: 'AG-003', createdDate: '2024-03-15', totalChitValue: 525000 },
  { id: 'CUST-004', memberNumber: 'MEM-1004', name: 'Nitin Joshi', mobile: '+91 98100 10004', email: 'nitin.joshi@example.com', dateOfBirth: '1986-07-14', address: 'Baner, Pune', nominee: 'Smita Joshi', bankInfo: 'SBI **** 2411', kycStatus: 'Verified', status: 'Active', assignedOffice: 'OFF-04', assignedAgent: 'AG-008', createdDate: '2024-01-27', totalChitValue: 700000 },
  { id: 'CUST-005', memberNumber: 'MEM-1005', name: 'Swathi Menon', mobile: '+91 98100 10005', email: 'swathi.menon@example.com', dateOfBirth: '1992-02-19', address: 'Indiranagar, Bengaluru', nominee: 'Nikhil Menon', bankInfo: 'Kotak **** 9907', kycStatus: 'Verified', status: 'Active', assignedOffice: 'OFF-01', assignedAgent: 'AG-002', createdDate: '2024-02-20', totalChitValue: 480000 },
  { id: 'CUST-006', memberNumber: 'MEM-1006', name: 'Rahul Bhatia', mobile: '+91 98100 10006', email: 'rahul.bhatia@example.com', dateOfBirth: '1989-09-03', address: 'Gachibowli, Hyderabad', nominee: 'Anjali Bhatia', bankInfo: 'HDFC **** 4418', kycStatus: 'Verified', status: 'Active', assignedOffice: 'OFF-02', assignedAgent: 'AG-004', createdDate: '2023-12-18', totalChitValue: 800000 },
  { id: 'CUST-007', memberNumber: 'MEM-1007', name: 'Preethi S', mobile: '+91 98100 10007', email: 'preethi.s@example.com', dateOfBirth: '1994-05-27', address: 'Velachery, Chennai', nominee: 'Raghav S', bankInfo: 'Canara **** 1179', kycStatus: 'Verified', status: 'Active', assignedOffice: 'OFF-03', assignedAgent: 'AG-010', createdDate: '2024-03-21', totalChitValue: 510000 },
  { id: 'CUST-008', memberNumber: 'MEM-1008', name: 'Sanjay Nair', mobile: '+91 98100 10008', email: 'sanjay.nair@example.com', dateOfBirth: '1987-12-11', address: 'Banjara Hills, Hyderabad', nominee: 'Vandana Nair', bankInfo: 'IDFC **** 3065', kycStatus: 'Verified', status: 'Inactive', assignedOffice: 'OFF-02', assignedAgent: 'AG-009', createdDate: '2023-11-14', totalChitValue: 920000 },
  { id: 'CUST-009', memberNumber: 'MEM-1009', name: 'Pooja Deshmukh', mobile: '+91 98100 10009', email: 'pooja.deshmukh@example.com', dateOfBirth: '1991-06-08', address: 'Shivajinagar, Pune', nominee: 'Ashok Deshmukh', bankInfo: 'Axis **** 2140', kycStatus: 'Pending', status: 'Active', assignedOffice: 'OFF-04', assignedAgent: 'AG-008', createdDate: '2024-04-02', totalChitValue: 560000 },
  { id: 'CUST-010', memberNumber: 'MEM-1010', name: 'Varun Iyer', mobile: '+91 98100 10010', email: 'varun.iyer@example.com', dateOfBirth: '1985-03-15', address: 'HSR Layout, Bengaluru', nominee: 'Anu Iyer', bankInfo: 'Yes Bank **** 5516', kycStatus: 'Verified', status: 'Active', assignedOffice: 'OFF-01', assignedAgent: 'AG-001', createdDate: '2024-02-13', totalChitValue: 635000 },
  { id: 'CUST-011', memberNumber: 'MEM-1011', name: 'Ananya Patil', mobile: '+91 98100 10011', email: 'ananya.patil@example.com', dateOfBirth: '1996-08-17', address: 'Wakad, Pune', nominee: 'Rohit Patil', bankInfo: 'SBI **** 3567', kycStatus: 'Rejected', status: 'Inactive', assignedOffice: 'OFF-04', assignedAgent: 'AG-008', createdDate: '2024-04-22', totalChitValue: 410000 },
  { id: 'CUST-012', memberNumber: 'MEM-1012', name: 'Mahesh R', mobile: '+91 98100 10012', email: 'mahesh.r@example.com', dateOfBirth: '1984-11-22', address: 'Tambaram, Chennai', nominee: 'Kavitha R', bankInfo: 'Federal **** 8942', kycStatus: 'Verified', status: 'Active', assignedOffice: 'OFF-03', assignedAgent: 'AG-006', createdDate: '2023-10-25', totalChitValue: 470000 },
  { id: 'CUST-013', memberNumber: 'MEM-1013', name: 'Harini Dutta', mobile: '+91 98100 10013', email: 'harini.dutta@example.com', dateOfBirth: '1993-07-21', address: 'Kondapur, Hyderabad', nominee: 'Amit Dutta', bankInfo: 'Bank of Baroda **** 6812', kycStatus: 'Verified', status: 'Active', assignedOffice: 'OFF-02', assignedAgent: 'AG-003', createdDate: '2024-01-09', totalChitValue: 690000 },
  { id: 'CUST-014', memberNumber: 'MEM-1014', name: 'Gaurav K', mobile: '+91 98100 10014', email: 'gaurav.k@example.com', dateOfBirth: '1988-04-05', address: 'JP Nagar, Bengaluru', nominee: 'Priya K', bankInfo: 'ICICI **** 3348', kycStatus: 'Pending', status: 'Active', assignedOffice: 'OFF-01', assignedAgent: 'AG-007', createdDate: '2024-05-11', totalChitValue: 540000 },
  { id: 'CUST-015', memberNumber: 'MEM-1015', name: 'Keerthana S', mobile: '+91 98100 10015', email: 'keerthana.s@example.com', dateOfBirth: '1990-12-30', address: 'Tiruvanmiyur, Chennai', nominee: 'Sathish S', bankInfo: 'HDFC **** 8745', kycStatus: 'Verified', status: 'Active', assignedOffice: 'OFF-03', assignedAgent: 'AG-005', createdDate: '2024-02-03', totalChitValue: 760000 },
  { id: 'CUST-016', memberNumber: 'MEM-1016', name: 'Rakesh Shah', mobile: '+91 98100 10016', email: 'rakesh.shah@example.com', dateOfBirth: '1987-05-20', address: 'Navi Mumbai, Mumbai', nominee: 'Neha Shah', bankInfo: 'PNB **** 6443', kycStatus: 'Verified', status: 'Active', assignedOffice: 'OFF-02', assignedAgent: 'AG-004', createdDate: '2023-09-13', totalChitValue: 830000 },
  { id: 'CUST-017', memberNumber: 'MEM-1017', name: 'Meera Thomas', mobile: '+91 98100 10017', email: 'meera.thomas@example.com', dateOfBirth: '1992-09-16', address: 'Whitefield, Bengaluru', nominee: 'George Thomas', bankInfo: 'Axis **** 7991', kycStatus: 'Verified', status: 'Active', assignedOffice: 'OFF-01', assignedAgent: 'AG-001', createdDate: '2024-03-28', totalChitValue: 610000 },
  { id: 'CUST-018', memberNumber: 'MEM-1018', name: 'Ajay Krishnan', mobile: '+91 98100 10018', email: 'ajay.krishnan@example.com', dateOfBirth: '1986-03-01', address: 'Mylapore, Chennai', nominee: 'Vimala Krishnan', bankInfo: 'Canara **** 5188', kycStatus: 'Pending', status: 'Active', assignedOffice: 'OFF-03', assignedAgent: 'AG-009', createdDate: '2024-04-10', totalChitValue: 480000 },
  { id: 'CUST-019', memberNumber: 'MEM-1019', name: 'Leena Mathew', mobile: '+91 98100 10019', email: 'leena.mathew@example.com', dateOfBirth: '1991-01-09', address: 'Viman Nagar, Pune', nominee: 'Joseph Mathew', bankInfo: 'SBI **** 4301', kycStatus: 'Verified', status: 'Active', assignedOffice: 'OFF-04', assignedAgent: 'AG-008', createdDate: '2024-03-11', totalChitValue: 570000 },
  { id: 'CUST-020', memberNumber: 'MEM-1020', name: 'Vikas Kumar', mobile: '+91 98100 10020', email: 'vikas.kumar@example.com', dateOfBirth: '1989-10-27', address: 'Secunderabad, Hyderabad', nominee: 'Sweta Kumar', bankInfo: 'Yes Bank **** 7772', kycStatus: 'Verified', status: 'Active', assignedOffice: 'OFF-02', assignedAgent: 'AG-002', createdDate: '2024-02-07', totalChitValue: 650000 },
]

export const mockSchemes: ChitScheme[] = [
  { id: 'SCH-01', name: 'Gold Saver Premium', totalValue: 500000, durationMonths: 12, members: 20, monthlyInstallment: 25000, commissionConfig: 'Placeholder config', dividendConfig: 'Placeholder config', auctionConfig: 'Placeholder config', status: 'Active' },
  { id: 'SCH-02', name: 'Vehicle Growth Plan', totalValue: 750000, durationMonths: 18, members: 20, monthlyInstallment: 37500, commissionConfig: 'Placeholder config', dividendConfig: 'Placeholder config', auctionConfig: 'Placeholder config', status: 'Active' },
  { id: 'SCH-03', name: 'Business Expansion Chit', totalValue: 1000000, durationMonths: 24, members: 25, monthlyInstallment: 40000, commissionConfig: 'Placeholder config', dividendConfig: 'Placeholder config', auctionConfig: 'Placeholder config', status: 'Draft' },
  { id: 'SCH-04', name: 'Home Builder Scheme', totalValue: 1200000, durationMonths: 24, members: 24, monthlyInstallment: 50000, commissionConfig: 'Placeholder config', dividendConfig: 'Placeholder config', auctionConfig: 'Placeholder config', status: 'Active' },
  { id: 'SCH-05', name: 'Family Finance Chit', totalValue: 900000, durationMonths: 15, members: 20, monthlyInstallment: 45000, commissionConfig: 'Placeholder config', dividendConfig: 'Placeholder config', auctionConfig: 'Placeholder config', status: 'Paused' },
]

export const mockGroups: ChitGroup[] = [
  { id: 'GRP-01', schemeId: 'SCH-01', officeId: 'OFF-01', startDate: '2024-01-10', endDate: '2025-01-10', membersCount: 20, totalValue: 500000, monthlyInstallment: 25000, status: 'Active' },
  { id: 'GRP-02', schemeId: 'SCH-02', officeId: 'OFF-02', startDate: '2024-02-05', endDate: '2025-08-05', membersCount: 20, totalValue: 750000, monthlyInstallment: 37500, status: 'Active' },
  { id: 'GRP-03', schemeId: 'SCH-03', officeId: 'OFF-03', startDate: '2024-03-20', endDate: '2026-03-20', membersCount: 25, totalValue: 1000000, monthlyInstallment: 40000, status: 'Pending' },
  { id: 'GRP-04', schemeId: 'SCH-04', officeId: 'OFF-01', startDate: '2023-11-14', endDate: '2025-11-14', membersCount: 24, totalValue: 1200000, monthlyInstallment: 50000, status: 'Active' },
  { id: 'GRP-05', schemeId: 'SCH-05', officeId: 'OFF-04', startDate: '2024-04-01', endDate: '2025-07-01', membersCount: 20, totalValue: 900000, monthlyInstallment: 45000, status: 'Completed' },
]

export const mockMembers: ChitMember[] = [
  { id: 'MEM-01', customerId: 'CUST-001', groupId: 'GRP-01', memberNumber: 'MEM-1001', enrolledDate: '2024-01-18', status: 'Active' },
  { id: 'MEM-02', customerId: 'CUST-002', groupId: 'GRP-03', memberNumber: 'MEM-1002', enrolledDate: '2024-02-10', status: 'Active' },
  { id: 'MEM-03', customerId: 'CUST-003', groupId: 'GRP-02', memberNumber: 'MEM-1003', enrolledDate: '2024-03-15', status: 'Pending' },
  { id: 'MEM-04', customerId: 'CUST-004', groupId: 'GRP-04', memberNumber: 'MEM-1004', enrolledDate: '2024-01-27', status: 'Active' },
  { id: 'MEM-05', customerId: 'CUST-005', groupId: 'GRP-01', memberNumber: 'MEM-1005', enrolledDate: '2024-02-20', status: 'Active' },
  { id: 'MEM-06', customerId: 'CUST-006', groupId: 'GRP-02', memberNumber: 'MEM-1006', enrolledDate: '2023-12-18', status: 'Active' },
  { id: 'MEM-07', customerId: 'CUST-007', groupId: 'GRP-03', memberNumber: 'MEM-1007', enrolledDate: '2024-03-21', status: 'Active' },
  { id: 'MEM-08', customerId: 'CUST-010', groupId: 'GRP-01', memberNumber: 'MEM-1010', enrolledDate: '2024-02-13', status: 'Active' },
  { id: 'MEM-09', customerId: 'CUST-013', groupId: 'GRP-02', memberNumber: 'MEM-1013', enrolledDate: '2024-01-09', status: 'Active' },
  { id: 'MEM-10', customerId: 'CUST-020', groupId: 'GRP-02', memberNumber: 'MEM-1020', enrolledDate: '2024-02-07', status: 'Active' },
]

export const mockInstallments: Installment[] = [
  { id: 'INS-001', customerId: 'CUST-001', groupId: 'GRP-01', installmentNumber: 1, dueDate: '2024-02-10', amount: 25000, paidAmount: 25000, outstanding: 0, status: 'Paid' },
  { id: 'INS-002', customerId: 'CUST-001', groupId: 'GRP-01', installmentNumber: 2, dueDate: '2024-03-10', amount: 25000, paidAmount: 25000, outstanding: 0, status: 'Paid' },
  { id: 'INS-003', customerId: 'CUST-001', groupId: 'GRP-01', installmentNumber: 3, dueDate: '2024-04-10', amount: 25000, paidAmount: 15000, outstanding: 10000, status: 'Partially Paid' },
  { id: 'INS-004', customerId: 'CUST-005', groupId: 'GRP-01', installmentNumber: 1, dueDate: '2024-02-20', amount: 25000, paidAmount: 25000, outstanding: 0, status: 'Paid' },
  { id: 'INS-005', customerId: 'CUST-005', groupId: 'GRP-01', installmentNumber: 2, dueDate: '2024-03-20', amount: 25000, paidAmount: 5000, outstanding: 20000, status: 'Pending' },
  { id: 'INS-006', customerId: 'CUST-010', groupId: 'GRP-01', installmentNumber: 1, dueDate: '2024-03-13', amount: 25000, paidAmount: 25000, outstanding: 0, status: 'Paid' },
  { id: 'INS-007', customerId: 'CUST-010', groupId: 'GRP-01', installmentNumber: 2, dueDate: '2024-04-13', amount: 25000, paidAmount: 0, outstanding: 25000, status: 'Pending' },
  { id: 'INS-008', customerId: 'CUST-002', groupId: 'GRP-03', installmentNumber: 1, dueDate: '2024-03-10', amount: 40000, paidAmount: 40000, outstanding: 0, status: 'Paid' },
  { id: 'INS-009', customerId: 'CUST-002', groupId: 'GRP-03', installmentNumber: 2, dueDate: '2024-04-10', amount: 40000, paidAmount: 40000, outstanding: 0, status: 'Paid' },
  { id: 'INS-010', customerId: 'CUST-002', groupId: 'GRP-03', installmentNumber: 3, dueDate: '2024-05-10', amount: 40000, paidAmount: 20000, outstanding: 20000, status: 'Partially Paid' },
  { id: 'INS-011', customerId: 'CUST-006', groupId: 'GRP-02', installmentNumber: 1, dueDate: '2024-03-05', amount: 37500, paidAmount: 37500, outstanding: 0, status: 'Paid' },
  { id: 'INS-012', customerId: 'CUST-006', groupId: 'GRP-02', installmentNumber: 2, dueDate: '2024-04-05', amount: 37500, paidAmount: 37500, outstanding: 0, status: 'Paid' },
  { id: 'INS-013', customerId: 'CUST-006', groupId: 'GRP-02', installmentNumber: 3, dueDate: '2024-05-05', amount: 37500, paidAmount: 10000, outstanding: 27500, status: 'Overdue' },
  { id: 'INS-014', customerId: 'CUST-016', groupId: 'GRP-02', installmentNumber: 1, dueDate: '2024-04-01', amount: 37500, paidAmount: 37500, outstanding: 0, status: 'Paid' },
  { id: 'INS-015', customerId: 'CUST-016', groupId: 'GRP-02', installmentNumber: 2, dueDate: '2024-05-01', amount: 37500, paidAmount: 0, outstanding: 37500, status: 'Pending' },
  { id: 'INS-016', customerId: 'CUST-013', groupId: 'GRP-02', installmentNumber: 1, dueDate: '2024-02-09', amount: 37500, paidAmount: 37500, outstanding: 0, status: 'Paid' },
  { id: 'INS-017', customerId: 'CUST-013', groupId: 'GRP-02', installmentNumber: 2, dueDate: '2024-03-09', amount: 37500, paidAmount: 37500, outstanding: 0, status: 'Paid' },
  { id: 'INS-018', customerId: 'CUST-013', groupId: 'GRP-02', installmentNumber: 3, dueDate: '2024-04-09', amount: 37500, paidAmount: 32500, outstanding: 5000, status: 'Partially Paid' },
  { id: 'INS-019', customerId: 'CUST-004', groupId: 'GRP-04', installmentNumber: 1, dueDate: '2023-12-14', amount: 50000, paidAmount: 50000, outstanding: 0, status: 'Paid' },
  { id: 'INS-020', customerId: 'CUST-004', groupId: 'GRP-04', installmentNumber: 2, dueDate: '2024-01-14', amount: 50000, paidAmount: 50000, outstanding: 0, status: 'Paid' },
  { id: 'INS-021', customerId: 'CUST-004', groupId: 'GRP-04', installmentNumber: 3, dueDate: '2024-02-14', amount: 50000, paidAmount: 35000, outstanding: 15000, status: 'Partially Paid' },
  { id: 'INS-022', customerId: 'CUST-009', groupId: 'GRP-04', installmentNumber: 1, dueDate: '2024-05-02', amount: 50000, paidAmount: 0, outstanding: 50000, status: 'Pending' },
  { id: 'INS-023', customerId: 'CUST-012', groupId: 'GRP-03', installmentNumber: 1, dueDate: '2024-04-25', amount: 40000, paidAmount: 40000, outstanding: 0, status: 'Paid' },
  { id: 'INS-024', customerId: 'CUST-012', groupId: 'GRP-03', installmentNumber: 2, dueDate: '2024-05-25', amount: 40000, paidAmount: 0, outstanding: 40000, status: 'Pending' },
  { id: 'INS-025', customerId: 'CUST-017', groupId: 'GRP-01', installmentNumber: 1, dueDate: '2024-04-18', amount: 25000, paidAmount: 25000, outstanding: 0, status: 'Paid' },
  { id: 'INS-026', customerId: 'CUST-017', groupId: 'GRP-01', installmentNumber: 2, dueDate: '2024-05-18', amount: 25000, paidAmount: 15000, outstanding: 10000, status: 'Partially Paid' },
  { id: 'INS-027', customerId: 'CUST-018', groupId: 'GRP-03', installmentNumber: 1, dueDate: '2024-05-10', amount: 40000, paidAmount: 15000, outstanding: 25000, status: 'Overdue' },
  { id: 'INS-028', customerId: 'CUST-019', groupId: 'GRP-04', installmentNumber: 1, dueDate: '2024-05-11', amount: 50000, paidAmount: 50000, outstanding: 0, status: 'Paid' },
  { id: 'INS-029', customerId: 'CUST-020', groupId: 'GRP-02', installmentNumber: 1, dueDate: '2024-03-07', amount: 37500, paidAmount: 37500, outstanding: 0, status: 'Paid' },
  { id: 'INS-030', customerId: 'CUST-020', groupId: 'GRP-02', installmentNumber: 2, dueDate: '2024-04-07', amount: 37500, paidAmount: 0, outstanding: 37500, status: 'Pending' },
]

export const mockPayments: Payment[] = [
  { id: 'PAY-001', customerId: 'CUST-001', groupId: 'GRP-01', installmentId: 'INS-001', amount: 25000, paymentDate: '2024-02-10', paymentMethod: 'UPI', referenceNumber: 'UPI-0001', collectionAgent: 'Vijay Reddy', remarks: 'Receipt generated', status: 'Success' },
  { id: 'PAY-002', customerId: 'CUST-001', groupId: 'GRP-01', installmentId: 'INS-002', amount: 25000, paymentDate: '2024-03-10', paymentMethod: 'Cash', referenceNumber: 'CASH-0120', collectionAgent: 'Vijay Reddy', remarks: 'Instant collection', status: 'Success' },
  { id: 'PAY-003', customerId: 'CUST-005', groupId: 'GRP-01', installmentId: 'INS-004', amount: 25000, paymentDate: '2024-02-20', paymentMethod: 'Bank Transfer', referenceNumber: 'BT-7752', collectionAgent: 'Arun Kumar', remarks: 'Bank transfer', status: 'Success' },
  { id: 'PAY-004', customerId: 'CUST-006', groupId: 'GRP-02', installmentId: 'INS-011', amount: 37500, paymentDate: '2024-03-05', paymentMethod: 'UPI', referenceNumber: 'UPI-0137', collectionAgent: 'Manoj Ghosh', remarks: 'Auto reconciled', status: 'Success' },
  { id: 'PAY-005', customerId: 'CUST-010', groupId: 'GRP-01', installmentId: 'INS-006', amount: 25000, paymentDate: '2024-03-13', paymentMethod: 'Cash', referenceNumber: 'CASH-0891', collectionAgent: 'Vijay Reddy', remarks: 'Collected in office', status: 'Success' },
  { id: 'PAY-006', customerId: 'CUST-013', groupId: 'GRP-02', installmentId: 'INS-016', amount: 37500, paymentDate: '2024-02-09', paymentMethod: 'UPI', referenceNumber: 'UPI-7710', collectionAgent: 'Latha Murugan', remarks: 'Mobile payment', status: 'Success' },
  { id: 'PAY-007', customerId: 'CUST-017', groupId: 'GRP-01', installmentId: 'INS-025', amount: 25000, paymentDate: '2024-04-18', paymentMethod: 'Cash', referenceNumber: 'CASH-5531', collectionAgent: 'Bhavya Sharma', remarks: 'Office payment', status: 'Success' },
  { id: 'PAY-008', customerId: 'CUST-019', groupId: 'GRP-04', installmentId: 'INS-028', amount: 50000, paymentDate: '2024-05-11', paymentMethod: 'Bank Transfer', referenceNumber: 'BT-6179', collectionAgent: 'Rajesh Patil', remarks: 'NEFT', status: 'Success' },
  { id: 'PAY-009', customerId: 'CUST-004', groupId: 'GRP-04', installmentId: 'INS-019', amount: 50000, paymentDate: '2023-12-14', paymentMethod: 'Cash', referenceNumber: 'CASH-9984', collectionAgent: 'Rajesh Patil', remarks: 'On time', status: 'Success' },
  { id: 'PAY-010', customerId: 'CUST-004', groupId: 'GRP-04', installmentId: 'INS-020', amount: 50000, paymentDate: '2024-01-14', paymentMethod: 'UPI', referenceNumber: 'UPI-4530', collectionAgent: 'Rajesh Patil', remarks: 'UPI', status: 'Success' },
  { id: 'PAY-011', customerId: 'CUST-002', groupId: 'GRP-03', installmentId: 'INS-008', amount: 40000, paymentDate: '2024-03-10', paymentMethod: 'Bank Transfer', referenceNumber: 'BT-2100', collectionAgent: 'Sneha Pillai', remarks: 'Bank transfer', status: 'Success' },
  { id: 'PAY-012', customerId: 'CUST-002', groupId: 'GRP-03', installmentId: 'INS-009', amount: 40000, paymentDate: '2024-04-10', paymentMethod: 'UPI', referenceNumber: 'UPI-2107', collectionAgent: 'Sneha Pillai', remarks: 'Collected at doorstep', status: 'Success' },
  { id: 'PAY-013', customerId: 'CUST-012', groupId: 'GRP-03', installmentId: 'INS-023', amount: 40000, paymentDate: '2024-04-25', paymentMethod: 'Cash', referenceNumber: 'CASH-1224', collectionAgent: 'Suresh Jain', remarks: 'Cash', status: 'Success' },
  { id: 'PAY-014', customerId: 'CUST-016', groupId: 'GRP-02', installmentId: 'INS-014', amount: 37500, paymentDate: '2024-04-01', paymentMethod: 'UPI', referenceNumber: 'UPI-1789', collectionAgent: 'Manoj Ghosh', remarks: 'Online payment', status: 'Success' },
  { id: 'PAY-015', customerId: 'CUST-016', groupId: 'GRP-02', installmentId: 'INS-014', amount: 37500, paymentDate: '2024-04-02', paymentMethod: 'Bank Transfer', referenceNumber: 'BT-1900', collectionAgent: 'Manoj Ghosh', remarks: 'Second attempt', status: 'Success' },
  { id: 'PAY-016', customerId: 'CUST-018', groupId: 'GRP-03', installmentId: 'INS-027', amount: 15000, paymentDate: '2024-05-06', paymentMethod: 'Cash', referenceNumber: 'CASH-0911', collectionAgent: 'Madhuri Das', remarks: 'Partial collection', status: 'Success' },
  { id: 'PAY-017', customerId: 'CUST-020', groupId: 'GRP-02', installmentId: 'INS-029', amount: 37500, paymentDate: '2024-03-07', paymentMethod: 'UPI', referenceNumber: 'UPI-4132', collectionAgent: 'Arun Kumar', remarks: 'Auto paid', status: 'Success' },
  { id: 'PAY-018', customerId: 'CUST-009', groupId: 'GRP-04', installmentId: 'INS-022', amount: 50000, paymentDate: '2024-05-02', paymentMethod: 'UPI', referenceNumber: 'UPI-7791', collectionAgent: 'Rajesh Patil', remarks: 'Pending verification', status: 'Pending' },
  { id: 'PAY-019', customerId: 'CUST-007', groupId: 'GRP-03', installmentId: 'INS-000', amount: 20000, paymentDate: '2024-05-12', paymentMethod: 'Other', referenceNumber: 'OTH-8911', collectionAgent: 'Sneha Pillai', remarks: 'Manual adjustment', status: 'Success' },
  { id: 'PAY-020', customerId: 'CUST-011', groupId: 'GRP-04', installmentId: 'INS-000', amount: 15000, paymentDate: '2024-05-04', paymentMethod: 'Cash', referenceNumber: 'CASH-1908', collectionAgent: 'Rajesh Patil', remarks: 'Customer follow-up', status: 'Failed' },
  { id: 'PAY-021', customerId: 'CUST-003', groupId: 'GRP-02', installmentId: 'INS-000', amount: 25000, paymentDate: '2024-05-13', paymentMethod: 'Bank Transfer', referenceNumber: 'BT-7822', collectionAgent: 'Madhuri Das', remarks: 'Recent payment', status: 'Success' },
  { id: 'PAY-022', customerId: 'CUST-014', groupId: 'GRP-01', installmentId: 'INS-000', amount: 20000, paymentDate: '2024-05-16', paymentMethod: 'UPI', referenceNumber: 'UPI-9004', collectionAgent: 'Bhavya Sharma', remarks: 'Collected during field visit', status: 'Success' },
  { id: 'PAY-023', customerId: 'CUST-015', groupId: 'GRP-03', installmentId: 'INS-000', amount: 35000, paymentDate: '2024-05-15', paymentMethod: 'UPI', referenceNumber: 'UPI-8240', collectionAgent: 'Latha Murugan', remarks: 'Prompt collection', status: 'Success' },
  { id: 'PAY-024', customerId: 'CUST-006', groupId: 'GRP-02', installmentId: 'INS-013', amount: 10000, paymentDate: '2024-05-18', paymentMethod: 'Cash', referenceNumber: 'CASH-2221', collectionAgent: 'Manoj Ghosh', remarks: 'Partial payment', status: 'Success' },
  { id: 'PAY-025', customerId: 'CUST-017', groupId: 'GRP-01', installmentId: 'INS-026', amount: 15000, paymentDate: '2024-05-18', paymentMethod: 'Bank Transfer', referenceNumber: 'BT-4081', collectionAgent: 'Bhavya Sharma', remarks: 'Customer confirmed', status: 'Success' },
  { id: 'PAY-026', customerId: 'CUST-005', groupId: 'GRP-01', installmentId: 'INS-005', amount: 5000, paymentDate: '2024-05-17', paymentMethod: 'Cash', referenceNumber: 'CASH-6070', collectionAgent: 'Arun Kumar', remarks: 'Initial partial payment', status: 'Success' },
  { id: 'PAY-027', customerId: 'CUST-001', groupId: 'GRP-01', installmentId: 'INS-003', amount: 10000, paymentDate: '2024-05-20', paymentMethod: 'UPI', referenceNumber: 'UPI-1445', collectionAgent: 'Vijay Reddy', remarks: 'Balancing payment', status: 'Success' },
  { id: 'PAY-028', customerId: 'CUST-010', groupId: 'GRP-01', installmentId: 'INS-007', amount: 25000, paymentDate: '2024-05-21', paymentMethod: 'Cash', referenceNumber: 'CASH-3005', collectionAgent: 'Vijay Reddy', remarks: 'Follow-up', status: 'Pending' },
  { id: 'PAY-029', customerId: 'CUST-020', groupId: 'GRP-02', installmentId: 'INS-030', amount: 37500, paymentDate: '2024-05-21', paymentMethod: 'UPI', referenceNumber: 'UPI-4005', collectionAgent: 'Arun Kumar', remarks: 'Attempted collection', status: 'Pending' },
  { id: 'PAY-030', customerId: 'CUST-018', groupId: 'GRP-03', installmentId: 'INS-027', amount: 25000, paymentDate: '2024-05-22', paymentMethod: 'Bank Transfer', referenceNumber: 'BT-9930', collectionAgent: 'Madhuri Das', remarks: 'Partial payment update', status: 'Success' },
]

export const mockAuctions: Auction[] = [
  { id: 'AUC-001', groupId: 'GRP-01', auctionDate: '2024-06-15', month: 'June', eligibleMembers: 20, bids: 8, winningBid: 425000, winner: 'Asha Nair', prizeAmount: 425000, dividend: 17500, status: 'Scheduled' },
  { id: 'AUC-002', groupId: 'GRP-02', auctionDate: '2024-06-20', month: 'June', eligibleMembers: 20, bids: 10, winningBid: 610000, winner: 'Rahul Bhatia', prizeAmount: 610000, dividend: 26000, status: 'Scheduled' },
  { id: 'AUC-003', groupId: 'GRP-03', auctionDate: '2024-07-10', month: 'July', eligibleMembers: 25, bids: 7, winningBid: 815000, winner: 'Karthik Sekar', prizeAmount: 815000, dividend: 33000, status: 'Open' },
  { id: 'AUC-004', groupId: 'GRP-04', auctionDate: '2024-05-18', month: 'May', eligibleMembers: 24, bids: 9, winningBid: 900000, winner: 'Nitin Joshi', prizeAmount: 900000, dividend: 35000, status: 'Completed' },
  { id: 'AUC-005', groupId: 'GRP-05', auctionDate: '2024-04-12', month: 'April', eligibleMembers: 20, bids: 6, winningBid: 715000, winner: 'Sanjay Nair', prizeAmount: 715000, dividend: 28000, status: 'Completed' },
  { id: 'AUC-006', groupId: 'GRP-01', auctionDate: '2024-07-15', month: 'July', eligibleMembers: 20, bids: 11, winningBid: 440000, winner: 'Varun Iyer', prizeAmount: 440000, dividend: 19000, status: 'Scheduled' },
  { id: 'AUC-007', groupId: 'GRP-02', auctionDate: '2024-08-19', month: 'August', eligibleMembers: 20, bids: 7, winningBid: 620000, winner: 'Harini Dutta', prizeAmount: 620000, dividend: 27000, status: 'Scheduled' },
  { id: 'AUC-008', groupId: 'GRP-03', auctionDate: '2024-08-10', month: 'August', eligibleMembers: 25, bids: 12, winningBid: 840000, winner: 'Mahesh R', prizeAmount: 840000, dividend: 32000, status: 'Scheduled' },
  { id: 'AUC-009', groupId: 'GRP-04', auctionDate: '2024-09-12', month: 'September', eligibleMembers: 24, bids: 9, winningBid: 960000, winner: 'Leena Mathew', prizeAmount: 960000, dividend: 42000, status: 'Open' },
  { id: 'AUC-010', groupId: 'GRP-05', auctionDate: '2024-05-28', month: 'May', eligibleMembers: 20, bids: 8, winningBid: 820000, winner: 'Meera Thomas', prizeAmount: 820000, dividend: 31000, status: 'Completed' },
]

export const mockReceipts: Receipt[] = [
  { id: 'REC-001', receiptNumber: 'RCP-1001', office: 'Bengaluru Central', customerId: 'CUST-001', memberNumber: 'MEM-1001', chitGroup: 'GRP-01', installmentNumber: 1, amount: 25000, paymentMethod: 'UPI', paymentDate: '2024-02-10', collectedBy: 'Vijay Reddy', remarks: 'Auto generated', status: 'Issued' },
  { id: 'REC-002', receiptNumber: 'RCP-1002', office: 'Bengaluru Central', customerId: 'CUST-005', memberNumber: 'MEM-1005', chitGroup: 'GRP-01', installmentNumber: 1, amount: 25000, paymentMethod: 'Bank Transfer', paymentDate: '2024-02-20', collectedBy: 'Arun Kumar', remarks: 'Bank transfer', status: 'Issued' },
  { id: 'REC-003', receiptNumber: 'RCP-1003', office: 'Hyderabad North', customerId: 'CUST-006', memberNumber: 'MEM-1006', chitGroup: 'GRP-02', installmentNumber: 1, amount: 37500, paymentMethod: 'UPI', paymentDate: '2024-03-05', collectedBy: 'Manoj Ghosh', remarks: 'Mobile payment', status: 'Issued' },
  { id: 'REC-004', receiptNumber: 'RCP-1004', office: 'Chennai South', customerId: 'CUST-013', memberNumber: 'MEM-1013', chitGroup: 'GRP-02', installmentNumber: 1, amount: 37500, paymentMethod: 'UPI', paymentDate: '2024-02-09', collectedBy: 'Latha Murugan', remarks: 'Collected via app', status: 'Issued' },
  { id: 'REC-005', receiptNumber: 'RCP-1005', office: 'Pune West', customerId: 'CUST-019', memberNumber: 'MEM-1019', chitGroup: 'GRP-04', installmentNumber: 1, amount: 50000, paymentMethod: 'Bank Transfer', paymentDate: '2024-05-11', collectedBy: 'Rajesh Patil', remarks: 'NEFT', status: 'Issued' },
  { id: 'REC-006', receiptNumber: 'RCP-1006', office: 'Hyderabad North', customerId: 'CUST-020', memberNumber: 'MEM-1020', chitGroup: 'GRP-02', installmentNumber: 1, amount: 37500, paymentMethod: 'UPI', paymentDate: '2024-03-07', collectedBy: 'Arun Kumar', remarks: 'Online payment', status: 'Issued' },
  { id: 'REC-007', receiptNumber: 'RCP-1007', office: 'Pune West', customerId: 'CUST-004', memberNumber: 'MEM-1004', chitGroup: 'GRP-04', installmentNumber: 1, amount: 50000, paymentMethod: 'Cash', paymentDate: '2023-12-14', collectedBy: 'Rajesh Patil', remarks: 'Office counter', status: 'Issued' },
  { id: 'REC-008', receiptNumber: 'RCP-1008', office: 'Chennai South', customerId: 'CUST-002', memberNumber: 'MEM-1002', chitGroup: 'GRP-03', installmentNumber: 1, amount: 40000, paymentMethod: 'Bank Transfer', paymentDate: '2024-03-10', collectedBy: 'Sneha Pillai', remarks: 'Bank transfer', status: 'Issued' },
  { id: 'REC-009', receiptNumber: 'RCP-1009', office: 'Bengaluru Central', customerId: 'CUST-010', memberNumber: 'MEM-1010', chitGroup: 'GRP-01', installmentNumber: 1, amount: 25000, paymentMethod: 'Cash', paymentDate: '2024-03-13', collectedBy: 'Vijay Reddy', remarks: 'Cash note recorded', status: 'Draft' },
  { id: 'REC-010', receiptNumber: 'RCP-1010', office: 'Chennai South', customerId: 'CUST-015', memberNumber: 'MEM-1015', chitGroup: 'GRP-03', installmentNumber: 1, amount: 40000, paymentMethod: 'UPI', paymentDate: '2024-05-15', collectedBy: 'Latha Murugan', remarks: 'Prompt payment', status: 'Issued' },
]

export const mockPayouts: Payout[] = [
  { id: 'PAYOUT-001', customerId: 'CUST-004', chitId: 'GRP-04', auctionId: 'AUC-004', winner: 'Nitin Joshi', prizeAmount: 900000, deductions: 15000, netPayout: 885000, payoutStatus: 'Completed', payoutDate: '2024-05-20', reference: 'PAYOUT-0001' },
  { id: 'PAYOUT-002', customerId: 'CUST-005', chitId: 'GRP-01', auctionId: 'AUC-001', winner: 'Asha Nair', prizeAmount: 425000, deductions: 12000, netPayout: 413000, payoutStatus: 'Pending', payoutDate: '2024-06-15', reference: 'PAYOUT-0002' },
  { id: 'PAYOUT-003', customerId: 'CUST-006', chitId: 'GRP-02', auctionId: 'AUC-002', winner: 'Rahul Bhatia', prizeAmount: 610000, deductions: 18500, netPayout: 591500, payoutStatus: 'Processing', payoutDate: '2024-06-20', reference: 'PAYOUT-0003' },
  { id: 'PAYOUT-004', customerId: 'CUST-010', chitId: 'GRP-01', auctionId: 'AUC-006', winner: 'Varun Iyer', prizeAmount: 440000, deductions: 13000, netPayout: 427000, payoutStatus: 'Pending', payoutDate: '2024-07-15', reference: 'PAYOUT-0004' },
  { id: 'PAYOUT-005', customerId: 'CUST-020', chitId: 'GRP-05', auctionId: 'AUC-010', winner: 'Meera Thomas', prizeAmount: 820000, deductions: 21000, netPayout: 799000, payoutStatus: 'Completed', payoutDate: '2024-05-28', reference: 'PAYOUT-0005' },
]

export const mockExpenses: Expense[] = [
  { id: 'EXP-001', date: '2024-05-02', category: 'Office Rent', amount: 120000, office: 'Bengaluru Central', description: 'Monthly office rent', paidBy: 'Nisha Varma', reference: 'REF-REN-001', status: 'Approved' },
  { id: 'EXP-002', date: '2024-05-04', category: 'Travel', amount: 18500, office: 'Hyderabad North', description: 'Agent field visit', paidBy: 'Rohan Mehta', reference: 'REF-TRV-021', status: 'Pending' },
  { id: 'EXP-003', date: '2024-05-12', category: 'Utilities', amount: 8200, office: 'Chennai South', description: 'Electricity and water', paidBy: 'Kavya Nair', reference: 'REF-UTL-110', status: 'Approved' },
  { id: 'EXP-004', date: '2024-05-19', category: 'Marketing', amount: 26000, office: 'Pune West', description: 'Customer acquisition campaign', paidBy: 'Divya Iyer', reference: 'REF-MKT-049', status: 'Pending' },
  { id: 'EXP-005', date: '2024-05-22', category: 'Software', amount: 15000, office: 'Bengaluru Central', description: 'Subscription renewal', paidBy: 'Hemanth Kumar', reference: 'REF-SFT-883', status: 'Approved' },
]

export const mockNotifications: NotificationItem[] = [
  { id: 'NOT-001', title: 'Payment received', message: 'Asha Nair paid installment for GRP-01', type: 'Payment', createdAt: '2024-05-20T10:00:00', read: false },
  { id: 'NOT-002', title: 'Installment overdue', message: 'CUST-020 installment due for GRP-02', type: 'Overdue', createdAt: '2024-05-19T09:30:00', read: false },
  { id: 'NOT-003', title: 'Upcoming auction', message: 'Auction scheduled for GRP-02 on 2024-06-20', type: 'Auction', createdAt: '2024-05-18T17:10:00', read: true },
  { id: 'NOT-004', title: 'KYC pending', message: 'Nandini Rao has a pending KYC document review', type: 'KYC', createdAt: '2024-05-17T11:20:00', read: false },
  { id: 'NOT-005', title: 'Payout pending', message: 'PR-002 payout waiting for verification', type: 'Payout', createdAt: '2024-05-17T08:45:00', read: true },
  { id: 'NOT-006', title: 'System notification', message: 'Monthly collection report generated', type: 'System', createdAt: '2024-05-16T13:20:00', read: true },
  { id: 'NOT-007', title: 'Payment received', message: 'Karthik Sekar made a bank transfer', type: 'Payment', createdAt: '2024-05-15T15:40:00', read: false },
  { id: 'NOT-008', title: 'Installment overdue', message: 'CUST-006 has an overdue installment', type: 'Overdue', createdAt: '2024-05-15T10:05:00', read: true },
  { id: 'NOT-009', title: 'KYC pending', message: 'Gaurav K verification is awaiting review', type: 'KYC', createdAt: '2024-05-14T14:10:00', read: false },
  { id: 'NOT-010', title: 'Upcoming auction', message: 'Group GRP-03 auction set for July 2024', type: 'Auction', createdAt: '2024-05-10T16:30:00', read: true },
]

export const mockAuditLogs: AuditLog[] = [
  { id: 'AUD-001', dateTime: '2024-05-21T09:00:00', user: 'Super Admin', role: 'SUPER_ADMIN', action: 'Created customer', module: 'Customers', record: 'CUST-020', description: 'Customer profile created and assigned.' },
  { id: 'AUD-002', dateTime: '2024-05-21T09:15:00', user: 'Office Staff', role: 'OFFICE_STAFF', action: 'Recorded payment', module: 'Payments', record: 'REC-1001', description: 'Receipt REC-1001 entered for Asha Nair.' },
  { id: 'AUD-003', dateTime: '2024-05-21T09:45:00', user: 'Manager', role: 'OFFICE_MANAGER', action: 'Approved KYC', module: 'KYC', record: 'CUST-010', description: 'KYC approved for customer Varun Iyer.' },
  { id: 'AUD-004', dateTime: '2024-05-20T11:00:00', user: 'Admin', role: 'ADMIN', action: 'Updated office', module: 'Offices', record: 'OFF-01', description: 'Office details updated by admin.' },
  { id: 'AUD-005', dateTime: '2024-05-20T14:40:00', user: 'Collection Agent', role: 'COLLECTION_AGENT', action: 'Submitted cash collection', module: 'Collections', record: 'AG-001', description: 'Agent submitted daily collection summary.' },
  { id: 'AUD-006', dateTime: '2024-05-19T08:30:00', user: 'Accountant', role: 'ACCOUNTANT', action: 'Reviewed payout', module: 'Payouts', record: 'PAYOUT-001', description: 'Verified payout batch and signed off.' },
  { id: 'AUD-007', dateTime: '2024-05-19T12:00:00', user: 'Office Staff', role: 'OFFICE_STAFF', action: 'Generated receipt', module: 'Receipts', record: 'REC-1007', description: 'Receipt generated for Nitin Joshi.' },
  { id: 'AUD-008', dateTime: '2024-05-18T10:15:00', user: 'Super Admin', role: 'SUPER_ADMIN', action: 'Changed settings', module: 'Settings', record: 'System config', description: 'Updated company-wide notifications settings.' },
  { id: 'AUD-009', dateTime: '2024-05-18T16:30:00', user: 'Office Manager', role: 'OFFICE_MANAGER', action: 'Assigned group', module: 'Chit Groups', record: 'GRP-04', description: 'Assigned group to Bengaluru office.' },
  { id: 'AUD-010', dateTime: '2024-05-17T07:45:00', user: 'Office Staff', role: 'OFFICE_STAFF', action: 'Updated member', module: 'Members', record: 'MEM-1005', description: 'Linked customer to group after enrollment.' },
  { id: 'AUD-011', dateTime: '2024-05-17T15:05:00', user: 'Admin', role: 'ADMIN', action: 'Created auction', module: 'Auctions', record: 'AUC-004', description: 'Auction schedule created for May group.' },
  { id: 'AUD-012', dateTime: '2024-05-16T09:50:00', user: 'Super Admin', role: 'SUPER_ADMIN', action: 'Created staff user', module: 'Staff', record: 'STF-005', description: 'New staff profile created with reporting access.' },
  { id: 'AUD-013', dateTime: '2024-05-15T13:15:00', user: 'Collection Agent', role: 'COLLECTION_AGENT', action: 'Mark installment paid', module: 'Installments', record: 'INS-009', description: 'Marked customer installment as successfully paid.' },
  { id: 'AUD-014', dateTime: '2024-05-15T18:20:00', user: 'Accountant', role: 'ACCOUNTANT', action: 'Approved expense', module: 'Expenses', record: 'EXP-001', description: 'Office rent expense approved.' },
  { id: 'AUD-015', dateTime: '2024-05-14T11:10:00', user: 'Manager', role: 'OFFICE_MANAGER', action: 'Updated customer', module: 'Customers', record: 'CUST-015', description: 'Updated contact details and nominee information.' },
  { id: 'AUD-016', dateTime: '2024-05-13T10:25:00', user: 'Office Staff', role: 'OFFICE_STAFF', action: 'Entered payment', module: 'Payments', record: 'PAY-021', description: 'Payment entered for bank transfer.' },
  { id: 'AUD-017', dateTime: '2024-05-13T16:15:00', user: 'Super Admin', role: 'SUPER_ADMIN', action: 'Reviewed audit trail', module: 'Audit', record: 'AUD-001', description: 'Audit logs reviewed after daily summary.' },
  { id: 'AUD-018', dateTime: '2024-05-12T09:30:00', user: 'Office Manager', role: 'OFFICE_MANAGER', action: 'Approved KYC', module: 'KYC', record: 'CUST-019', description: 'KYC approved for Leena Mathew.' },
  { id: 'AUD-019', dateTime: '2024-05-11T12:25:00', user: 'Admin', role: 'ADMIN', action: 'Created office', module: 'Offices', record: 'OFF-04', description: 'New Pune office created for operations.' },
  { id: 'AUD-020', dateTime: '2024-05-10T08:40:00', user: 'Office Staff', role: 'OFFICE_STAFF', action: 'Uploaded document', module: 'Documents', record: 'DOC-001', description: 'Identity proof uploaded for verification.' },
]

export const mockUsers: AppUser[] = [
  { id: 'USR-001', name: 'Super Admin', email: 'superadmin@chit.com', username: 'superadmin', password: 'admin123', role: 'SUPER_ADMIN', officeId: 'OFF-01', avatar: 'SA', permissions: ROLE_PERMISSIONS.SUPER_ADMIN },
  { id: 'USR-002', name: 'Admin User', email: 'admin@chit.com', username: 'admin', password: 'admin123', role: 'ADMIN', officeId: 'OFF-01', avatar: 'AD', permissions: ROLE_PERMISSIONS.ADMIN },
  { id: 'USR-003', name: 'Office Manager', email: 'manager@chit.com', username: 'manager', password: 'admin123', role: 'OFFICE_MANAGER', officeId: 'OFF-01', avatar: 'OM', permissions: ROLE_PERMISSIONS.OFFICE_MANAGER },
  { id: 'USR-004', name: 'Office Staff', email: 'staff@chit.com', username: 'staff', password: 'admin123', role: 'OFFICE_STAFF', officeId: 'OFF-02', avatar: 'OS', permissions: ROLE_PERMISSIONS.OFFICE_STAFF },
  { id: 'USR-005', name: 'Accountant', email: 'accountant@chit.com', username: 'accountant', password: 'admin123', role: 'ACCOUNTANT', officeId: 'OFF-03', avatar: 'AC', permissions: ROLE_PERMISSIONS.ACCOUNTANT },
]
