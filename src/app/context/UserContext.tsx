"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserContextType, UserOutput } from "../types/user";
import { UserService } from "../services/userService"; // ✅ Backend principal

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserOutput[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<UserOutput | null>(null);

  // ✅ Busca usuários do backend ao carregar
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersFromAPI = await UserService.getAllUsers();
        setUsers(usersFromAPI);
      } catch (error) {
        console.error("⚠ Erro ao buscar usuários do backend:", error);
      }
    };

    fetchUsers();
  }, []);

  // ✅ Criar usuário via backend
  const addUser = async (userData: Omit<UserOutput, "id" | "active"> & { password: string }) => {
    try {
      if (!userData.password) {
        throw new Error("A senha é obrigatória para criar um usuário.");
      }

      const newUser = await UserService.createUser(userData);
      setUsers((prevUsers) => [...prevUsers, newUser]);
    } catch (error) {
      console.error("⚠ Erro ao adicionar usuário:", error);
    }
  };

  // ✅ Atualizar usuário via backend
  const updateUser = async (id: number, updatedData: Partial<UserOutput>) => {
    try {
      const updatedUser = await UserService.updateUser(id, updatedData);
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === id ? updatedUser : user)));

      if (loggedInUser?.id === id) {
        setLoggedInUser(updatedUser);
      }
    } catch (error) {
      console.error("⚠ Erro ao atualizar usuário:", error);
    }
  };

  // ✅ Deletar usuário via backend
  const deleteUser = async (id: number) => {
    try {
      await UserService.deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

      if (loggedInUser?.id === id) {
        setLoggedInUser(null);
      }
    } catch (error) {
      console.error("⚠ Erro ao deletar usuário:", error);
    }
  };

  // ✅ Faz login via backend
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const user = await UserService.login(email, password);
      if (user) {
        setLoggedInUser(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error("⚠ Erro no login:", error);
      return false;
    }
  };

  // ✅ Logout
  const logout = () => {
    setLoggedInUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loggedInUser,
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

// ✅ Hook para acessar o contexto
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext deve ser usado dentro de um UserProvider.");
  }
  return context;
};
