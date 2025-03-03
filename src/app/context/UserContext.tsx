"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "../services/api";
import { userResponseSchema, userInputSchema, UserResponse, UserInput } from "@/app/schemas/userSchema";
import { UserService } from "../services/userService"
import { AuthService } from "../services/authService"

const endpoint = "/user";

type UserContextType = {
  users: UserResponse[];
  loggedInUser: UserResponse | null;
  loading: boolean;
  addUser: (user: UserInput) => Promise<void>;
  updateUser: (id: number, updatedData: Omit<UserInput, 'password'>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
};

<<<<<<< HEAD
const UserContext = createContext<UserContextType>
=======
const UserContext = createContext({} as UserContextType);
>>>>>>> fix_context

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const allUsers = await UserService.getUsers();

        const validatedUsers = userResponseSchema.array().parse(allUsers);
        setUsers(validatedUsers);
      } catch (error) {
        console.error(" Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const addUser = async (userData: UserInput) => {
    try {
      const validatedData = userInputSchema.parse(userData);
      const createdUser = await AuthService.register(validatedData);
      const newUser = userResponseSchema.parse(createdUser);
      setUsers((prevUsers) => [...prevUsers, newUser]);
    } catch (error) {
      console.error(" Erro ao adicionar usuário:", error);
    }
  };

  const updateUser = async (id: number, updatedData: Partial<UserInput>) => {
    try {
      const updatedUser = await UserService.updateUser(id, updatedData);
      const validateddUser = userResponseSchema.parse(updatedUser);
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === id ? validateddUser : user)));
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
      await UserService.deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

      if (loggedInUser?.id === id) {
        setLoggedInUser(null);
        localStorage.removeItem("loggedInUser");
      }
    } catch (error) {
      console.error(" Erro ao deletar usuário:", error);
    }
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
<<<<<<< HEAD

=======
  return context;
>>>>>>> fix_context
};
