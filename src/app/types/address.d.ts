export type AddressType = {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    zip_code: string;
    state: string;
}

export type AddressProps = {
  data?: Partial<Address>;
  onChange: (updatedData: AddressData) => void;
  isEditable: boolean;
  onNext: () => void;
  onPrev: () => void;
}
