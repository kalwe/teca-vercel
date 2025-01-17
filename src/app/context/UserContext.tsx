"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserContextType, User } from "../types/employee";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  // Carregar dados do localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const storedLoggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    setUsers(storedUsers);
    setLoggedInUser(storedLoggedInUser);
  }, []);

  // Salvar alterações de `users` no localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Salvar alterações de `loggedInUser` no localStorage
  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  const addUser = (user: Omit<User, "id" | "active">) => {
    // Adicionar novo usuário
    setUsers((prev) => [...prev, { ...user, id: Date.now(), active: true }]);
  };

  const updateUser = (id: number, updatedData: Partial<User>) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...updatedData } : user))
    );
    // Salvar username em localStorage somente em edição
    if (updatedData.username) {
      const editedUser = users.find((user) => user.id === id);
      if (editedUser) {
        localStorage.setItem("editedUsername", updatedData.username); // Armazena o nome atualizado
      }
    }
  };

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const login = (email: string, password: string): boolean => {
    const user = users.find((user) => user.email === email);
    if (user) {
      setLoggedInUser(user);
      localStorage.setItem("loggedInUser", JSON.stringify(user)); // Armazena somente no login
      return true;
    }
    return false;
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

// Hook para acessar o contexto
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
