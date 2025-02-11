export type AddressType = {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    zip_code: string;
    state: string;
    // employee: number
}

export type AddressProps = {
  data?: Partial<Address>;
  onChange: (updatedData: AddressData) => void; // TODO: dafuck come from AddressData ?!?
  isEditable: boolean;
  onNext: () => void;
  onPrev: () => void;
  employee?: number;
}
