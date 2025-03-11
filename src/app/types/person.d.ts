

export type PersonType = {
  name?: any | null
  fullName?: any | null
  taxId?: any | null
  nationalId?: any | null
  dateOfBirth?: any | null
  issuingBody?: any | null
  gender?: any | null
  maritalStatus?: any | null
}

export type Person = PersonType
export type Persons = Person[]

export type PersonProps = {
  data: Person
  onChange: (data: Person) => void
  isEditable: boolean
  onNext: () => void
  onPrev: () => void
}
