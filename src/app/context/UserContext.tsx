"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { userOutputSchema, userInputSchema } from "../schemas/userSchema"; // ✅ Agora usa o schema correto

// 🔹 Tipagem do usuário com base no schema
type UserOutput = {
  id: number;
  name: string;
  email: string;
  active: boolean;
  roles?: string[];
};

// 🔹 Tipagem do contexto de usuário
type UserContextType = {
  users: UserOutput[];
  loggedInUser: UserOutput | null;
  loading: boolean;
  addUser: (user: Omit<UserOutput, "id" | "active"> & { password: string }) => Promise<void>;
  updateUser: (id: number, updatedData: Partial<UserOutput>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const API_URL = "https://api.example.com/users"; // 🚀 Substitua pela URL real

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserOutput[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<UserOutput | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Busca usuários do backend ao carregar
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}`);
        const validatedUsers = userOutputSchema.array().parse(response.data);
        setUsers(validatedUsers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    // 🔹 Carregar usuário logado do `localStorage`
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔹 Criar usuário via backend
  const addUser = async (userData: Omit<UserOutput, "id" | "active"> & { password: string }) => {
    try {
      if (!userData.password) {
        throw new Error("A senha é obrigatória para criar um usuário.");
      }

      const validatedData = userInputSchema.parse(userData);
      const response = await axios.post(`${API_URL}`, validatedData);
      const newUser = userOutputSchema.parse(response.data);

      setUsers((prevUsers) => [...prevUsers, newUser]);
    } catch (error) {
      console.error("⚠ Erro ao adicionar usuário:", error);
    }
  };

  // 🔹 Atualizar usuário via backend
  const updateUser = async (id: number, updatedData: Partial<UserOutput>) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      const updatedUser = userOutputSchema.parse(response.data);

      setUsers((prevUsers) => prevUsers.map((user) => (user.id === id ? updatedUser : user)));

      if (loggedInUser?.id === id) {
        setLoggedInUser(updatedUser);
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("⚠ Erro ao atualizar usuário:", error);
    }
  };

  // 🔹 Deletar usuário via backend
  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

      if (loggedInUser?.id === id) {
        setLoggedInUser(null);
        localStorage.removeItem("loggedInUser");
      }
    } catch (error) {
      console.error("⚠ Erro ao deletar usuário:", error);
    }
  };

  // 🔹 Faz login via backend
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const user = userOutputSchema.parse(response.data);

      if (user) {
        setLoggedInUser(user);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        return true;
      }
      return false;
    } catch (error) {
      console.error("⚠ Erro no login:", error);
      return false;
    }
  };

  // 🔹 Logout (remove usuário do estado e localStorage)
  const logout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loggedInUser,
        loading,
        addUser,
        updateUser,
        deleteUser,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// 🔹 Hook para acessar o contexto de usuário
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext deve ser usado dentro de um UserProvider.");
  }
  return context;
};
