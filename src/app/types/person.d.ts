import { GenderType, MaritalStatusType } from "../schemas/personSchema";

export type Person = {
  full_name: string;
  tax_id: string;
  national_id: string;
  date_of_birth: Date | null;
  issuing_body: string;
  gender: GenderType;
  marital_status: MaritalStatusType;
};

export type PersonProps = {
  data: Person;
  onChange: (data: Person) => void;
  isEditable: boolean;
  onNext: () => void;
  onPrev: () => void;
};

// ✅ Define valores padrão para um novo funcionário
export const initialPersonData: Person = {
  full_name: "",
  tax_id: "",
  national_id: "",
  date_of_birth: null,
  issuing_body: "",
  gender: "Masculino", // Ajuste para um valor válido de GenderType
  marital_status: "Solteiro", // Ajuste para um valor válido de MaritalStatusType
};
