
// Contexts

// TODO: can use var names in ingles?
export interface PessoaFisica {
  nome: string;
  cpf: string;
  genero: string;
  estadoCivil: string;
  rg: string;
  orgaoExpedidor: string;
  selectedDate: Date | null;
}

export interface Funcionario {
  matricula: string;
  cargo: string;
  salario: number;
  dataContratacao: string;
}

export interface Address {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface Contact {
  telefone: string;
  email: string;
}

export interface Bank {
  banco: string;
  agencia: string;
  conta: string;
}

export interface Vestuario {
  tamanhoCamisa: string;
  tamanhoCalca: string;
  tamanhoSapato: string;
}

export interface Employee {
  name: ReactNode;
  id: number;
  pessoaFisica: PessoaFisica;
  funcionario: Funcionario;
  address: Address;
  contact: Contact;
  bank: Bank;
  vestuario: Vestuario;
  role: string;
  registration: string;
  cpf: string;
  supervisor: boolean;
  manager: boolean;
  active: boolean;
}

export interface Curriculo {
  id: string;
  nome: string;
  email: string;
  cep: string;
  cpf: string;
  telefone: string;
  cargo: string;
  regional: string;
  escolaridade: string;
  dataNascimento: string;
  pdf?: File | string; // Optional field for the PDF file
}

export interface Reminder {
  id: string;
  date: string; // Formato dd/mm/aaaa
  time: string; // Formato hh:mm
  reason: string;
}

export interface ReminderContextData {
  reminders: Reminder[];
  addReminder: (reminder: Reminder) => void;
}





// FormData

export interface FormData {
  address: {};
  contact: {};
  bank: {};
  id: number | undefined;
  pessoaFisica: {
      nome: string;
      cpf: string;
      genero: string;
      estadoCivil: string;
      rg: string;
      orgaoExpedidor: string;
      selectedDate: Date | null;
  };
  funcionario: {
      cargo: string;
      salario: number;
      dataContratacao: string;
      supervisor: boolean;
      manager: boolean;
      matricula: string;
      admissionDate: Date | null;
      removalDate: Date | null;
      funcao: string;
      encarregado: boolean;
      gerente: boolean;
      ativo: boolean;
  };
  endereco: {
      logradouro: string;
      bairro: string;
      cep: string;
      estado: string;
      municipio: string;
  };
  contato: {
      tipoContato: string;
      informacao: string;
  };
  dadosBancarios: {
      banco: string;
      agencia: string;
      conta: string;
      tipoConta: string;
  };
  vestuario: {
      tamanhoCamisa: string;
      tamanhoCalca: string;
      tamanhoCalcado: string;
  };
}

export interface FormDataContextType {
    formData: FormData;
    updateField: <K extends keyof FormData>(
        section: K,
        field: keyof FormData[K],
        value: FormData[K][keyof FormData[K]]
    ) => void;
    updateSection: <K extends keyof FormData>(section: K, data: Partial<FormData[K]>) => void;
    resetFormData: () => void;
}

export interface EmployeeContextProps {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: number, updates: Partial<Employee>) => void;
  deactivateEmployee: (id: number) => void;
  getEmployeeById: (id: number) => Employee | undefined;
}


// Define the CurriculoContextData interface
interface CurriculoContextData {
  curriculos: Curriculo[];
  addCurriculo: (curriculo: Curriculo) => void;
  updateCurriculo: (curriculo: Curriculo) => void;
}


// importadas





// masks



// forms

export interface ContractFormProps {
  mode: "add" | "edit";
  employeeData?: any;
}
