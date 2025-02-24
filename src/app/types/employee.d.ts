/**
 * Employee.ts
 *
 * This file defines the types and interfaces for the Employee module.
 * It follows SOLID principles by keeping each type responsible for its own concern.
 * Each interface is documented and uses descriptive, consistent naming.
 */


/**
 * Represents personal information associated with an employee.
 */
export interface Person {
  fullName: string;
  taxId: string;
  nationalId: string;
  issuingBody: string;
  dateOfBirth: Date;
  gender: string;
  maritalStatus: string;
}

/**
 * Represents the role details of an employee.
 */
export interface Role {
  id: number;
  title: string;
}

/**
 * EmployeeType defines the structure for an Employee.
 * It encapsulates personal details, role, and related associations.
 */
export type EmployeeType = {
  id?: number;
  registration: string;    // Registration number of the employee
  supervisor: boolean;     // Indicates if the employee is a supervisor
  manager: boolean;        // Indicates if the employee is a manager
  contractDate: Date;      // Date when the employee was contracted
  removalDate?: Date;      // Date when the employee was removed (if applicable)
  positionId: number;      // Identifier for the employee's position or role

};

/**
 * Props for components handling employee data.
 */
export interface EmployeeProps {
  data: EmployeeType;
  onChange: (updatedData: EmployeeType) => void;
  isEditable: boolean;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * Props for the contract form component used in employee creation or editing.
 */
export interface ContractFormProps {
  mode: "edit" | "create";
  employeeData?: EmployeeType | null;
  onSave: (updatedData: EmployeeType) => Promise<void>;
  onCancel: () => void;
  isEditable: boolean;
}

/**
 * Props for a CPF (Cadastro de Pessoas Físicas) input mask component.
 */
export interface CpfMaskProps {
  value: string;                    // Current CPF value from the parent component
  onChange: (value: string) => void;  // Callback to update the CPF value in the parent component
  disabled?: boolean;               // Optional flag to disable the input
}

/**
 * Props for a birth date input mask component.
 */
export interface BirthDayMaskProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Props for a CEP (Postal Code) input mask component.
 */
export interface CepMaskProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;               // Optional flag to disable the input
}

/**
 * Props for a phone input mask component.
 */
export interface PhoneMaskProps {
  value: string;                    // Phone number value from the parent component
  onChange: (value: string) => void;  // Callback for updating the phone number
}

/**
 * Props for a quantity input component.
 */
export interface QuantityMaskProps {
  value: number;                      // Initial quantity value
  onChange: (newQuantity: number) => void;  // Callback when the quantity changes
  min?: number;                       // Optional minimum allowed value (default: 0)
  max?: number;                       // Optional maximum allowed value (default: Infinity)
}

/**
 * Props for an RG (Registro Geral) input mask component.
 */
export interface RgMaskProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;               // Optional flag to disable the input
}

/**
 * Props for a money input component.
 */
export interface MoneyInputProps {
  value: string;
  onChange: (newValue: string) => void;
}
