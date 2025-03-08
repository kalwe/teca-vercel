type BankAccountT = {
  bank?: string;
  agency?: string;
  account?: string;
  account_type?: string;
  employeeId?: number;
};


export type ModeType = 'edit' | 'add' | 'view' | 'create';

export type BankAccount = BankAccountT | Partial<BankAccountT>
export type BankAccounts = BankAccountT[] | Partial<BankAccountT>[]

export type BankProps = {
  data: BankAccount;
  onChange: (updatedData: BankAccount) => void;
  onNext: () => void;
  onPrev: () => void;
  mode: ModeType;
  employeeId: number;
};
