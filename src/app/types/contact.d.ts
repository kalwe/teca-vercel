export type ContactType = {
  phone: string;
  email: string;
  website: string;
  employeeId?: number;
};

export interface ContactProps {
  data?: Partial<ContactType>;
  onChange: (updatedData: ContactData) => void;
  onNext: () => void;
  onPrev: () => void;
  employeeId?: number;
}
