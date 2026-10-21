import { mockGroups } from '../mock/data'
import type { ChitGroup } from '../types'

let chitGroupStore: ChitGroup[] = [...mockGroups]

export const getChitGroups = (): ChitGroup[] => chitGroupStore

export const getChitGroupById = (id: string): ChitGroup | undefined =>
  chitGroupStore.find((group) => group.id === id)

export const createChitGroup = (group: ChitGroup): ChitGroup => {
  chitGroupStore = [group, ...chitGroupStore]
  return group
}

export const updateChitGroup = (group: ChitGroup): ChitGroup => {
  chitGroupStore = chitGroupStore.map((item) => (item.id === group.id ? group : item))
  return group
}

export const deleteChitGroup = (id: string): boolean => {
  const previousLength = chitGroupStore.length
  chitGroupStore = chitGroupStore.filter((group) => group.id !== id)
  return chitGroupStore.length !== previousLength
}
