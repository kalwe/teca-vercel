type ContactT = {
  phone: string;
  email?: string;
  webSite?: string;
  employeeId: number;
};

export type Contact = ContactT | Partial<ContactT>
export type Contacts = ContactT[] | Partial<ContactT>[]

export interface ContactProps {
  contactData: Contact;
  onChange: (updatedData: Contact) => void;
  onNext: () => void;
  onPrev: () => void;
  employeeId: number;
}
