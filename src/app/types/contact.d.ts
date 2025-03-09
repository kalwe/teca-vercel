type ContactT = {
  phone: string
  email: string
  website: string
  employeeId?: number
}

export type Contact = ContactT | Partial<ContactT>
export type Contacts = ContactT[] | Partial<ContactT>[]

export interface ContactProps {
  data?: Contact
  onChange: (updatedData: ContactData) => void
  isEditable: boolean
  onNext: () => void
  onPrev: () => void
  employeeId?: number
}
