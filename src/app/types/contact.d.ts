export type ContactType = {
    phone_number: string;
    email: string;
    website: string;
}

export interface ContactProps {
    data?: Partial<Contact>;
    onChange: (updatedData: ContactData) => void;
    isEditable: boolean;
    onNext: () => void;
    onPrev: () => void;
  }