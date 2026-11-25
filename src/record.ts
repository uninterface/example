export interface ExpenseRecord {
  name: string
  amount: number
  category: string
  enabled: boolean
}

export const categories = [
  { key: 'supplies', label: 'Supplies' },
  { key: 'services', label: 'Services' },
  { key: 'equipment', label: 'Equipment' },
]
