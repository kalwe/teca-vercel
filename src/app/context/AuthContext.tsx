"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { User, AuthContextType } from "@/app/types/authType";
import { AuthService } from "../services/authService"
import { UserAuthInput } from "../schemas/authSchema"

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const token = localStorage.getItem("token");
//
//     if (storedUser && token) {
//       try {
//         const parsedUser: User = JSON.parse(storedUser);
//         setUser(parsedUser);
//         setIsAuthenticated(true);
//       } catch (error) {
//         console.error("Erro ao recuperar usuário:", error);
//         logout();
//       }
//     }
//   }, []);

  const login = async (credentials: UserAuthInput): Promise<void> => {
    try {
      const userAuth = await AuthService.login(credentials);

      setUser({
        id: userAuth.id,
        name: userAuth.name,
        // email: response.email,
        // role: response.role,
      });
      setIsAuthenticated(userAuth.authenticated);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error("Credenciais inválidas ou erro na autenticação.");
    }
  };

  const logout = () => {
    AuthService.logout()
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para consumir o contexto de autenticação
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro de um AuthProvider");
  }
  return context;
};
