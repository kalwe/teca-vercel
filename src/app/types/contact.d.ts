export type ContactType = {
  phone_number: string;
  email: string;
  website: string;
  employeeId?: number;
};

export interface ContactProps {
  data?: Partial<ContactType>;
  onChange: (updatedData: ContactData) => void;
  isEditable: boolean;
  onNext: () => void;
  onPrev: () => void;
  employeeId?: number;
}
