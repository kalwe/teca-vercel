type ContactT = {
  phone: any | null
  email?: any | null
  webSite?: any | null
  employeeId?: any | null
}

export type Contact = ContactT | Partial<ContactT>
export type Contacts = ContactT[] | Partial<ContactT>[]

export interface ContactProps {
  contactData: Contact
  onChange: (updatedData: Contact) => void
  onNext: () => void
  onPrev: () => void
  employeeId: number
}
