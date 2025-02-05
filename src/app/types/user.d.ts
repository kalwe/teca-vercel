export type UserInput = {
    name: string;
    email: string;
    password: string; // ✅ Apenas na entrada
}

export type UserOutput = {
  id: number; // ✅ Agora `id` pode ser opcional
  name: string;
  email: string;
 active?: boolean;
  roles?: string[];

};

interface UserFormProps {
  mode: "edit" | "create";
  userData?: UserInput | UserOutput; // ✅ Deve ser compatível com `userData`
  setUserData: React.Dispatch<React.SetStateAction<UserInput>>; // ✅ Agora incluído corretamente
  isEditable: boolean;
  onSave: (data: UserInput) => void | Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}



  // Context

  export interface UserContextType {
    users: UserOutput[];
    loggedInUser: UserOutput | null;
    addUser: (user: Omit<UserOutput, "id" | "active"> & { password: string }) => Promise<void>;
    updateUser: (id: number, updatedData: Partial<UserOutput>) => Promise<void>;
    deleteUser: (id: number) => Promise<void>;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
  }
