export type AddressType = {
    street: string
    number: string
    neighborhood: string
    city: string
    zip_code: string
    state: string
    employee?: number
}

export type AddressProps = {
  data?: Partial<AddressType>
  onChange: (updatedData: AddressType) => void
  isEditable: boolean
  onNext: () => void
  onPrev: () => void
  employee?: number
}
