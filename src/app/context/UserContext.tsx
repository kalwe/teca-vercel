"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "../services/api";
import { userResponseSchema, userInputSchema, UserResponse, UserInput } from "@/app/schemas/userSchema";
import { UserAuthInput } from "../schemas/authSchema"
import { UserService } from "../services/userService"
import { AuthService } from "../services/authService"

const endpoint = "/user";

type UserContextType = {
  users: UserResponse[];
  loggedInUser: UserAuthInput | null;
  loading: boolean;
  addUser: (user: UserInput) => Promise<void>;
  updateUser: (id: number, updatedData: UserInput) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       try {
//         console.log("Buscando usuários...");
//         const response = await api.get(endpoint);
//
//         if (!response || !response.data) {
//           throw new Error("Resposta inválida da API");
//         }
//
//         const validatedUsers = UserResponseSchema.array().parse(response.data);
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

  const addUser = async (userData: Omit<UserInput, "id">) => {
    try {
      const validatedData = userInputSchema.parse(userData);
      const createdUser = await AuthService.register(endpoint, validatedData);

      if (!response || !response.data) {
        throw new Error("Erro ao adicionar usuário: Resposta inválida da API");
      }

      const newUser = userResponseSchema.parse(response.data);
      setUsers((prevUsers) => [...prevUsers, newUser]);
    } catch (error) {
      console.error(" Erro ao adicionar usuário:", error);
    }
  };

  const updateUser = async (id: number, updatedData: Partial<UserInput>) => {
    try {
      const response = await api.put(`${endpoint}/${id}`, updatedData);

      if (!response || !response.data) {
        throw new Error("Erro ao atualizar usuário: Resposta inválida da API");
      }

      const updatedUser = userResponseSchema.parse(response.data);
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

      const user = userResponseSchema.parse(response.data);
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
