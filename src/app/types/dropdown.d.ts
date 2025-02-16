export interface DropDownBurgerProps {
  isOpen: boolean;
}

export interface DropdownCheckboxProps {
  value?: string;
  onChange?: (value: string) => void; // Agora opcional
  disabled?: boolean;
  options: string[];
}

export interface DropdownCheckboxMaritalStatusProps {
  value: string;
  onChange?: (value: string) => void; // Agora opcional
  disabled?: boolean;
}

export interface DropdownCheckboxFuncaoProps {
  value: string;
  onChange?: (value: string) => void; // Agora opcional
  disabled?: boolean;
}

export interface DropdownCheckboxGenderProps {
  value: string;
  onChange?: (value: string) => void; // Agora opcional
  disabled?: boolean;
}

export interface DropdownCheckboxRegionalProps {
  value: string;
  onChange?: (value: string) => void; // Agora opcional
  disabled?: boolean;
}

export interface DropdownCheckboxSchoolProps {
  value: string;
  onChange?: (value: string) => void; // Agora opcional
  disabled?: boolean;
}
