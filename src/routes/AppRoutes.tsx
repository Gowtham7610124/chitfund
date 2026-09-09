import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { AppLayout } from '../layouts/AppLayout'
import { AgentsPage } from '../pages/AgentsPage'
import { AddCustomerPage } from '../pages/AddCustomerPage'
import { AccountsPage } from '../pages/AccountsPage'
import { AuctionsPage } from '../pages/AuctionsPage'
import { AuditLogsPage } from '../pages/AuditLogsPage'
import { ChitGroupsPage } from '../pages/ChitGroupsPage'
import { ChitSchemesPage } from '../pages/ChitSchemesPage'
import { CreateChitGroupPage } from '../pages/CreateChitGroupPage'
import { CreateChitSchemePage } from '../pages/CreateChitSchemePage'
import { CustomerDetailPage } from '../pages/CustomerDetailPage'
import { CustomersPage } from '../pages/CustomersPage'
import { DashboardPage } from '../pages/DashboardPage'
import { InstallmentsPage } from '../pages/InstallmentsPage'
import { KycPage } from '../pages/KycPage'
import { LoginPage } from '../pages/LoginPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { NotificationsPage } from '../pages/NotificationsPage'
import { PaymentsPage } from '../pages/PaymentsPage'
import { PayoutsPage } from '../pages/PayoutsPage'
import { ReceiptsPage } from '../pages/ReceiptsPage'
import { RecordPaymentPage } from '../pages/RecordPaymentPage'
import { ReportsPage } from '../pages/ReportsPage'
import { SettingsPage } from '../pages/SettingsPage'
import { StaffPage } from '../pages/StaffPage'
import { UnauthorizedPage } from '../pages/UnauthorizedPage'
import { type ReactNode } from 'react'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/unauthorized" element={<UnauthorizedPage />} />

    <Route
      element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/customers/new" element={<AddCustomerPage />} />
      <Route path="/customers/:id" element={<CustomerDetailPage />} />
      <Route path="/chit-schemes" element={<ChitSchemesPage />} />
      <Route path="/chit-schemes/new" element={<CreateChitSchemePage />} />
      <Route path="/chit-groups" element={<ChitGroupsPage />} />
      <Route path="/chit-groups/new" element={<CreateChitGroupPage />} />
      <Route path="/installments" element={<InstallmentsPage />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route path="/payments/new" element={<RecordPaymentPage />} />
      <Route path="/chit-booking" element={<AuctionsPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/audit-logs" element={<AuditLogsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/agents" element={<AgentsPage />} />
      <Route path="/payouts" element={<PayoutsPage />} />
      <Route path="/receipts" element={<ReceiptsPage />} />
      <Route path="/kyc" element={<KycPage />} />
      <Route path="/staff" element={<StaffPage />} />
      <Route path="/accounts" element={<AccountsPage />} />
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)
