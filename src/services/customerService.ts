import { mockCustomers } from '../mock/data'
import type { Customer } from '../types'

let customerStore: Customer[] = [...mockCustomers]

export const getCustomers = (): Customer[] => customerStore

export const getCustomerById = (id: string): Customer | undefined =>
  customerStore.find((customer) => customer.id === id)

export const createCustomer = (customer: Customer): Customer => {
  customerStore = [customer, ...customerStore]
  return customer
}

export const updateCustomer = (customer: Customer): Customer => {
  customerStore = customerStore.map((item) => (item.id === customer.id ? customer : item))
  return customer
}

export const deleteCustomer = (id: string): boolean => {
  const previousLength = customerStore.length
  customerStore = customerStore.filter((customer) => customer.id !== id)
  return customerStore.length !== previousLength
}
