"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "../services/api";
import { userOutputSchema, userInputSchema } from "../schemas/userSchema";

const endpoint = "/user";

type UserContextType = {
  users: UserOutput[];
  loggedInUser: UserOutput | null;
  loading: boolean;
  addUser: (user: Omit<UserOutput, "id"> & { password: string }) => Promise<void>;
  updateUser: (id: number, updatedData: Partial<UserOutput>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserOutput[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<UserOutput | null>(null);
  const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       try {
//         console.log("🔄 Buscando usuários...");
//         const response = await api.get(endpoint);
//
//         if (!response || !response.data) {
//           throw new Error("Resposta inválida da API");
//         }
//
//         const validatedUsers = userOutputSchema.array().parse(response.data);
//         setUsers(validatedUsers);
//       } catch (error) {
//         console.error(" Erro ao buscar usuários:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     fetchUsers();
//
//     try {
//       const storedUser = localStorage.getItem("loggedInUser");
//       if (storedUser) {
//         setLoggedInUser(JSON.parse(storedUser));
//       }
//     } catch (error) {
//       console.error(" Erro ao recuperar usuário do localStorage:", error);
//     }
//   }, []);

  const addUser = async (userData: Omit<UserOutput, "id"> & { password: string }) => {
    try {
      const validatedData = userInputSchema.parse(userData);
      const response = await api.post(endpoint, validatedData);

      if (!response || !response.data) {
        throw new Error("Erro ao adicionar usuário: Resposta inválida da API");
      }

      const newUser = userOutputSchema.parse(response.data);
      setUsers((prevUsers) => [...prevUsers, newUser]);
    } catch (error) {
      console.error(" Erro ao adicionar usuário:", error);
    }
  };

  const updateUser = async (id: number, updatedData: Partial<UserOutput>) => {
    try {
      const response = await api.put(`${endpoint}/${id}`, updatedData);

      if (!response || !response.data) {
        throw new Error("Erro ao atualizar usuário: Resposta inválida da API");
      }

      const updatedUser = userOutputSchema.parse(response.data);
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === id ? updatedUser : user)));

      if (loggedInUser?.id === id) {
        setLoggedInUser(updatedUser);
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error(" Erro ao atualizar usuário:", error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await api.delete(`${endpoint}/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

      if (loggedInUser?.id === id) {
        setLoggedInUser(null);
        localStorage.removeItem("loggedInUser");
      }
    } catch (error) {
      console.error(" Erro ao deletar usuário:", error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post(`${endpoint}/login`, { email, password });

      if (!response || !response.data) {
        throw new Error("Erro ao fazer login: Resposta inválida da API");
      }

      const user = userOutputSchema.parse(response.data);
      setLoggedInUser(user);
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      return true;
    } catch (error) {
      console.error(" Erro no login:", error);
      return false;
    }
  };

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

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext deve ser usado dentro de um UserProvider.");
  }
  return context;
};
