"use client";

import { createContext, useState, useContext } from "react";
import { User, UserContextType } from "../types/old/employee";

/// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider
export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const addUser = (user: Omit<User, "id" | "active">) => {
    const newUser: User = {
      id: users.length + 1, // Auto-increment ID
      ...user,
      active: true, // Default to active
    };
    setUsers([...users, newUser]);
  };

  const updateUser = (id: number, updatedData: Partial<User>) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, ...updatedData } : user
      )
    );
  };

  const deleteUser = (id: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const login = (email: string, password: string): boolean => {
    const user = users.find((u) => u.email === email);
    if (user) {
      setLoggedInUser(user);
      return true;
    }
    return false;
  };

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

// Hook to use the context
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
