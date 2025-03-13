type AddressT = {
  street?: any | null
  number?: any | null
  neighborhood?: any | null
  city?: any | null
  zipCode?: any | null
  state?: any | null
  employeeId: number | null
}

export type Address = AddressT | Partial<AddressT>
export type Addresses = AddressT[] | Partial<AddressT>[]

export type AddressProps = {
  data: Address | null
  onChange: (updatedData: Address) => void
  onNext: () => void
  onPrev: () => void
  employeeId: number | null
}
