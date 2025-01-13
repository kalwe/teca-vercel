export interface Employee {
    id: number;
    name: string;
    role: string;
    registration: string;
    cpf: string;
    supervisor: boolean;
    manager: boolean;
    active: boolean;
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
      matricula: string;
      admissionDate: Date | null;
      removalDate: Date | null;
      funcao: string;
      encarregado: boolean;
      gerente: boolean;
      ativo: boolean;
    };
    address: {
      logradouro: string;
      bairro: string;
      cep: string;
      estado: string;
      municipio: string;
    };
    contact: {
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
