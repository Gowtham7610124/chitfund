import { mockUsers } from '../mock/data'
import type { AppUser, PermissionSet } from '../types'

export const loginWithMockCredentials = (
  identifier: string,
  password: string,
): AppUser | null => {
  const normalizedIdentifier = identifier.trim().toLowerCase()

  const matchingUser = mockUsers.find(
    (user) =>
      user.email.toLowerCase() === normalizedIdentifier ||
      user.username.toLowerCase() === normalizedIdentifier,
  )

  if (!matchingUser || matchingUser.password !== password) {
    return null
  }

  return matchingUser
}

export const getUserSession = (): AppUser | null => {
  const session = localStorage.getItem('chit-user-session')
  if (!session) {
    return null
  }

  try {
    return JSON.parse(session) as AppUser
  } catch {
    return null
  }
}

export const setUserSession = (user: AppUser): void => {
  localStorage.setItem('chit-user-session', JSON.stringify(user))
}

export const clearUserSession = (): void => {
  localStorage.removeItem('chit-user-session')
}

export const getPermissionSummary = (permissions: PermissionSet): string[] => {
  const summary: string[] = []

  if (permissions.canManageCustomers) summary.push('Customers')
  if (permissions.canManageCollections) summary.push('Collections')
  if (permissions.canViewReports) summary.push('Reports')
  if (permissions.canManageChits) summary.push('Chits')
  if (permissions.canManageAuctions) summary.push('Auctions')
  if (permissions.canManageUsers) summary.push('Users')

  return summary
}
