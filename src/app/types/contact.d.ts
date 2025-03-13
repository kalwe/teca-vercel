type ContactT = {
  phone: any | null
  email?: any | null
  webSite?: any | null
  employeeId: number | null
}

export type Contact = ContactT | Partial<ContactT>
export type Contacts = ContactT[] | Partial<ContactT>[]

export interface ContactProps {
  contactData: Contact | null
  onChange: (updatedData: Contact) => void
  onNext: () => void
  onPrev: () => void
  employeeId: number | null
}
