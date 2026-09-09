import { mockCustomers } from '../mock/data'
import type { Customer } from '../types'

export const getCustomers = (): Customer[] => mockCustomers

export const getCustomerById = (id: string): Customer | undefined =>
  mockCustomers.find((customer) => customer.id === id)

export const createCustomer = (customer: Customer): Customer => customer

export const updateCustomer = (customer: Customer): Customer => customer
