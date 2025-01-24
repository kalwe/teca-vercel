
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

export interface User {
  id: number;
  username: string;
  email: string;
  active: boolean;
}

export interface Vaga {
  vaga: string;
  quantidade: number;
  cargo: string;
  descricao: string;
  requisitos: string;
  beneficios: string;
  salario: string;
}


export interface VagasContextProps {
  vagas: Vaga[];
  addVaga: (vaga: Vaga) => void;
  updateVaga: (index: number, updates: Partial<Vaga>) => void;
  removeVaga: (index: number) => void;
}

// Define the shape of the context
export interface UserContextType {
  users: User[];
  loggedInUser: User | null; // Novo: Usuário logado
  addUser: (user: Omit<User, "id" | "active">) => void;
  updateUser: (id: number, updatedData: Partial<User>) => void;
  deleteUser: (id: number) => void;
  login: (email: string, password: string) => boolean; // Novo: Método para login
  logout: () => void; // Novo: Método para logout
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

export interface DropDownBurgerProps {
  isOpen: boolean;
}

export interface DropdownCheckboxProps {
  value?: string; // Preselected value
  onChange: (value: string) => void;
  disabled?: boolean; // Disable the dropdown
  options?: string[]; // Dynamic options for the dropdown
}

export interface DropdownCheckboxEstadoCivilProps {
  value: string;
  onChange: (value: string) => void; // Callback to update value in parent
  disabled?: boolean; // Optional disabled property
}

export interface DropdownCheckboxFuncaoProps {
  value: string; // Valor controlado
  onChange: (value: string) => void; // Callback para atualizar o estado no componente pai
}

export interface DropdownCheckboxGenderProps {
  value: string; // Controlled value
  onChange: (value: string) => void; // Callback to update the parent state
  disabled?: boolean; // Add optional `disabled` prop
}

export interface DropdownCheckboxRegionalProps {
  value: string; // Valor selecionado vindo do componente pai
  onChange: (value: string) => void; // Função de callback para atualizar o valor no componente pai
}

export interface DropdownCheckboxSchoolProps {
  value: string; // Valor selecionado vindo do componente pai
  onChange: (value: string) => void; // Callback para alterar o valor no componente pai
}




// switch tabs

export interface AddressData {
  logradouro: string;
  bairro: string;
  cep: string;
  estado: string;
  municipio: string;
}

export interface AddressProps {
  data?: Partial<AddressData>; // Make the data prop optional
  onChange: (updatedData: AddressData) => void;
  isEditable: boolean;
  onNext: () => void;
  onPrev: () => void;
}


export interface BankProps {
  data: {
    banco: string;
    agencia: string;
    conta: string;
    tipoConta: string;
  };
  onChange: (updatedData: BankProps["data"]) => void;
  onNext: () => void;
  onPrev: () => void;
  mode: "add" | "edit" | "view";
}


export interface ContactData {
  tipoContato: string;
  informacao: string;
}

export interface ContactProps {
  data?: Partial<ContactData>; // Make data optional with default values
  onChange: (updatedData: ContactData) => void;
  isEditable: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export interface FuncionarioData {
  matricula: string;
  admissionDate: Date | null;
  removalDate: Date | null;
  funcao: string;
  encarregado: boolean;
  gerente: boolean;
}

export interface FuncionarioProps {
  data: FuncionarioData;
  onChange: (updatedData: FuncionarioData) => void;
  isEditable: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export interface PessoaFisicaProps {
  data: {
    nome: string;
    cpf: string;
    genero: string;
    estadoCivil: string;
    rg: string;
    orgaoExpedidor: string;
    selectedDate: Date | null;
  };
  onChange: (data: any) => void;
  isEditable: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export interface VestuarioProps {
  data: {
    tamanhoCamisa: string;
    tamanhoCalca: string;
    tamanhoCalcado: string;
  };
  onChange: (updatedData: VestuarioProps["data"]) => void;
  mode: "add" | "edit" | "view";
}


// masks

export interface BirthDayMaskProps {
    value: string;
    onChange: (value: string) => void;
}

export interface CepMaskProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean; // Permite desabilitar o campo, se necessário
}


export interface CpfMaskProps {
  value: string; // Valor atual do CPF vindo do componente pai
  onChange: (value: string) => void; // Callback para atualizar o CPF no componente pai
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

// forms

export interface ContractFormProps {
  mode: "add" | "edit";
  employeeData?: any;
}
