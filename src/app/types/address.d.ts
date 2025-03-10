type AddressT = {
  street?: string
  number?: string
  neighborhood?: string
  city?: string
  zipCode?: string
  state?: string
  employeeId?: number
}

export type Address = AddressT | Partial<AddressT>
export type Addresses = AddressT[] | Partial<AddressT>[]

export type AddressProps = {
  data: Address
  onChange: (updatedData: Address) => void
  onNext: () => void
  onPrev: () => void
  employeeId: number
}
