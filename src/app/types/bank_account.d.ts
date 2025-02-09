

export type BankAccountType = {

        bank: string,
        agency: string,
        account: string,
        account_type: string

  }

export type ModeType = "edit" | "add" | "view" | "create"; // ✅ Agora inclui "create"

export type BankProps = {
  data: BankAccount;
  onChange: (updatedData: BankProps["data"]) => void;
  onNext: () => void;
  onPrev: () => void;
  mode: ModeType; // ✅ Usa o tipo padronizado
};
