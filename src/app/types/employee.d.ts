// Employee.ts

import { Address } from "./address";
import { BankAccount } from "./BankAccount";
import { Clothing } from "./clothing";
import { Contact } from "./contact";
import { Function } from "./role";

export interface Employee {
  bank_account: {};
  funcionario: {};
  pessoaFisica: {};
  active: any;
  position: string;
  full_name: ReactNode;
  id: number;
  person: any;
  role: any;
  name: string; // First name of the employee
  registration: string; // Registration number of the employee
  supervisor: boolean; // Indicates if the employee is a supervisor
  manager: boolean; // Indicates if the employee is a manager
  salary: number; // Salary of the employee
  contract_date: Date; // Date when the employee was contracted
  removal_date: Date; // Date when the employee was contracted
  function: Function; // The function/role of the employee
  address: Address; // List of addresses associated with the employee
  contact: Contact; // List of contacts associated with the employee
  bank: BankAccount; // List of bank accounts associated with the employee
  clothing: Clothing; // List of clothing sizes or preferences associated with the employee
}

export interface EmployeeProps {
  data: Employee;
  onChange: (updatedData: Employee) => void;
  isEditable: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export interface EmployeeRelated {
  employee: Employee; // Reference to the associated employee
}

export interface EmployeeRelationDetails {
  employeeId: string; // ID of the related employee
  description: string; // Description of the relationship
  relatedEntity: string; // Type of related entity (e.g., Address, Contact, etc.)
}

export interface ContractFormProps {
  mode: "edit" | "create";
  employeeData?: Employee | null;
  onSave: (updatedData: Employee) => Promise<void>;
  onCancel: () => void;
  isEditable: boolean;
}


// Masks


export interface CpfMaskProps {
  value: string; // Valor atual do CPF vindo do componente pai
  onChange: (value: string) => void; // Callback para atualizar o CPF no componente pai
  disabled?: boolean; // Adiciona a propriedade opcional disabled
}



export interface BirthDayMaskProps {
  value: string;
  onChange: (value: string) => void;
}

export interface CepMaskProps {
value: string;
onChange: (value: string) => void;
disabled?: boolean; // Permite desabilitar o campo, se necessário
}



export interface PhoneMaskProps {
  value: string; // Valor do telefone vindo do componente pai
  onChange: (value: string) => void; // Função de callback para alterar o valor no componente pai
}

export interface QuantityMaskProps {
value: number; // Valor inicial da quantidade
onChange: (newQuantity: number) => void; // Função chamada quando a quantidade muda
min?: number; // Valor mínimo permitido (opcional, padrão: 0)
max?: number; // Valor máximo permitido (opcional, padrão: Infinity)
}

export interface RgMaskProps {
value: string;
onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
disabled?: boolean; // Propriedade opcional para desativar o campo
}

export interface MoneyInputProps {
  value: string;
  onChange: (newValue: string) => void;
}
