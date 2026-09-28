import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { AppLayout } from '../layouts/AppLayout'
import { AgentsPage } from '../pages/AgentsPage'
import { AuctionsPage } from '../pages/AuctionsPage'
import { AuditLogsPage } from '../pages/AuditLogsPage'
import { ChitGroupsPage } from '../pages/ChitGroupsPage'
import { ChitSchemesPage } from '../pages/ChitSchemesPage'
import { CustomerDetailPage } from '../pages/CustomerDetailPage'
import { CustomersPage } from '../pages/CustomersPage'
import { DashboardPage } from '../pages/DashboardPage'
import { InstallmentsPage } from '../pages/InstallmentsPage'
import { LoginPage } from '../pages/LoginPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { NotificationsPage } from '../pages/NotificationsPage'
import { OfficesPage } from '../pages/OfficesPage'
import { PaymentsPage } from '../pages/PaymentsPage'
import { ReportsPage } from '../pages/ReportsPage'
import { SettingsPage } from '../pages/SettingsPage'
import { UnauthorizedPage } from '../pages/UnauthorizedPage'
import { type ReactNode } from 'react'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

const RootRedirect = () => {
  const { isAuthenticated } = useAuth()

  return <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />
}

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<RootRedirect />} />
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
      <Route path="/customers/:id" element={<CustomerDetailPage />} />
      <Route path="/chit-schemes" element={<ChitSchemesPage />} />
      <Route path="/chit-groups" element={<ChitGroupsPage />} />
      <Route path="/members" element={<CustomersPage />} />
      <Route path="/installments" element={<InstallmentsPage />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route path="/auctions" element={<AuctionsPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/audit-logs" element={<AuditLogsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/agents" element={<AgentsPage />} />
      <Route path="/offices" element={<OfficesPage />} />
      <Route path="/payouts" element={<PaymentsPage />} />
      <Route path="/receipts" element={<PaymentsPage />} />
      <Route path="/kyc" element={<ReportsPage />} />
      <Route path="/staff" element={<ReportsPage />} />
      <Route path="/expenses" element={<ReportsPage />} />
      <Route path="/accounts" element={<ReportsPage />} />
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)
