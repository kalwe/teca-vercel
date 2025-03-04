export type AddressType = {
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  zipCode?: string;
  state?: string;
  employeeId?: number;
  [key: string]: any
};

export type AddressProps = {
  data?: Partial<AddressType>;
  onChange: (updatedData: AddressType) => void;
  onNext: () => void;
  onPrev: () => void;
  employeeId?: number;
  isEditable: boolean
};
